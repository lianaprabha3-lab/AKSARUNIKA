
import { useState } from 'react'
import './App.css'

type Page =
  | 'home'
  | 'about'
  | 'aksara'
  | 'material'
  | 'kosakata'
  | 'kalimat'
  | 'kuis'
  | 'ai'
   

const aksaraCategories = [
  'Aksara Wianjana',
  'Gantungan & Gempelan',
  'Pengangge Suara',
  'Aksara Swalalita',
  'Angka Bali',
  'Pengangge Tengenan',
  'Ceciren & Tanda Baca',
  'Uger-uger aksara bali'
]

function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [aiInput, setAiInput] = useState('')
const [aiMessages, setAiMessages] = useState<
  { role: 'user' | 'assistant'; content: string }[]
>([])
const [aiLoading, setAiLoading] = useState(false)

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    setSelectedCategory('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openMaterial = (category: string) => {
    setSelectedCategory(category)
    setPage('material')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const checkAnswer = () => {
    if (!answer || checked) return

    if (answer === 'B') {
      setScore((previous) => previous + 1)
    }

    setChecked(true)
  }

const sendAiMessage = async () => {
  const question = aiInput.trim()

  if (!question || aiLoading) return

  const updatedMessages = [
    ...aiMessages,
    { role: 'user' as const, content: question },
  ]

  setAiMessages(updatedMessages)
  setAiInput('')
  setAiLoading(true)

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: question,
        history: aiMessages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Gagal mendapatkan jawaban.')
    }

    setAiMessages([
      ...updatedMessages,
      { role: 'assistant', content: data.answer },
    ])
  } catch (error) {
    setAiMessages([
      ...updatedMessages,
      {
        role: 'assistant',
        content: 'Maaf, terjadi kendala. Silakan coba lagi.',
      },
    ])
  } finally {
    setAiLoading(false)
  }
}

  const renderHeader = () => (
    <header className="navbar">
      <button className="logo" onClick={() => navigate('home')}>
        <span className="logo-mark"></span>
        <span>
          AKSA<span className="logo-accent">RUNIKA</span>
        </span>
      </button>

      <nav>
        <button onClick={() => navigate('home')}>Beranda</button>
        <button onClick={() => navigate('about')}>Tentang</button>
        <button onClick={() => navigate('aksara')}>Jelajahi Aksara</button>
        <button onClick={() => navigate('kosakata')}>Kosakata</button>
        <button onClick={() => navigate('kalimat')}>Kalimat</button>
        <button onClick={() => navigate('kuis')}>Tes Kemampuan</button>
        <button onClick={() => navigate('ai')}>AI Tutor</button>
      </nav>

      <button
        className="nav-button"
        onClick={() => navigate('aksara')}
      >
        Mulai Belajar ↗
      </button>
    </header>
  )

  const renderFooter = () => (
    <footer>
      <button className="logo" onClick={() => navigate('home')}>
        <span className="logo-mark"></span>
        AKSA<span className="logo-accent">RUNIKA</span>
      </button>

      <p>Ngiring sareng-sareng melestarikan budaya Bali.</p>
      <small>© 2026 AKSARUNIKA</small>
    </footer>
  )

  const renderHome = () => (
    <>
      <section className="hero" id="home">
        <div className="hero-text">
          <div className="pill">
            <span>✦</span> BELAJAR BUDAYA BALI DENGAN CARA BARU
          </div>

          <h1>
            Ngiring Malajah
            <br />
            <span>Aksara Bali.</span>
          </h1>

          <p>
            Mengenal warisan leluhur melalui pengalaman belajar
            yang menyenangkan, interaktif, dan dekat dengan generasi muda.
          </p>

          <div className="hero-actions">
            <button
              className="button-primary"
              onClick={() => navigate('aksara')}
            >
              Mulai Belajar →
            </button>

            <button
              className="button-secondary"
              onClick={() => navigate('about')}
            >
              Kenali Aksara Bali
            </button>
          </div>

          <div className="hero-note">
            ✦ Satu langkah kecil untuk melestarikan budaya.
          </div>
        </div>

        <div className="hero-visual">
          <div className="sun-decoration">✳</div>

          <div className="illustration">
            <div className="leaf leaf-one">❧</div>

            <div className="book">
              <div className="book-spine"></div>
              <div className="book-symbol">ᬩᬮᬶ</div>
              <span>AKSARA BALI</span>
            </div>

            <div className="person person-one">
              <div className="hair"></div>
              <div className="face">●</div>
              <div className="body body-green"></div>
            </div>

            <div className="person person-two">
              <div className="hair"></div>
              <div className="face">●</div>
              <div className="body body-orange"></div>
            </div>

            <div className="plant">🌿</div>
          </div>

          <div className="floating-label">
            Bali • Budaya • Generasi
          </div>
        </div>
      </section>

      <section className="stats">
        <div><strong>01</strong><span>Kenali budaya</span></div>
        <div><strong>02</strong><span>Pelajari aksara</span></div>
        <div><strong>03</strong><span>Latih kemampuan</span></div>
        <div><strong>04</strong><span>Lestarikan warisan</span></div>
      </section>

      <section className="lessons">
        <div className="eyebrow">RUANG BELAJAR</div>
        <h2>Mulai perjalanan <span>belajarmu.</span></h2>
        <p className="section-desc">
          Pilih ruang pembelajaran yang ingin kamu kunjungi.
        </p>

        <div className="lesson-grid">
          <button
            className="lesson-card"
            onClick={() => navigate('aksara')}
          >
            <div className="lesson-top">
              <span className="lesson-icon">🌿</span>
              <span className="lesson-number">01</span>
            </div>
            <span className="lesson-tag">MATERI</span>
            <h3>Jelajahi Aksara</h3>
            <p>Pelajari tujuh bagian utama Aksara Bali.</p>
            <span className="lesson-link">Buka halaman ↗</span>
          </button>

          <button
            className="lesson-card"
            onClick={() => navigate('kosakata')}
          >
            <div className="lesson-top">
              <span className="lesson-icon">📖</span>
              <span className="lesson-number">02</span>
            </div>
            <span className="lesson-tag">PRAKTIK</span>
            <h3>Kosakata</h3>
            <p>Kenali kosakata bahasa Bali sehari-hari.</p>
            <span className="lesson-link">Buka halaman ↗</span>
          </button>

          <button
            className="lesson-card"
            onClick={() => navigate('kalimat')}
          >
            <div className="lesson-top">
              <span className="lesson-icon">✍️</span>
              <span className="lesson-number">03</span>
            </div>
            <span className="lesson-tag">PEMBELAJARAN</span>
            <h3>Kalimat</h3>
            <p>Pelajari contoh kalimat dalam Aksara Bali.</p>
            <span className="lesson-link">Buka halaman ↗</span>
          </button>

          <button
            className="lesson-card"
            onClick={() => navigate('kuis')}
          >
            <div className="lesson-top">
              <span className="lesson-icon">✏️</span>
              <span className="lesson-number">04</span>
            </div>
            <span className="lesson-tag">KUIS</span>
            <h3>Tes Kemampuan</h3>
            <p>Uji pemahamanmu melalui latihan interaktif.</p>
            <span className="lesson-link">Buka halaman ↗</span>
          </button>
        </div>
      </section>
    </>
  )

  const renderAbout = () => (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">CERITA DI BALIK AKSARA</div>
      <h1>Warisan yang perlu <span>dihidupkan.</span></h1>

      <div className="about">
        <div className="about-art">
          <div className="palm">🌴</div>
          <div className="lontar">
            <span>WARISAN</span>
            <strong>Budaya Bali</strong>
            <span>UNTUK GENERASI MASA DEPAN</span>
          </div>
        </div>

        <div className="about-text">
          <p>
            Aksara Bali adalah bagian dari identitas dan warisan budaya
            masyarakat Bali. Melalui teknologi, kita dapat membuka
            cara baru untuk mengenal dan mempelajarinya.
          </p>
          <p>
            AKSARUNIKA hadir sebagai ruang belajar digital untuk
            membantu generasi muda mengenal dan melestarikan
            Aksara Bali.
          </p>
          <button
            className="button-primary"
            onClick={() => navigate('aksara')}
          >
            Mulai Jelajahi Aksara →
          </button>
        </div>
      </div>
    </section>
  )

  const renderAksara = () => (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">RUANG BELAJAR AKSARA</div>
      <h1>Jelajahi Bagian <span>Aksara Bali.</span></h1>

      <p className="section-desc">
        Pilih kategori yang ingin kamu pelajari.
      </p>

      <div className="category-grid">
        {aksaraCategories.map((category, index) => (
          <button
            className="category-card"
            key={category}
            onClick={() => openMaterial(category)}
          >
            <span className="category-number">0{index + 1}</span>
            <h3>{category}</h3>
            <span className="lesson-link">Pelajari materi ↗</span>
          </button>
        ))}
      </div>
    </section>
  )

  const renderMaterial = () => (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('aksara')}>
        ← Kembali ke Jelajahi Aksara
      </button>

      <div className="eyebrow">MATERI PEMBELAJARAN</div>
      <h1>{selectedCategory}</h1>

      <div className="material-panel">
        <h3>Materi {selectedCategory}</h3>
        <p>
          Bagian ini disiapkan untuk materi {selectedCategory}.
          Kamu bisa menambahkan penjelasan, gambar, tabel,
          contoh penulisan, dan latihan dari dokumen Word-mu nanti.
        </p>
      </div>
    </section>
  )

  const renderKosakata = () => (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">BELAJAR DARI KESEHARIAN</div>
      <h1>Kosakata <span>Bahasa Bali.</span></h1>

      <p className="section-desc">
        Pelajari kosakata bahasa Bali melalui contoh sehari-hari.
      </p>

      <div className="material-panel">
        <span className="lesson-tag">CONTOH KOSAKATA</span>
        <h2>Rahajeng Semeng</h2>
        <p>Selamat pagi</p>
        <p>Materi kosakata lainnya akan kamu tambahkan di sini.</p>
      </div>
    </section>
  )

  const renderKalimat = () => (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">BELAJAR MENYUSUN KALIMAT</div>
      <h1>Kalimat <span>Bahasa Bali.</span></h1>

      <p className="section-desc">
        Pelajari contoh kalimat bahasa Bali beserta penulisannya.
      </p>

      <div className="material-panel">
        <h3>Ruang Materi Kalimat</h3>
        <p>
          Tambahkan contoh kalimat bahasa Bali, penulisan Aksara Bali,
          terjemahan, dan cara membacanya di bagian ini.
        </p>
      </div>
    </section>
  )

  const renderQuiz = () => (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">UJI PEMAHAMANMU</div>
      <h1>Tes <span>Kemampuan.</span></h1>

      <div className="quiz-card">
        <div className="quiz-meta">
          <span>LATIHAN PEMULA</span>
          <span>PERTANYAAN 01</span>
        </div>

        <h3>Apa arti dari ungkapan “Rahajeng Semeng”?</h3>

        <div className="answers">
          {[
            ['A', 'Selamat malam'],
            ['B', 'Selamat pagi'],
            ['C', 'Selamat jalan'],
          ].map(([key, value]) => (
            <button
              key={key}
              className={`answer ${
                answer === key ? 'selected' : ''
              } ${
                checked && key === 'B' ? 'correct' : ''
              } ${
                checked && answer === key && key !== 'B' ? 'wrong' : ''
              }`}
              onClick={() => {
                setAnswer(key)
                setChecked(false)
              }}
              disabled={checked}
            >
              <span>{key}</span>
              {value}
            </button>
          ))}
        </div>

        {checked && (
          <p className="feedback">
            {answer === 'B'
              ? 'Benar! Hebat, pertahankan!'
              : 'Belum tepat. Jawaban yang benar adalah Selamat pagi.'}
          </p>
        )}

        <div className="quiz-bottom">
          <span>Skor benar: {score}</span>

          <button
            className="button-primary"
            onClick={checkAnswer}
            disabled={!answer || checked}
          >
            Periksa Jawaban →
          </button>
        </div>
      </div>
    </section>
  )

  
