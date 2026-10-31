
import { useState } from 'react'
import './App.css'

const lessons = [
  {
    title: 'Mengenal Aksara Bali',
    desc: 'Kenali sejarah dan keunikan aksara Bali.',
    icon: '📜',
    tag: 'PENGENALAN',
    target: 'sejarah',
  },
  {
    title: 'Jelajahi Aksara',
    desc: 'Pelajari dasar-dasar bentuk aksara Bali.',
    icon: '🌿',
    tag: 'MATERI',
    target: 'aksara',
  },
  {
    title: 'Kosakata & Kalimat',
    desc: 'Belajar melalui contoh kata sehari-hari.',
    icon: '📖',
    tag: 'PRAKTIK',
    target: 'kosakata',
  },
  {
    title: 'Tes Kemampuan',
    desc: 'Uji pemahamanmu dengan kuis singkat.',
    icon: '✏️',
    tag: 'KUIS',
    target: 'kuis',
  },
]

const aksaraCategories = [
  'Aksara Wreastra',
  'Gantungan & Gempelan',
  'Pengangge Suara',
  'Aksara Swalalita',
  'Angka Bali',
  'Pengangge Tengenan',
  'Ceciren & Tanda Baca',
]

function App() {
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)

  const [showAksara, setShowAksara] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  const checkAnswer = () => {
    if (!answer) return

    if (answer === 'B') {
      setScore(score + 1)
    }

    setChecked(true)
  }

  return (
    <main>
      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-mark"></span>
          <span>
            AKSA<span className="logo-accent">RUNIKA</span>
          </span>
        </a>

        <nav>
          <a href="#home">Beranda</a>
          <a href="#belajar">Mulai Belajar</a>
          <a href="#tentang">Tentang</a>
        </nav>

        <a href="#belajar" className="nav-button">
          Mulai Sekarang ↗
        </a>
      </header>

      {/* HERO */}
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
            <a href="#belajar" className="button-primary">
              Mulai Belajar <span>→</span>
            </a>

            <a href="#tentang" className="button-secondary">
              Kenali Aksara Bali
            </a>
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

      {/* STATISTIK */}
      <section className="stats">
        <div>
          <strong>01</strong>
          <span>Kenali budaya</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Pelajari aksara</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Latih kemampuan</span>
        </div>
        <div>
          <strong>04</strong>
          <span>Lestarikan warisan</span>
        </div>
      </section>

      {/* TENTANG */}
      <section className="about" id="tentang">
        <div className="about-art">
          <div className="palm">🌴</div>

          <div className="lontar">
            <span>WARISAN</span>
            <strong>Budaya Bali</strong>
            <span>UNTUK GENERASI MASA DEPAN</span>
          </div>
        </div>

        <div className="about-text">
          <div className="eyebrow">CERITA DI BALIK AKSARA</div>

          <h2>
            Warisan yang perlu
            <br />
            terus <span>dihidupkan.</span>
          </h2>

          <p>
            Aksara Bali adalah bagian dari identitas dan warisan budaya
            masyarakat Bali. Melalui teknologi, kita dapat membuka
            cara baru untuk mengenal dan mempelajarinya.
          </p>

          <a href="#belajar" className="text-link">
            Jelajahi materi <span>→</span>
          </a>
        </div>
      </section>

      {/* RUANG BELAJAR */}
      <section className="lessons" id="belajar">
        <div className="eyebrow">RUANG BELAJAR</div>

        <h2>
          Mulai perjalanan <span>belajarmu.</span>
        </h2>

        <p className="section-desc">
          Pilih materi yang ingin kamu pelajari hari ini.
        </p>

        <div className="lesson-grid">
          {lessons.map((lesson, index) =>
            lesson.target === 'aksara' ? (
              <button
                className="lesson-card"
                key={lesson.title}
                onClick={() => {
                  setShowAksara(!showAksara)
                  setSelectedCategory('')
                }}
              >
                <div className="lesson-top">
                  <span className="lesson-icon">{lesson.icon}</span>
                  <span className="lesson-number">
                    0{index + 1}
                  </span>
                </div>

                <span className="lesson-tag">{lesson.tag}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.desc}</p>

                <span className="lesson-link">
                  {showAksara
                    ? 'Tutup materi ↑'
                    : 'Pelajari sekarang ↗'}
                </span>
              </button>
            ) : (
              <a
                href={`#${lesson.target}`}
                className="lesson-card"
                key={lesson.title}
              >
                <div className="lesson-top">
                  <span className="lesson-icon">{lesson.icon}</span>
                  <span className="lesson-number">
                    0{index + 1}
                  </span>
                </div>

                <span className="lesson-tag">{lesson.tag}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.desc}</p>

                <span className="lesson-link">
                  Pelajari sekarang ↗
                </span>
              </a>
            )
          )}
        </div>

        {/* SUBMENU TUJUH KATEGORI AKSARA */}
        {showAksara && (
          <div className="aksara-submenu" id="aksara">
            <div className="eyebrow">
              RUANG BELAJAR AKSARA
            </div>

            <h2>
              Jelajahi Bagian <span>Aksara Bali.</span>
            </h2>

            <p className="section-desc">
              Pilih bagian aksara yang ingin kamu pelajari.
            </p>

            {!selectedCategory ? (
              <div className="category-grid">
                {aksaraCategories.map((category, index) => (
                  <button
                    className="category-card"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="category-number">
                      0{index + 1}
                    </span>

                    <h3>{category}</h3>

                    <span className="lesson-link">
                      Pelajari materi ↗
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="material-panel">
                <button
                  className="back-button"
                  onClick={() => setSelectedCategory('')}
                >
                  ← Kembali ke daftar materi
                </button>

                <h3>{selectedCategory}</h3>

                <p>
                  Materi {selectedCategory} akan ditampilkan
                  di bagian ini.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* KOSAKATA */}
      <section className="vocabulary" id="kosakata">
        <div className="vocab-content">
          <div className="eyebrow">
            BELAJAR DARI KESEHARIAN
          </div>

          <h2>
            Kata sederhana,
            <br />
            <span>makna bermakna.</span>
          </h2>

          <p>
            Mulai mengenal kosakata Bali melalui contoh yang dekat
            dengan kehidupan sehari-hari.
          </p>

          <div className="vocab-example">
            <span>CONTOH KOSAKATA</span>
            <strong>Rahajeng Semeng</strong>
            <small>Selamat pagi</small>
          </div>
        </div>

        <div className="vocab-art">
          <div className="flower">✿</div>
          <div className="lontar-book">📚</div>
          <div className="vocab-caption">
            Malajah sareng-sareng
          </div>
        </div>
      </section>

      {/* KUIS */}
      <section className="quiz" id="kuis">
        <div className="eyebrow">UJI PEMAHAMANMU</div>

        <h2>
          Sudah siap <span>mencoba?</span>
        </h2>

        <div className="quiz-card">
          <div className="quiz-meta">
            <span>LATIHAN PEMULA</span>
            <span>PERTANYAAN 01</span>
          </div>

          <h3>
            Apa arti dari ungkapan “Rahajeng Semeng”?
          </h3>

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
                  checked && answer === key && key !== 'B'
                    ? 'wrong'
                    : ''
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

      {/* FOOTER */}
      <footer>
        <a href="#home" className="logo">
          <span className="logo-mark"></span>
          AKSA<span className="logo-accent">RUNIKA</span>
        </a>

        <p>
          Ngiring sareng-sareng melestarikan budaya Bali.
        </p>

        <small>© 2026 AKSARUNIKA</small>
      </footer>
    </main>
  )
}

export default App
