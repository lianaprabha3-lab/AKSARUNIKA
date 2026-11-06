
import { createServer } from 'node:http'

// Membaca API Key dari file .env.local
try {
  process.loadEnvFile('.env.local')
} catch {
  // File akan diperiksa lagi saat server menerima permintaan.
}

const sendJson = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
  })
  res.end(JSON.stringify(data))
}

async function readBody(req) {
  let raw = ''

  for await (const chunk of req) {
    raw += chunk

    if (raw.length > 1_000_000) {
      throw new Error('Ukuran pesan terlalu besar.')
    }
  }

  return JSON.parse(raw || '{}')
}

const server = createServer(async (req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'OK',
      message: 'Server AI AKSARUNIKA aktif.',
    })
  }

  if (req.url !== '/api/chat') {
    return sendJson(res, 404, { error: 'Endpoint tidak ditemukan.' })
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return sendJson(res, 500, {
        error: 'GEMINI_API_KEY belum tersedia di .env.local.',
      })
    }

    const { message, history = [] } = await readBody(req)

    if (typeof message !== 'string' || !message.trim()) {
      return sendJson(res, 400, {
        error: 'Silakan masukkan pertanyaan terlebih dahulu.',
      })
    }

    const previousMessages = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              (item.role === 'user' || item.role === 'assistant') &&
              typeof item.content === 'string'
          )
          .slice(-10)
          .map((item) => ({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.content }],
          }))
      : []

  
const requestBody = {
  systemInstruction: {
    parts: [
      {
        text: [
          'Kamu adalah AI Tutor AKSARUNIKA, pendamping belajar Aksara Bali.',
          'Gunakan Bahasa Indonesia yang ramah dan mudah dipahami pemula.',
          'Tampilkan karakter Aksara Bali menggunakan Unicode asli, bukan kode Unicode.',
          'Jika menjelaskan kosakata atau kalimat Bahasa Bali, tampilkan tulisan Latin dan Aksara Bali berdampingan.',
          'Jika pengguna meminta jawaban menggunakan Aksara Bali, tampilkan aksara aslinya.',
          'Sertakan arti dan cara membaca dalam huruf Latin.',
          'Gunakan aksara, pengangge suara, tengenan, gantungan, dan gempelan dengan tepat.',
          'Jangan mengarang aturan atau bentuk Aksara Bali jika tidak yakin.',
          'Gunakan teks biasa tanpa Markdown dan tanpa tanda bintang.',
          'Susun jawaban dalam paragraf yang rapi dan gunakan penomoran jika diperlukan.',
          'Jadilah tutor yang sabar, interaktif, dan membantu pengguna belajar secara bertahap.'
        ].join(' ')
      }
    ]
  },
  contents: [
    ...previousMessages,
    {
      role: 'user',
      parts: [{ text: message.trim() }]
    }
  ],
  generationConfig: {
    maxOutputTokens: 2048
  }
};

    const apiUrl =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(60000),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('Gemini API Error:', response.status, data.error?.message)

      return sendJson(res, response.status, {
        error: data.error?.message || 'Gemini gagal memproses pertanyaan.',
      })
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim()

    if (!answer) {
      return sendJson(res, 502, {
        error: 'Gemini belum memberikan jawaban.',
      })
    }

    return sendJson(res, 200, { answer })

  } catch (error) {
    console.error('AI SERVER ERROR:', error)

    return sendJson(res, 500, {
      error: error.message || 'Terjadi kesalahan pada server AI.',
    })
  }
})

server.listen(3002, '127.0.0.1', () => {
  console.log('AI AKSARUNIKA aktif di http://localhost:3002')
})