const renderAiTutor = () => (
  <section className="page-content">
    <button className="back-button" onClick={() => navigate('home')}>
      ← Kembali ke Beranda
    </button>

    <div className="eyebrow">TEMAN BELAJAR DIGITAL</div>
    <h1>AI <span>Tutor AKSARUNIKA.</span></h1>

    <p className="section-desc">
      Tanyakan apa saja tentang Aksara Bali dan pengetahuan umum.
    </p>

    <div className="material-panel">
      <div className="ai-chat-messages">
        {aiMessages.length === 0 && (
          <div>
            <h3>Rahajeng rauh! 👋</h3>
            <p>
              Aku AI Tutor AKSARUNIKA. Yuk, belajar Aksara Bali
              bersama! Ada yang ingin kamu tanyakan?
            </p>
          </div>
        )}

        {aiMessages.map((item, index) => (
          <div key={index}>
            <strong>
              {item.role === 'user' ? 'Kamu' : 'AI Tutor'}
            </strong>
            <p>{item.content}</p>
          </div>
        ))}

        {aiLoading && <p>AI Tutor sedang berpikir...</p>}
      </div>

      <div className="ai-chat-input">
        <input
          type="text"
          value={aiInput}
          onChange={(event) => setAiInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') sendAiMessage()
          }}
          placeholder="Tulis pertanyaanmu di sini..."
        />

        <button
          className="button-primary"
          onClick={sendAiMessage}
          disabled={aiLoading || !aiInput.trim()}
        >
          Kirim →
        </button>
      </div>
    </div>
  </section>
)

  
  const renderCurrentPage = () => {
    switch (page) {
      case 'home':
        return renderHome()
      case 'about':
        return renderAbout()
      case 'aksara':
        return renderAksara()
      case 'material':
        return renderMaterial()
      case 'kosakata':
        return renderKosakata()
      case 'kalimat':
        return renderKalimat()
      case 'kuis':
        return renderQuiz()
      case 'ai':
        return renderAiTutor()
      default:
        return renderHome()
    }
  }

  return (
    <main>
      {renderHeader()}
      {renderCurrentPage()}
      {renderFooter()}
    </main>
  )
}

export default App
