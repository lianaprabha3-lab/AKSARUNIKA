
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const RETRYABLE_STATUS = [429, 500, 502, 503, 504];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY belum ditemukan di Environment Variables.",
      });
    }

    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Silakan masukkan pertanyaan terlebih dahulu.",
      });
    }

    const previousMessages = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-10)
          .map((item) => ({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: item.content }],
          }))
      : [];

    const requestBody = {
      systemInstruction: {
        parts: [
          {
            text:
              "Kamu adalah AI Tutor AKSARUNIKA. Bantu pengguna belajar Aksara Bali dengan bahasa yang mudah dipahami. Kamu juga boleh menjawab pertanyaan umum. Gunakan Bahasa Indonesia atau Bahasa Bali sesuai bahasa pengguna. Berikan contoh jika diperlukan. Jangan mengarang aturan Aksara Bali jika tidak yakin. Jelaskan jika ada informasi yang belum dapat dipastikan. Gunakan format Markdown yang rapi.",
          },
        ],
      },
      contents: [
        ...previousMessages,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    };

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

    let lastError = null;

    // Maksimal 3 percobaan
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(20000),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          console.error("Gemini API Error:", {
            status: response.status,
            error: data.error?.message,
          });

          lastError = {
            status: response.status,
            message: data.error?.message || "Gemini API gagal memproses permintaan.",
          };

          if (
            RETRYABLE_STATUS.includes(response.status) &&
            attempt < 2
          ) {
            await sleep(1000 * (attempt + 1));
            continue;
          }

          break;
        }

        const answer = data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || "")
          .join("")
          .trim();

        if (!answer) {
          return res.status(502).json({
            error: "Gemini belum memberikan jawaban. Silakan coba lagi.",
          });
        }

        return res.status(200).json({ answer });
      } catch (error) {
        lastError = {
          status: 504,
          message: error.message,
        };

        console.error("Gemini Request Error:", error.message);

        if (attempt < 2) {
          await sleep(1000 * (attempt + 1));
          continue;
        }
      }
    }

    if (lastError) {
      if (lastError.status === 503 || lastError.status === 504) {
        return res.status(lastError.status).json({
          error:
            "Layanan AI sedang sibuk atau membutuhkan waktu lebih lama. Silakan coba kembali beberapa saat lagi.",
        });
      }

      if (lastError.status === 429) {
        return res.status(429).json({
          error:
            "Batas penggunaan AI sedang tercapai. Silakan coba kembali nanti.",
        });
      }

      return res.status(lastError.status).json({
        error: "AI Tutor belum dapat memproses pertanyaan. Silakan coba lagi.",
      });
    }

    return res.status(502).json({
      error: "AI Tutor belum memberikan jawaban. Silakan coba lagi.",
    });
  } catch (error) {
    console.error("ERROR AI TUTOR:", error);

    return res.status(500).json({
      error: "Terjadi kesalahan pada server AI. Silakan coba lagi.",
    });
  }
}
