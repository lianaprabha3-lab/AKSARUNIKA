
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY belum ditemukan di Vercel.",
      });
    }

    const { message, history = [] } = req.body || {};

    if (typeof message !== "string" || !message.trim()) {
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
            text: [
              "Kamu adalah AI Tutor AKSARUNIKA, pendamping belajar Aksara Bali.",
              "Gunakan Bahasa Indonesia yang ramah dan mudah dipahami pemula.",
              "Tampilkan karakter Aksara Bali menggunakan Unicode asli, bukan kode Unicode.",
              "Jika menjelaskan kosakata atau kalimat Bahasa Bali, tampilkan tulisan Latin dan Aksara Bali berdampingan.",
              "Jika pengguna meminta jawaban menggunakan Aksara Bali, tampilkan aksara aslinya.",
              "Sertakan arti dan cara membaca dalam huruf Latin.",
              "Gunakan aksara, pengangge suara, tengenan, gantungan, dan gempelan dengan tepat.",
              "Jangan mengarang aturan atau bentuk Aksara Bali jika tidak yakin.",
              "Gunakan teks biasa tanpa Markdown dan tanpa tanda bintang.",
              "Susun jawaban dalam paragraf yang rapi dan gunakan penomoran jika diperlukan.",
              "Jadilah tutor yang sabar, interaktif, dan membantu pengguna belajar secara bertahap."
            ].join(" "),
          },
        ],
      },
      contents: [
        ...previousMessages,
        {
          role: "user",
          parts: [{ text: message.trim() }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    };

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(50000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Gemini API Error:", {
        status: response.status,
        error: data.error?.message,
      });

      if (response.status === 429) {
        return res.status(429).json({
          error: "Batas penggunaan AI sedang tercapai. Silakan coba kembali nanti.",
        });
      }

      return res.status(502).json({
        error: "Gemini belum dapat memproses pertanyaan. Silakan coba lagi.",
      });
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
    console.error("Gemini Request Error:", error);

    const timedOut =
      error.name === "TimeoutError" ||
      error.name === "AbortError" ||
      /timeout|aborted/i.test(error.message || "");

    return res.status(timedOut ? 504 : 500).json({
      error: timedOut
        ? "AI Tutor membutuhkan waktu lebih lama. Silakan coba kembali."
        : "Terjadi kesalahan pada server AI. Silakan coba lagi.",
    });
  }
}
