
import { useEffect, useRef, useState, type PointerEvent } from 'react'
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
  'Pengangge Suara, Aksara Suara, dan Ardasuara',
  'Aksara Swalalita',
  'Angka Bali',
  'Pengangge Tengenan',
  'Ceciren papaosan (Tanda Baca)',
  'Uger-uger Aksara Bali'
]


const wianjanaLetters = [
  { glyph: 'ᬳ', name: 'Ha', sound: 'ha' },
  { glyph: 'ᬦ', name: 'Na', sound: 'na' },
  { glyph: 'ᬘ', name: 'Ca', sound: 'ca' },
  { glyph: 'ᬭ', name: 'Ra', sound: 'ra' },
  { glyph: 'ᬓ', name: 'Ka', sound: 'ka' },
  { glyph: 'ᬤ', name: 'Da', sound: 'da' },
  { glyph: 'ᬢ', name: 'Ta', sound: 'ta' },
  { glyph: 'ᬲ', name: 'Sa', sound: 'sa' },
  { glyph: 'ᬯ', name: 'Wa', sound: 'wa' },
  { glyph: 'ᬮ', name: 'La', sound: 'la' },
  { glyph: 'ᬫ', name: 'Ma', sound: 'ma' },
  { glyph: 'ᬕ', name: 'Ga', sound: 'ga' },
  { glyph: 'ᬩ', name: 'Ba', sound: 'ba' },
  { glyph: 'ᬗ', name: 'Nga', sound: 'nga' },
  { glyph: 'ᬧ', name: 'Pa', sound: 'pa' },
  { glyph: 'ᬚ', name: 'Ja', sound: 'ja' },
  { glyph: 'ᬬ', name: 'Ya', sound: 'ya' },
  { glyph: 'ᬜ', name: 'Nya', sound: 'nya' },
]


const swalalitaLetters = [
  { glyph: 'ᬔ', name: 'Kha', latin: 'kha' },
  { glyph: 'ᬖ', name: 'Gha', latin: 'gha' },
  { glyph: 'ᬙ', name: 'Cha', latin: 'cha' },
  { glyph: 'ᬛ', name: 'Jha', latin: 'jha' },
  { glyph: 'ᬰ', name: 'Śa', latin: 'śa' },
  { glyph: 'ᬝ', name: 'Ṭa', latin: 'ṭa' },
  { glyph: 'ᬞ', name: 'Ṭha', latin: 'ṭha' },
  { glyph: 'ᬟ', name: 'Ḍa', latin: 'ḍa' },
  { glyph: 'ᬠ', name: 'Ḍha', latin: 'ḍha' },
  { glyph: 'ᬡ', name: 'Ṇa', latin: 'ṇa' },
  { glyph: 'ᬱ', name: 'Ṣa', latin: 'ṣa' },
  { glyph: 'ᬣ', name: 'Tha', latin: 'tha' },
  { glyph: 'ᬥ', name: 'Dha', latin: 'dha' },
  { glyph: 'ᬨ', name: 'Pha', latin: 'pha' },
  { glyph: 'ᬪ', name: 'Bha', latin: 'bha' },
]


const angkaBali = [
  { digit: '0', glyph: '᭐', name: 'Bindu / Windu' },
  { digit: '1', glyph: '᭑', name: 'Siki / Besik' },
  { digit: '2', glyph: '᭒', name: 'Kalih / Dua' },
  { digit: '3', glyph: '᭓', name: 'Tiga / Telu' },
  { digit: '4', glyph: '᭔', name: 'Papat' },
  { digit: '5', glyph: '᭕', name: 'Lima' },
  { digit: '6', glyph: '᭖', name: 'Nem' },
  { digit: '7', glyph: '᭗', name: 'Pitu' },
  { digit: '8', glyph: '᭘', name: 'Kutus' },
  { digit: '9', glyph: '᭙', name: 'Sanga / Sia' },
]


type PasangCardData = {
  id: string
  name: string
  glyph: string
}

// 18 Aksara Wreastra
const gantunganWreastraCards: PasangCardData[] = [
  { id: 'ha', name: 'Ha', glyph: '◌᭄ᬳ' },
  { id: 'na', name: 'Na', glyph: '◌᭄ᬦ' },
  { id: 'ca', name: 'Ca', glyph: '◌᭄ᬘ' },
  { id: 'ra', name: 'Ra', glyph: '◌᭄ᬭ' },
  { id: 'ka', name: 'Ka', glyph: '◌᭄ᬓ' },
  { id: 'da', name: 'Da', glyph: '◌᭄ᬤ' },
  { id: 'ta', name: 'Ta', glyph: '◌᭄ᬢ' },
  { id: 'sa', name: 'Sa', glyph: '◌᭄ᬲ' },
  { id: 'wa', name: 'Wa', glyph: '◌᭄ᬯ' },
  { id: 'la', name: 'La', glyph: '◌᭄ᬮ' },
  { id: 'ma', name: 'Ma', glyph: '◌᭄ᬫ' },
  { id: 'ga', name: 'Ga', glyph: '◌᭄ᬕ' },
  { id: 'ba', name: 'Ba', glyph: '◌᭄ᬩ' },
  { id: 'nga', name: 'Nga', glyph: '◌᭄ᬗ' },
  { id: 'pa', name: 'Pa', glyph: '◌᭄ᬧ' },
  { id: 'ja', name: 'Ja', glyph: '◌᭄ᬚ' },
  { id: 'ya', name: 'Ya', glyph: '◌᭄ᬬ' },
  { id: 'nya', name: 'Nya', glyph: '◌᭄ᬜ' },
]

// Aksara Swalalita
const gantunganSwalalitaCards: PasangCardData[] = [
  { id: 'kha', name: 'Kha', glyph: '◌᭄ᬔ' },
  { id: 'gha', name: 'Gha', glyph: '◌᭄ᬖ' },
  { id: 'cha', name: 'Cha', glyph: '◌᭄ᬙ' },
  { id: 'jha', name: 'Jha', glyph: '◌᭄ᬛ' },
  { id: 'sha', name: 'Sha', glyph: '◌᭄ᬰ' },
  { id: 'tta', name: 'Ṭa', glyph: '◌᭄ᬝ' },
  { id: 'ttha', name: 'Ṭha', glyph: '◌᭄ᬞ' },
  { id: 'dda', name: 'Ḍa', glyph: '◌᭄ᬟ' },
  { id: 'ddha', name: 'Ḍha', glyph: '◌᭄ᬠ' },
  { id: 'nna', name: 'Ṇa', glyph: '◌᭄ᬡ' },
  { id: 'ssa', name: 'Ṣa', glyph: '◌᭄ᬱ' },
  { id: 'tha', name: 'Tha', glyph: '◌᭄ᬣ' },
  { id: 'dha', name: 'Dha', glyph: '◌᭄ᬥ' },
  { id: 'pha', name: 'Pha', glyph: '◌᭄ᬨ' },
  { id: 'bha', name: 'Bha', glyph: '◌᭄ᬪ' },
]

// 4 bentuk Gempelan pada pedoman
const gempelanCards: PasangCardData[] = [
  { id: 'pa', name: 'Pa', glyph: '◌᭄ᬧ' },
  { id: 'pha', name: 'Pha', glyph: '◌᭄ᬨ' },
  { id: 'ba', name: 'Ba', glyph: '◌᭄ᬩ' },
  { id: 'bha', name: 'Bha', glyph: '◌᭄ᬪ' },
]


function WritingPractice({ glyph }: { glyph: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawing = useRef(false)
  const [hasDrawing, setHasDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1

      canvas.width = rect.width * ratio
      canvas.height = rect.height * ratio

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = '#294b36'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()

    drawing.current = true
    canvas.setPointerCapture(event.pointerId)

    ctx.beginPath()
    ctx.moveTo(
      event.clientX - rect.left,
      event.clientY - rect.top
    )

    setHasDrawing(true)
  }

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!drawing.current || !canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()

    ctx.lineTo(
      event.clientX - rect.left,
      event.clientY - rect.top
    )

    ctx.stroke()
  }

  const stopDrawing = () => {
    drawing.current = false
  }

  const clearDrawing = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawing(false)
  }

  return (
    <div className="writing-practice">
      <div className="practice-board">
        <span className="practice-guide" aria-hidden="true">
          {glyph}
        </span>

        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
          aria-label="Area latihan menulis aksara Bali"
        />
      </div>

      <div className="practice-actions">
        <p>
          {hasDrawing
            ? 'Bagus! Kamu sudah mulai berlatih.'
            : 'Ikuti bentuk aksara samar di atas.'}
        </p>

        <button type="button" onClick={clearDrawing}>
          Hapus Coretan
        </button>
      </div>
    </div>
  )
}


type SoundLearningCard = {
  id: string
  name: string
  glyph: string
}

// 1. PENGANGGE SUARA — 11 BENTUK
const penganggeSuaraCards: SoundLearningCard[] = [
  { id: 'ulu', name: 'ulu', glyph: '\u25CC\u1B36' },
  { id: 'ulu-sari', name: 'Ulu Sari', glyph: '\u25CC\u1B37' },
  { id: 'pepet', name: 'Pepet', glyph: '\u25CC\u1B42' },
  { id: 'tedung', name: 'Tedung / Tedong', glyph: '\u25CC\u1B35' },
  { id: 'pepet-tedung', name: 'Pepet Matedung', glyph: '\u25CC\u1B43' },
  { id: 'taling-tedung', name: 'Taling Tedung', glyph: '\u25CC\u1B40' },
  { id: 'taling-marepa', name: 'Taling Marepa', glyph: '\u25CC\u1B3F' },
  { id: 'suku', name: 'Suku', glyph: '\u25CC\u1B38' },
  { id: 'suku-ilut', name: 'Suku Ilut', glyph: '\u25CC\u1B39' },
  { id: 'ulu-candra', name: 'Ulu Candra', glyph: '\u25CC\u1B01' },
  { id: 'ulu-ricem', name: 'Ulu Ricem', glyph: '\u25CC\u1B00' },
]

// 2. AKSARA SUARA — 14 BENTUK
const aksaraSuaraCards: SoundLearningCard[] = [
  { id: 'akara', name: 'Akara', glyph: '\u1B05' },
  { id: 'akara-tedung', name: 'Akara Tedung', glyph: '\u1B06' },
  { id: 'ikara', name: 'Ikara', glyph: '\u1B07' },
  { id: 'ikara-tedung', name: 'Ikara Tedung', glyph: '\u1B08' },
  { id: 'ukara', name: 'Ukara', glyph: '\u1B09' },
  { id: 'ukara-tedung', name: 'Ukara Tedung', glyph: '\u1B0A' },
  { id: 'ra-repa', name: 'Ra Repa', glyph: '\u1B0B' },
  { id: 'ra-repa-tedung', name: 'Ra Repa Tedung', glyph: '\u1B0C' },
  { id: 'la-lenga', name: 'La Lenga', glyph: '\u1B0D' },
  { id: 'la-lenga-tedung', name: 'La Lenga Tedung', glyph: '\u1B0E' },
  { id: 'ekara', name: 'Ekara', glyph: '\u1B0F' },
  { id: 'aikara', name: 'Aikara', glyph: '\u1B10' },
  { id: 'okara', name: 'Okara', glyph: '\u1B11' },
  { id: 'okara-tedung', name: 'Okara Tedung', glyph: '\u1B12' },
]

// 3. PENGANGGE ARDASUARA — 5 BENTUK
const ardasuaraCards: SoundLearningCard[] = [
  { id: 'nania', name: 'Nania', glyph: '\u25CC\u1B44\u1B2C' },
  { id: 'guung', name: 'Guung', glyph: '\u25CC\u1B44\u1B2D' },
  { id: 'guung-macelek', name: 'Guung Macelek', glyph: '\u25CC\u1B3A' },
  { id: 'gantungan-la', name: 'Gantungan La', glyph: '\u25CC\u1B44\u1B2E' },
  { id: 'suku-kembung', name: 'Suku Kembung', glyph: '\u25CC\u1B44\u1B2F' },
]


// PENGANGGE TENGENAN — 4 BENTUK
const tengenanCards: SoundLearningCard[] = [
  {
    id: 'cecek',
    name: 'Cecek',
    glyph: '\u25CC\u1B02',
  },
  {
    id: 'surang',
    name: 'Surang',
    glyph: '\u25CC\u1B03',
  },
  {
    id: 'bisah',
    name: 'Bisah',
    glyph: '\u25CC\u1B04',
  },
  {
    id: 'adeg-adeg',
    name: 'Adeg-Adeg',
    glyph: '\u25CC\u1B44',
  },
]


type CecirenCard = {
  id: string
  name: string
  glyph: string
  usage: string
}

const cecirenCards: CecirenCard[] = [
  {
    id: 'carik-siki',
    name: 'Carik Siki',
    glyph: '᭞',
    usage: 'Digunakan sebagai penanda satu bait dan tanda koma dalam penulisan kata atau kalimat. Juga digunakan dalam penulisan angka dan aksara anceng.',
  },
  {
    id: 'carik-pareren',
    name: 'Carik Pareren / Carik Kalih',
    glyph: '᭟',
    usage: 'Digunakan pada akhir kalimat.',
  },
  {
    id: 'pasalinan',
    name: 'Pasalinan',
    glyph: '᭟᭜᭟',
    usage: 'Digunakan pada bagian akhir penulisan surat, cerita (satua), dan kanda. Dalam gaguritan digunakan sebagai ciri pengganti pupuh.',
  },
  {
    id: 'panti',
    name: 'Panten / Panti',
    glyph: '᭚',
    usage: 'Digunakan sebagai tanda awal penulisan cerita (satua), kanda, dan gaguritan.',
  },
  {
    id: 'pamada',
    name: 'Pamada',
    glyph: '᭛',
    usage: 'Digunakan dalam penulisan kakawin dan parwa. Bermakna permohonan anugerah agar selamat sentosa.',
  },
  {
    id: 'carik-agung',
    name: 'Carik Agung / Pasalinan',
    glyph: '᭛᭜᭛',
    usage: 'Digunakan pada akhir bagian kakawin untuk menandai berakhirnya satu kumpulan metrum dan pergantian metrum berikutnya.',
  },
  {
    id: 'carik-pamungkah',
    name: 'Carik Pamungkah',
    glyph: '᭝',
    usage: 'Digunakan sebagai penanda untuk menjelaskan sesuatu yang banyak dan sebagai tanda percakapan.',
  },
  {
    id: 'idem',
    name: 'Idem',
    glyph: '〃',
    usage: 'Digunakan untuk menunjukkan bahwa penulisan kalimat di bawah sama dengan penulisan kalimat di atasnya.',
  },


]

function cleanAiText(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/(^|\n)\s*[-*]\s+/g, '$1• ')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}


function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedWianjana, setSelectedWianjana] =
   useState<(typeof wianjanaLetters)[number] | null>(null)
  const [selectedSwalalita, setSelectedSwalalita] =
   useState<(typeof swalalitaLetters)[number] | null>(null)
  const [selectedAngkaBali, setSelectedAngkaBali] =
   useState<(typeof angkaBali)[number] | null>(null)
  const [selectedPasangType, setSelectedPasangType] =
    useState<'gantungan' | 'gempelan' | null>(null)
  const [selectedPasangScript, setSelectedPasangScript] =
    useState<'wreastra' | 'swalalita' | null>(null)
  const [selectedPasangCard, setSelectedPasangCard] =
    useState<PasangCardData | null>(null)
  const [selectedSoundSection, setSelectedSoundSection] = useState<
  'pengangge-suara' | 'aksara-suara' | 'ardasuara' | null
>(null)
  const [selectedSoundCard, setSelectedSoundCard] =
    useState<SoundLearningCard | null>(null)
  const [selectedTengenanCard, setSelectedTengenanCard] =
    useState<SoundLearningCard | null>(null)
  const [selectedCecirenCard, setSelectedCecirenCard] =
    useState<CecirenCard | null>(null)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [quizSection, setQuizSection] = useState<
  'menu' | 'tebak-aksara' | 'baca-kalimat'
>('menu')

const [quizQuestionIndex, setQuizQuestionIndex] = useState(0)
const [quizDone, setQuizDone] = useState(false)
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
  setSelectedSoundSection(null)
  setSelectedSoundCard(null)
  setPage('material')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

  
const checkAnswer = (correctAnswer: string) => {
  if (!answer || checked) return

  if (answer === correctAnswer) {
    setScore((previous) => previous + 1)
  }

  setChecked(true)
}

const startQuiz = (
  section: 'tebak-aksara' | 'baca-kalimat'
) => {
  setQuizSection(section)
  setQuizQuestionIndex(0)
  setQuizDone(false)
  setAnswer('')
  setChecked(false)
  setScore(0)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const backToQuizMenu = () => {
  setQuizSection('menu')
  setQuizQuestionIndex(0)
  setQuizDone(false)
  setAnswer('')
  setChecked(false)
  setScore(0)
}

const nextQuizQuestion = (totalQuestions: number) => {
  if (quizQuestionIndex + 1 >= totalQuestions) {
    setQuizDone(true)
    return
  }

  setQuizQuestionIndex((previous) => previous + 1)
  setAnswer('')
  setChecked(false)
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
        history: aiMessages.slice(-10),
      }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        data.error || `Terjadi kesalahan server (${response.status}).`
      )
    }

    if (typeof data.answer !== 'string' || !data.answer.trim()) {
      throw new Error('AI belum memberikan jawaban. Silakan coba lagi.')
    }

    setAiMessages([
      ...updatedMessages,
      {
        role: 'assistant',
        content: cleanAiText(data.answer),
      },
    ])

  } catch (error) {
    console.error('AI Tutor Error:', error)

    setAiMessages([
      ...updatedMessages,
      {
        role: 'assistant',
        content:
          error instanceof Error
            ? `Maaf, AI Tutor mengalami kendala: ${error.message}`
            : 'Maaf, terjadi kesalahan yang tidak diketahui.',
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

    {selectedCategory === 'Aksara Wianjana' ? (
      <>
        <div className="wianjana-heading">
          <h1>Aksara Wianjana</h1>
          <p>
            Kenali 18 aksara dasar, pelajari bentuk,
            bunyi, dan cara penulisannya.
          </p>
        </div>

        <div className="wianjana-card-grid">
          {wianjanaLetters.map((letter) => (
            <button
              type="button"
              key={letter.name}
              className={`wianjana-card ${
                selectedWianjana?.name === letter.name ? 'active' : ''
              }`}
              onClick={() => setSelectedWianjana(letter)}
              aria-pressed={selectedWianjana?.name === letter.name}
            >
              <span className="wianjana-card-glyph">
                {letter.glyph}
              </span>

              <strong>{letter.name}</strong>

              <span className="wianjana-card-sound">
                Bunyi: /{letter.sound}/
              </span>

              <span className="wianjana-card-link">
                Pelajari →
              </span>
            </button>
          ))}
        </div>

        {selectedWianjana ? (
          <div className="wianjana-detail">
            <div className="wianjana-detail-main">
              <span className="lesson-tag">AKSARA TERPILIH</span>

              <div className="wianjana-detail-glyph">
                {selectedWianjana.glyph}
              </div>

              <h2>Aksara {selectedWianjana.name}</h2>

              <p>
                Bunyi dasar: /{selectedWianjana.sound}/
              </p>
            </div>

            
<div className="wianjana-writing">
  <h3>Cara Berlatih Menulis</h3>

  <p>
    Pelajari bentuk aksara melalui dua metode latihan
    berikut agar semakin terbiasa menulis Aksara Bali.
  </p>

  <div className="practice-options">

    {/* METODE 1: LATIHAN DI BUKU */}
    <div className="practice-option book-option">
      <div className="practice-option-heading">
        <span>📖</span>
        <h4>Latihan di Buku</h4>
      </div>

      <p>
        Salin aksara berikut ke buku tulismu.
        Lakukan secara berulang agar terbiasa
        mengenali dan menulis bentuk aksara.
      </p>

      <div className="book-example">
        <span className="book-example-glyph">
          {selectedWianjana.glyph}
        </span>

        <span>
          Aksara {selectedWianjana.name}
        </span>
      </div>

      <ol>
        <li>Amati bentuk aksara.</li>
        <li>Salin ke buku latihan.</li>
        <li>Ulangi beberapa kali.</li>
        <li>Periksa kembali hasil tulisanmu.</li>
      </ol>

      <div className="practice-note">
        ✨ Latihan menggunakan buku dan alat tulis.
      </div>
    </div>

    {/* METODE 2: LATIHAN DIGITAL */}
    <div className="practice-option digital-option">
      <div className="practice-option-heading">
        <span>✍️</span>
        <h4>Latihan Langsung di Layar</h4>
      </div>

      <p>
        Tirukan bentuk aksara di dalam area latihan.
        Gunakan mouse, touchpad, atau jari.
      </p>

      <WritingPractice glyph={selectedWianjana.glyph} />

      <div className="practice-note">
        ✨ Kamu bisa menghapus coretan dan mencoba lagi.
      </div>
    </div>

  </div>
</div>
</div>

        ) : (
          <div className="material-panel">
            <h3>Aksara Wianjana adalah kelompok huruf konsonan atau huruf mati dalam sistem penulisan aksara Bali. Aksara ini
              salah satu Aksara Bali yang digunakan secara umum untuk menuliskan bahasa Bali sehari-hari yang murni (tidak dicampur dengan bahasa
              Kawi atau Sansekerta).
            </h3>
            <p>
              Pilih salah satu kartu aksara di atas untuk
              melihat bentuk, nama, bunyi, dan latihan menulisnya.
            </p>
          </div>
        )}
            </>
    ) : selectedCategory === 'Aksara Swalalita' ? (
  <>
    <div className="wianjana-heading">
      <h1>Aksara Swalalita</h1>
      <p>
        Pelajari 15 aksara tambahan Swalalita melalui
        kartu interaktif berikut.
      </p>
    </div>

    <div className="wianjana-card-grid">
      {swalalitaLetters.map((letter) => (
        <button
          type="button"
          key={letter.name}
          className={`wianjana-card ${
            selectedSwalalita?.name === letter.name ? 'active' : ''
          }`}
          onClick={() => setSelectedSwalalita(letter)}
          aria-pressed={selectedSwalalita?.name === letter.name}
        >
          <span className="wianjana-card-glyph balinese-script">
            {letter.glyph}
          </span>

          <strong>{letter.name}</strong>

          <span className="wianjana-card-sound">
            Bunyi: /{letter.latin}/
          </span>

          <span className="wianjana-card-link">
            Pelajari →
          </span>
        </button>
      ))}
    </div>

    {selectedSwalalita ? (
      <div className="wianjana-detail">

        <div className="wianjana-detail-main">
          <span className="lesson-tag">AKSARA TERPILIH</span>

          <div className="wianjana-detail-glyph balinese-script">
            {selectedSwalalita.glyph}
          </div>

          <h2>Aksara {selectedSwalalita.name}</h2>

          <p>
            Bunyi: /{selectedSwalalita.latin}/
          </p>
        </div>

        <div className="wianjana-writing">
          <h3>Cara Berlatih Menulis</h3>

          <p>
            Pelajari bentuk aksara melalui dua metode latihan.
          </p>

          <div className="practice-options">

            <div className="practice-option book-option">
              <div className="practice-option-heading">
                <span>📖</span>
                <h4>Latihan di Buku</h4>
              </div>

              <p>
                Amati bentuk aksara, kemudian salin ke
                buku latihan secara berulang.
              </p>

              <div className="book-example">
                <span className="book-example-glyph balinese-script">
                  {selectedSwalalita.glyph}
                </span>

                <span>
                  Aksara {selectedSwalalita.name}
                </span>
              </div>

              <ol>
                <li>Amati bentuk aksara.</li>
                <li>Salin ke buku latihan.</li>
                <li>Ulangi beberapa kali.</li>
                <li>Periksa hasil tulisanmu.</li>
              </ol>
            </div>

            <div className="practice-option digital-option">
              <div className="practice-option-heading">
                <span>✍️</span>
                <h4>Latihan Langsung di Layar</h4>
              </div>

              <p>
                Tirukan bentuk aksara menggunakan mouse,
                touchpad, atau jari.
              </p>

              <WritingPractice
                glyph={selectedSwalalita.glyph}
              />
            </div>

          </div>
        </div>

      </div>
    ) : (
      <div className="material-panel">
        <h3>Aksara Swalalita adalah sistem penulisan pada Aksara Bali yang lengkap, yaitu
          gabungan dari Aksara Wreastra (Aksara dasar untuk bahasa bali umum) di tambah 
          dengan aksara wayah (aksara suara dan konsonan tambahan). Aksara Swalalita digunakan untuk menuliskan naskah atau teks yang mengandung unsur 
          bahasa Kawi, Jawa Kuno, dan Sansekerta di Bali. 
        </h3>
        <p>
          Pilih salah satu kartu untuk melihat bentuk,
          nama, bunyi, dan latihan menulis aksara.
        </p>
      </div>
    )}
        </>
    ) : selectedCategory === 'Pengangge Suara, Aksara Suara, dan Ardasuara' ? (
  <>
    <div className="wianjana-heading">
      <h1>Pengangge Suara, Aksara Suara, dan Ardasuara</h1>
      <p>
        Pelajari bentuk dan cara penulisan sesuai
        Pedoman Pasang Aksara Bali.
      </p>
    </div>

    {!selectedSoundSection ? (
      <div className="pasang-choice-grid">

        <button
          type="button"
          className="pasang-choice-card"
          onClick={() => setSelectedSoundSection('pengangge-suara')}
        >
          <span className="pasang-choice-number">01</span>
          <h2>Pengangge Suara</h2>
          <p>Pelajari 11 bentuk pengangge suara.</p>
          <span>Mulai Belajar →</span>
        </button>

        <button
          type="button"
          className="pasang-choice-card"
          onClick={() => setSelectedSoundSection('aksara-suara')}
        >
          <span className="pasang-choice-number">02</span>
          <h2>Aksara Suara</h2>
          <p>Pelajari aksara suara berdasarkan pedoman.</p>
          <span>Mulai Belajar →</span>
        </button>

        <button
          type="button"
          className="pasang-choice-card"
          onClick={() => setSelectedSoundSection('ardasuara')}
        >
          <span className="pasang-choice-number">03</span>
          <h2>Pengangge Ardasuara</h2>
          <p>Pelajari lima bentuk ardasuara.</p>
          <span>Mulai Belajar →</span>
        </button>

      </div>
    ) : (
      <>
        <button
          type="button"
          className="back-button"
         onClick={() => {
  setSelectedSoundCard(null)
  setSelectedSoundSection(null)
}}
        >
          ← Kembali ke pilihan materi
        </button>

        <div className="material-panel">
          <span className="lesson-tag">MATERI PEMBELAJARAN</span>

          <h2>
            {selectedSoundSection === 'pengangge-suara'
              ? 'Pengangge Suara'
              : selectedSoundSection === 'aksara-suara'
                ? 'Aksara Suara'
                : 'Pengangge Ardasuara'}
          </h2>

          <p>
            Materi pembelajaran sesuai Pedoman
            Pasang Aksara Bali.
          </p>
        </div>


{selectedSoundCard ? (
  <>
    <button
      type="button"
      className="back-button"
      onClick={() => setSelectedSoundCard(null)}
    >
      ← Kembali ke daftar kartu
    </button>

    <div className="wianjana-detail">
      <div className="wianjana-detail-main">
        <span className="lesson-tag">MATERI TERPILIH</span>

        <div className="wianjana-detail-glyph balinese-script">
          {selectedSoundCard.glyph}
        </div>

        <h2>{selectedSoundCard.name}</h2>

        <p>
          Pelajari bentuk, fungsi, dan cara penulisannya
          sesuai Pedoman Pasang Aksara Bali.
        </p>
      </div>

      <div className="wianjana-writing">
        <h3>Cara Berlatih Menulis</h3>

        <div className="practice-options">

          <div className="practice-option book-option">
            <div className="practice-option-heading">
              <span>📖</span>
              <h4>Latihan di Buku</h4>
            </div>

            <p>
              Amati bentuk aksara, kemudian salin
              ke buku latihan secara berulang.
            </p>

            <div className="book-example">
              <span className="book-example-glyph balinese-script">
                {selectedSoundCard.glyph}
              </span>
              <span>{selectedSoundCard.name}</span>
            </div>

            <ol>
              <li>Amati bentuk aksara.</li>
              <li>Salin ke buku latihan.</li>
              <li>Ulangi beberapa kali.</li>
              <li>Periksa hasil tulisanmu.</li>
            </ol>
          </div>

          <div className="practice-option digital-option">
            <div className="practice-option-heading">
              <span>✍️</span>
              <h4>Latihan Langsung di Layar</h4>
            </div>

            <p>
              Tirukan bentuk menggunakan mouse,
              touchpad, atau jari.
            </p>

            <WritingPractice glyph={selectedSoundCard.glyph} />
          </div>

        </div>
      </div>
    </div>
  </>
) : (
  <div className="wianjana-card-grid">
    {(
      selectedSoundSection === 'pengangge-suara'
        ? penganggeSuaraCards
        : selectedSoundSection === 'aksara-suara'
          ? aksaraSuaraCards
          : ardasuaraCards
    ).map((card) => (
      <button
        type="button"
        key={card.id}
        className="wianjana-card"
        onClick={() => setSelectedSoundCard(card)}
      >
        <span className="wianjana-card-glyph balinese-script">
          {card.glyph}
        </span>

        <strong>{card.name}</strong>

        <span className="wianjana-card-link">
          Pelajari →
        </span>
      </button>
    ))}
  </div>
)}


      </>
    )}
    </>
) : selectedCategory === 'Pengangge Tengenan' ? (
  <>
    <div className="wianjana-heading">
      <h1>Pengangge Tengenan</h1>
      <p>Pelajari empat bentuk Pengangge Tengenan.</p>
    </div>

    {selectedTengenanCard ? (
      <>
        <button
          className="back-button"
          type="button"
          onClick={() => setSelectedTengenanCard(null)}
        >
          ← Kembali ke daftar kartu
        </button>

        <div className="wianjana-detail">
          <div className="wianjana-detail-main">
            <span className="lesson-tag">MATERI TERPILIH</span>

            <div className="wianjana-detail-glyph balinese-script">
              {selectedTengenanCard.glyph}
            </div>

            <h2>{selectedTengenanCard.name}</h2>
          </div>

          <div className="wianjana-writing">
            <h3>Latihan di Buku</h3>

            <div className="book-example">
              <span className="book-example-glyph balinese-script">
                {selectedTengenanCard.glyph}
              </span>
              <span>{selectedTengenanCard.name}</span>
            </div>

            <h3>Latihan Langsung di Layar</h3>

            <WritingPractice glyph={selectedTengenanCard.glyph} />
          </div>
        </div>
      </>
    ) : (
      <div className="wianjana-card-grid">
        {tengenanCards.map((card) => (
          <button
            type="button"
            className="wianjana-card"
            key={card.id}
            onClick={() => setSelectedTengenanCard(card)}
          >
            <span className="wianjana-card-glyph balinese-script">
              {card.glyph}
            </span>

            <strong>{card.name}</strong>
            <span className="wianjana-card-link">Pelajari →</span>
          </button>
        ))}
      </div>
    )}
  </>

) : selectedCategory === 'Ceciren papaosan (Tanda Baca)' ? (
  <>
    <div className="wianjana-heading">
      <h1>Ceciren & Tanda Baca</h1>
      <p>
        Pelajari fungsi dan penggunaan tanda baca
        berdasarkan Pedoman Pasang Aksara Bali.
      </p>
    </div>

    <div className="material-panel ceciren-intro">
      <span className="lesson-tag">PENGENALAN MATERI</span>
      <h2>Apa fungsi Ceciren?</h2>
      <p>
        Ceciren atau tanda baca digunakan untuk
        mengatur penulisan Aksara Bali, seperti
        menandai jeda, akhir kalimat, awal tulisan,
        dan bagian tertentu dalam karya sastra.
      </p>
      <p>
        Pilih salah satu tanda untuk mempelajari
        bentuk, fungsi, dan cara penulisannya.
      </p>
    </div>

    {selectedCecirenCard ? (
      <>
        <button
          type="button"
          className="back-button"
          onClick={() => setSelectedCecirenCard(null)}
        >
          ← Kembali ke daftar tanda
        </button>

        <div className="wianjana-detail">
          <div className="wianjana-detail-main">
            <span className="lesson-tag">TANDA TERPILIH</span>

            <div className="wianjana-detail-glyph balinese-script">
              {selectedCecirenCard.glyph}
            </div>

            <h2>{selectedCecirenCard.name}</h2>
            <p>{selectedCecirenCard.usage}</p>
          </div>

          <div className="wianjana-writing">
            <h3>Cara Berlatih Menulis</h3>

            <div className="practice-options">
              <div className="practice-option book-option">
                <div className="practice-option-heading">
                  <span>📖</span>
                  <h4>Latihan di Buku</h4>
                </div>

                <p>
                  Amati bentuk tanda, kemudian salin
                  ke buku latihan secara berulang.
                </p>

                <div className="book-example">
                  <span className="book-example-glyph balinese-script">
                    {selectedCecirenCard.glyph}
                  </span>
                  <span>{selectedCecirenCard.name}</span>
                </div>

                <ol>
                  <li>Amati bentuk tanda.</li>
                  <li>Salin ke buku latihan.</li>
                  <li>Ulangi beberapa kali.</li>
                  <li>Periksa hasil tulisanmu.</li>
                </ol>
              </div>

              <div className="practice-option digital-option">
                <div className="practice-option-heading">
                  <span>✍️</span>
                  <h4>Latihan Langsung di Layar</h4>
                </div>

                <p>
                  Tirukan bentuk tanda menggunakan
                  mouse, touchpad, atau jari.
                </p>

                <WritingPractice
                  glyph={selectedCecirenCard.glyph}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="wianjana-card-grid">
        {cecirenCards.map((card) => (
          <button
            type="button"
            className="wianjana-card"
            key={card.id}
            onClick={() => setSelectedCecirenCard(card)}
          >
            <span className="wianjana-card-glyph balinese-script">
              {card.glyph}
            </span>

            <strong>{card.name}</strong>

            <span className="wianjana-card-link">
              Pelajari →
            </span>
          </button>
        ))}
      </div>
    )}
  </>
) : (
  <>
    <div className="material-panel">
      <h3>Materi {selectedCategory}</h3>
      <p>
        Bagian ini disiapkan untuk materi {selectedCategory}.
        Kamu bisa menambahkan penjelasan, tabel,
        contoh penulisan, dan latihan.
      </p>
    </div>
  </>
)}


  </section>
)



const renderAngkaBali = () => (
  <section className="page-content">
    <button className="back-button" onClick={() => navigate('aksara')}>
      ← Kembali ke Jelajahi Aksara
    </button>

    <div className="eyebrow">MATERI PEMBELAJARAN</div>

    <div className="wianjana-heading">
      <h1>Angka Bali</h1>
      <p>
        Pelajari bentuk angka Bali dari nol sampai sembilan.
        Pilih kartu untuk melihat detail dan berlatih menulis.
      </p>
    </div>

    <div className="wianjana-card-grid">
      {angkaBali.map((item) => (
        <button
          type="button"
          key={item.digit}
          className={`wianjana-card ${
            selectedAngkaBali?.digit === item.digit ? 'active' : ''
          }`}
          onClick={() => setSelectedAngkaBali(item)}
        >
          <span className="wianjana-card-glyph balinese-script">
            {item.glyph}
          </span>

          <strong>Angka {item.digit}</strong>

          <span className="wianjana-card-sound">
            Nilai: {item.digit}
          </span>

          <span className="wianjana-card-link">
            Pelajari →
          </span>
        </button>
      ))}
    </div>

    {selectedAngkaBali ? (
      <div className="wianjana-detail">
        <div className="wianjana-detail-main">
          <span className="lesson-tag">ANGKA TERPILIH</span>

          <div className="wianjana-detail-glyph balinese-script">
            {selectedAngkaBali.glyph}
          </div>

          <h2>Angka Bali {selectedAngkaBali.digit}</h2>
          <p>Nilai angka: {selectedAngkaBali.digit}</p>
        </div>

        <div className="wianjana-writing">
          <h3>Cara Berlatih Menulis</h3>

          <div className="practice-options">
            <div className="practice-option book-option">
              <div className="practice-option-heading">
                <span>📖</span>
                <h4>Latihan di Buku</h4>
              </div>

              <p>Amati bentuk angka dan salin ke buku latihan.</p>

              <div className="book-example">
                <span className="book-example-glyph balinese-script">
                  {selectedAngkaBali.glyph}
                </span>
                <span>Angka {selectedAngkaBali.digit}</span>
              </div>

              <ol>
                <li>Amati bentuk angka.</li>
                <li>Salin ke buku latihan.</li>
                <li>Ulangi beberapa kali.</li>
                <li>Periksa hasil tulisanmu.</li>
              </ol>
            </div>

            <div className="practice-option digital-option">
              <div className="practice-option-heading">
                <span>✍️</span>
                <h4>Latihan Langsung di Layar</h4>
              </div>

              <p>Gunakan mouse, touchpad, atau jari untuk menulis.</p>

              <WritingPractice glyph={selectedAngkaBali.glyph} />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="material-panel">
        <h3>Yuk, mulai belajar!</h3>
        <p>Pilih salah satu kartu angka untuk melihat detail dan latihan.</p>
      </div>
    )}
  </section>
)


const renderGantunganGempelan = () => (
  <section className="page-content">

    <button
      className="back-button"
      onClick={() => navigate('aksara')}
    >
      ← Kembali ke Jelajahi Aksara
    </button>

    <div className="eyebrow">MATERI PEMBELAJARAN</div>

    <div className="wianjana-heading">
      <h1>Gantungan & Gempelan</h1>
      <p>
        Pelajari bentuk, fungsi, dan penggunaan
        gantungan serta gempelan dalam Aksara Bali.
      </p>
    </div>

    {!selectedPasangType ? (
      <div className="pasang-choice-grid">

        <button
          className="pasang-choice-card"
          type="button"
          onClick={() => {
            setSelectedPasangType('gantungan')
            setSelectedPasangScript(null)
          }}
        >
          <span className="pasang-choice-number">01</span>
          <span className="pasang-choice-icon">📜</span>
          <h2>Gantungan</h2>
          <p>
            Pelajari bentuk dan penggunaan
            gantungan Aksara Bali.
          </p>
          <span>Mulai Belajar →</span>
        </button>

        <button
          className="pasang-choice-card"
          type="button"
          onClick={() => {
            setSelectedPasangType('gempelan')
            setSelectedPasangScript(null)
          }}
        >
          <span className="pasang-choice-number">02</span>
          <span className="pasang-choice-icon">📝</span>
          <h2>Gempelan</h2>
          <p>
            Pelajari bentuk dan penggunaan
            gempelan Aksara Bali.
          </p>
          <span>Mulai Belajar →</span>
        </button>

      </div>
    ) : (
      <>
        <button
          type="button"
          className="back-button"
          onClick={() => {
            setSelectedPasangType(null)
            setSelectedPasangScript(null)
          }}
        >
          ← Kembali ke pilihan utama
        </button>

        <div className="material-panel">
          <h2>
            {selectedPasangType === 'gantungan'
              ? 'Gantungan Aksara Bali'
              : 'Gempelan Aksara Bali'}
          </h2>

          <p>
            Pilih jenis aksara yang ingin kamu pelajari.
          </p>
        </div>

        <div className="pasang-script-grid">

          <button
            type="button"
            className={`pasang-script-card ${
              selectedPasangScript === 'wreastra' ? 'active' : ''
            }`}
            onClick={() => setSelectedPasangScript('wreastra')}
          >
            <span>01</span>
            <h3>Wianjana Wreastra</h3>
            <p>Aksara dasar untuk penulisan Bahasa Bali.</p>
            <strong>Pelajari →</strong>
          </button>

          <button
            type="button"
            className={`pasang-script-card ${
              selectedPasangScript === 'swalalita' ? 'active' : ''
            }`}
            onClick={() => setSelectedPasangScript('swalalita')}
          >
            <span>02</span>
            <h3>Wianjana Swalalita</h3>
            <p>Aksara untuk penulisan kata dari bahasa Kawi dan Sanskerta.</p>
            <strong>Pelajari →</strong>
          </button>

        </div>

       
{selectedPasangScript && (
  <div className="pasang-reference-section">

    <div className="material-panel pasang-detail-panel">
      <span className="lesson-tag">MATERI TERPILIH</span>

      <h2>
        {selectedPasangType === 'gantungan'
          ? 'Gantungan'
          : 'Gempelan'}{' '}
        {selectedPasangScript === 'wreastra'
          ? 'Wianjana Wreastra'
          : 'Wianjana Swalalita'}
      </h2>

      <p>
        Pelajari bentuk dan susunan aksara berdasarkan
        Pedoman Pasang Aksara Bali.
      </p>
    </div>


<div className="pasang-card-section">
  <h2>Kartu Pembelajaran</h2>
  <p>
    Pelajari nama dan bentuk masing-masing
    gantungan atau gempelan.
  </p>

  
{selectedPasangCard ? (
  <div className="pasang-card-detail-page">

    <button
      type="button"
      className="back-button"
      onClick={() => setSelectedPasangCard(null)}
    >
      ← Kembali ke daftar kartu
    </button>

    <div className="material-panel">
      <span className="lesson-tag">MATERI PEMBELAJARAN</span>

      <h2>
        {selectedPasangType === 'gempelan'
          ? `Gempelan ${selectedPasangCard.name}`
          : `Gantungan ${selectedPasangCard.name}`}
      </h2>

      <h3>Bentuk dan Cara Penulisan</h3>

      <div className="pasang-detail-glyph">
        {selectedPasangCard.glyph}
      </div>

      <p>
        Pelajari bentuk serta posisi penulisan
        sesuai Pedoman Pasang Aksara Bali.
      </p>
    </div>

    <h3>Contoh Penulisan</h3>

    <div className="pasang-example-grid">
      <div className="pasang-example-card">
        <span>Bentuk utama</span>
        <div className="pasang-detail-glyph">
          {selectedPasangCard.glyph}
        </div>
      </div>
    </div>

    <h3>Latihan di Buku</h3>
    <div className="material-panel">
      Salin bentuk di atas ke buku latihan
      sesuai contoh dan petunjuk penulisan.
    </div>

    <h3>Latihan Menulis Langsung di Layar</h3>
    <WritingPractice glyph={selectedPasangCard.glyph} />

  </div>
) : (
  <div className="pasang-card-grid">
    {(
      selectedPasangType === 'gempelan'
        ? gempelanCards
        : selectedPasangScript === 'wreastra'
          ? gantunganWreastraCards
          : gantunganSwalalitaCards
    ).map((card, index) => (
      <button
        type="button"
        className="pasang-learning-card"
        key={card.id}
        onClick={() => setSelectedPasangCard(card)}
      >
        <span className="pasang-card-number">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3>
          {selectedPasangType === 'gempelan'
            ? `Gempelan ${card.name}`
            : `Gantungan ${card.name}`}
        </h3>

        <div className="pasang-learning-glyph">
          {card.glyph}
        </div>

        <span>Pelajari →</span>
      </button>
    ))}
  </div>
)}

</div>


    {selectedPasangType === 'gantungan' ? (
      <div className="pasang-reference-grid">

        <figure className="pasang-reference-card">
          <img
            src="/images/pasang-aksara/gantungan-halaman-9.png"
            alt="Referensi bentuk gantungan halaman 9"
          />
          <figcaption>
        
          </figcaption>
        </figure>

        <figure className="pasang-reference-card">
          <img
            src="/images/pasang-aksara/gantungan-lanjutan-halaman-10.png"
      
          />
          <figcaption>
        
          </figcaption>
        </figure>

      </div>
    ) : (
      <figure className="pasang-reference-card">
        <img
          src="/images/pasang-aksara/gempelan-halaman-10.png"
          alt="Referensi bentuk gempelan halaman 10"
        />
    
       </figure>
    )}

    <p className="pasang-reference-note">
      Gambar di atas merupakan referensi pedoman.
      Daftar kartu per karakter akan disusun setelah
      setiap bentuk dicocokkan dengan aksara pokoknya.
    </p>

  </div>
)}
            </>
    )}
  </section>
)


const renderKosakata = () => {
  const kosakata = [
    {
      word: 'bapa',
      glyph: 'ᬩᬧ',
      meaning: 'Ayah',
      source: 'Kata dasar - halaman 12',
    },
    {
      word: 'jaja',
      glyph: 'ᬚᬚ',
      meaning: 'Kue atau jajanan',
      source: 'Kata dasar - halaman 12',
    },
    {
      word: 'segara',
      glyph: 'ᬲᭂᬕᬭ',
      meaning: 'Laut',
      source: 'Kata dasar tiga suku kata - halaman 24',
    },
    {
      word: 'semadi',
      glyph: 'ᬲᭂᬫᬤᬶ',
      meaning: 'Semedi atau meditasi',
      source: 'Kata dasar tiga suku kata - halaman 24',
    },
    {
      word: 'negara',
      glyph: 'ᬦᭂᬕᬭ',
      meaning: 'Negara',
      source: 'Kata dasar tiga suku kata - halaman 24',
    },
    {
      word: 'semaya',
      glyph: 'ᬲᭂᬫᬬ',
      meaning: 'Janji atau perjanjian',
      source: 'Kata dasar tiga suku kata - halaman 24',
    },
    {
      word: 'ketimun',
      glyph: 'ᬓᭂᬢᬶᬫᬸᬦ᭄',
      meaning: 'Mentimun',
      source: 'Kata dasar pepet - halaman 25',
    },
    {
      word: 'ketipat',
      glyph: 'ᬓᭂᬢᬶᬧᬢ᭄',
      meaning: 'Ketupat',
      source: 'Kata dasar pepet - halaman 25',
    },
    {
      word: 'kedondong',
      glyph: 'ᬓᭂᬤᭀᬦ᭄ᬤᭀᬂ',
      meaning: 'Buah kedondong',
      source: 'Kata dasar pepet - halaman 25',
    },
    {
      word: 'sekolah',
      glyph: 'ᬲᭂᬓᭀᬮᬄ',
      meaning: 'Sekolah',
      source: 'Kata serapan modern - halaman 25',
    },
    {
      word: 'bendéra',
      glyph: 'ᬩᭂᬦ᭄ᬤᬾᬭ',
      meaning: 'Bendera',
      source: 'Kata serapan modern - halaman 25',
    },
    {
      word: 'sepéda',
      glyph: 'ᬲᭂᬧᬾᬤ',
      meaning: 'Sepeda',
      source: 'Kata serapan modern - halaman 25',
    },
    {
      word: 'sepatu',
      glyph: 'ᬲᭂᬧᬢᬸ',
      meaning: 'Sepatu',
      source: 'Kata serapan modern - halaman 25',
    },
  ]

  return (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">BELAJAR DARI KESEHARIAN</div>
      <h1>Kosakata <span>Bahasa Bali.</span></h1>

      <p className="section-desc">
        Pelajari contoh kosakata berdasarkan Pedoman Pasang Aksara Bali
        beserta bentuk Aksara Balinya.
      </p>

      <div className="kosakata-grid">
        {kosakata.map((item, index) => (
          <div className="kosakata-card" key={item.word}>
            <span className="kosakata-number">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="kosakata-script balinese-script">
              {item.glyph}
            </div>

            <h3>{item.word}</h3>
            <p className="kosakata-meaning">{item.meaning}</p>
            <span className="kosakata-source">{item.source}</span>
          </div>
        ))}
      </div>

      <div className="material-panel">
        <h3>Catatan Pembelajaran</h3>
        <p>
          Contoh kata dan bentuk Aksara Bali merujuk pada pedoman.
          Arti bahasa Indonesia ditambahkan sebagai keterangan belajar.
        </p>
      </div>
    </section>
  )
}



  
const renderKalimat = () => {
  const contohKalimat = [
    {
      id: 'kalimat-1',
      latin: 'Meme ngadep poh di peken.',
      aksara: 'ᬫᬾᬫᬾ​ᬦᬤᬾᬧ᭄​ᬧᭀᬄ​ᬤᬶ​ᬧᬾᬓᬾᬦ᭄᭟‌',
      arti: 'Ibu menjual mangga di pasar.',
      halaman: 'Halaman 22',
    },
    {
      id: 'kalimat-2',
      latin: 'Bapa mamula padi di carik.',
      aksara: 'ᬩᬧᬫᬫᬸᬮᬧᬤᬶᬤᬶᬘᬭᬶᬓ᭄᭟',
      arti: 'Ayah menanam padi di sawah.',
      halaman: 'Halaman 23',
    },
  ]

  return (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">BELAJAR MENYUSUN KALIMAT</div>
      <h1>Kalimat <span>Bahasa Bali.</span></h1>

      <p className="section-desc">
        Pelajari contoh kalimat Bahasa Bali, bentuk Aksara Bali,
        serta terjemahannya.
      </p>

      <div className="kalimat-list">
        {contohKalimat.map((item, index) => (
          <div className="kalimat-card" key={item.id}>
            <span className="kalimat-number">
              CONTOH {String(index + 1).padStart(2, '0')}
            </span>

            <h2>{item.latin}</h2>

            <div className="kalimat-aksara balinese-script">
              {item.aksara}
            </div>

            <div className="kalimat-translation">
              <span>TERJEMAHAN</span>
              <p>{item.arti}</p>
            </div>

            <span className="kalimat-source">
              Referensi: {item.halaman} buku pedoman
            </span>
          </div>
        ))}
      </div>

      <div className="material-panel">
        <h3>Catatan Pembelajaran</h3>
        <p>
          Perhatikan susunan kata dan bentuk aksara pada setiap
          contoh. Bandingkan penulisan Latin dengan Aksara Bali
          untuk memahami cara penulisannya.
        </p>
      </div>
    </section>
  )
}

 
const renderQuiz = () => {
  const tebakQuestions = [
    {
      prompt: 'Aksara apakah ini?',
      glyph: 'ᬓ',
      options: [
        { key: 'A', value: 'Ka' },
        { key: 'B', value: 'Na' },
        { key: 'C', value: 'Ma' },
      ],
      correctAnswer: 'A',
      explanation: 'Aksara tersebut dibaca Ka.',
    },
    {
      prompt: 'Aksara apakah ini?',
      glyph: 'ᬦ',
      options: [
        { key: 'A', value: 'Ca' },
        { key: 'B', value: 'Na' },
        { key: 'C', value: 'Ra' },
      ],
      correctAnswer: 'B',
      explanation: 'Aksara tersebut dibaca Na.',
    },
    {
      prompt: 'Aksara apakah ini?',
      glyph: 'ᬫ',
      options: [
        { key: 'A', value: 'Pa' },
        { key: 'B', value: 'Sa' },
        { key: 'C', value: 'Ma' },
      ],
      correctAnswer: 'C',
      explanation: 'Aksara tersebut dibaca Ma.',
    },
    {
      prompt: 'Aksara apakah ini?',
      glyph: 'ᬲ',
      options: [
        { key: 'A', value: 'Sa' },
        { key: 'B', value: 'Da' },
        { key: 'C', value: 'Ba' },
      ],
      correctAnswer: 'A',
      explanation: 'Aksara tersebut dibaca Sa.',
    },
    {
      prompt: 'Aksara apakah ini?',
      glyph: 'ᬩ',
      options: [
        { key: 'A', value: 'Ga' },
        { key: 'B', value: 'Ba' },
        { key: 'C', value: 'Ta' },
      ],
      correctAnswer: 'B',
      explanation: 'Aksara tersebut dibaca Ba.',
    },
  ]

  const readingQuestions = [
    {
      prompt: 'Bagaimana cara membaca kalimat berikut?',
      glyph: 'ᬫᬾᬫᬾ​ᬦᬤᬾᬧ᭄​ᬧᭀᬄ​ᬤᬶ​ᬧᬾᬓᬾᬦ᭄᭟',
      options: [
        { key: 'A', value: 'Meme ngadep poh di peken' },
        { key: 'B', value: 'I Ketut Wara ada ditu' },
        { key: 'C', value: 'Dugasé nulis lamaran' },
      ],
      correctAnswer: 'A',
      explanation: 'Cara membaca yang benar adalah meme ngadep poh di peken.',
    },
    {
      prompt: 'Bagaimana cara membaca kalimat berikut?',
      glyph: 'ᬫᬤᬾᬫᬧ᭄ᬮᬮᬶᬬᬦ᭄ᬩᭀᬮᬤᬶᬮᬧᬗᬦ᭄᭟',
      options: [
        { key: 'A', value: 'Embokné ngadep poh di peken' },
        { key: 'B', value: 'Made maplalian bola di lapangan' },
        { key: 'C', value: 'Nyurat sastra Bali' },
      ],
      correctAnswer: 'B',
      explanation: 'Cara membaca yang benar adalah Made maplalian bola di lapangan.',
    },
    {
      prompt: 'Bagaimana cara membaca kalimat berikut?',
      glyph: 'ᬢᬦᬄᬢᭂᬕᬮᬾᬕᭂᬲᬃᬢᬸᬃᬢᬸᬄ᭟',
      options: [
        { key: 'A', value: 'Embokné ngadep poh di peken' },
        { key: 'B', value: 'Made maplalian bola di lapangan' },
        { key: 'C', value: 'Tanah tegale gesar tur tuh' },
      ],
      correctAnswer: 'C',
      explanation: 'Cara membaca yang benar adalah Tanah tegale gesar tur tuh.',
    },
    {
      prompt: 'Bagaimana cara membaca kalimat berikut?',
      glyph: 'ᬳᬶᬕᬸᬲ᭄ᬢᬶᬗᬸᬭᬄᬭᬳᬶᬧᬳ᭄ᬮᬯᬦ᭄ᬩᬮᬶ᭟',
      options: [
        { key: 'A', value: 'Embokné ngadep poh di peken' },
        { key: 'B', value: 'Made maplalian bola di lapangan' },
        { key: 'C', value: 'I Gusti Ngurah Rai pahlawan Bali' },
      ],
      correctAnswer: 'C',
      explanation: 'Cara membaca yang benar adalah I Gusti Ngurah Rai pahlawan Bali .',
    },
  ]

  const activeQuestions =
    quizSection === 'tebak-aksara'
      ? tebakQuestions
      : readingQuestions

  const currentQuestion = activeQuestions[quizQuestionIndex]

  const correctOption = currentQuestion.options.find(
    (option) => option.key === currentQuestion.correctAnswer
  )

  return (
    <section className="page-content">
      <button className="back-button" onClick={() => navigate('home')}>
        ← Kembali ke Beranda
      </button>

      <div className="eyebrow">UJI PEMAHAMANMU</div>
      <h1>Tes <span>Kemampuan.</span></h1>

      <p className="section-desc">
        Pilih jenis tes untuk mengukur pemahamanmu tentang Aksara Bali.
      </p>

      {quizSection === 'menu' && (
        <div className="quiz-section-grid">
          <button
            className="quiz-section-card"
            onClick={() => startQuiz('tebak-aksara')}
          >
            <span className="quiz-section-number">01</span>
            <div className="quiz-section-glyph balinese-script">ᬓ ᬦ ᬫ</div>
            <h2>Tebak Aksara</h2>
            <p>
              Kenali bentuk aksara dan tebak nama atau bunyinya.
            </p>
            <span className="quiz-section-link">Mulai Tes →</span>
          </button>

          <button
            className="quiz-section-card"
            onClick={() => startQuiz('baca-kalimat')}
          >
            <span className="quiz-section-number">02</span>
            <div className="quiz-section-icon">📖</div>
            <h2>Tes Membaca Kalimat</h2>
            <p>
              Baca kalimat dalam Aksara Bali dan pilih penulisan Latinnya.
            </p>
            <span className="quiz-section-link">Mulai Tes →</span>
          </button>
        </div>
      )}

      {quizSection !== 'menu' && (
        <>
          <button className="back-button" onClick={backToQuizMenu}>
            ← Kembali ke Pilihan Tes
          </button>

          {quizDone ? (
            <div className="quiz-result">
              <div className="quiz-result-icon">🏆</div>
              <span className="lesson-tag">HASIL TES</span>
              <h2>Tes Selesai!</h2>
              <div className="quiz-final-score">
                {score} / {activeQuestions.length}
              </div>
              <p>
                {score === activeQuestions.length
                  ? 'Luar biasa! Semua jawabanmu benar.'
                  : 'Bagus! Terus berlatih agar kemampuanmu semakin meningkat.'}
              </p>

              <button
                className="button-primary"
                onClick={() => startQuiz(quizSection)}
              >
                Ulangi Tes ↻
              </button>
              <button
                className="button-secondary"
                onClick={backToQuizMenu}
              >
                Pilih Tes Lain
              </button>
            </div>
          ) : (
            <div className="quiz-card">
              <div className="quiz-meta">
                <span>
                  {quizSection === 'tebak-aksara'
                    ? 'TEBAK AKSARA'
                    : 'MEMBACA KALIMAT'}
                </span>
                <span>
                  SOAL {quizQuestionIndex + 1} / {activeQuestions.length}
                </span>
              </div>

              <div className="quiz-progress">
                <div
                  className="quiz-progress-fill"
                  style={{
                    width: `${((quizQuestionIndex + 1) / activeQuestions.length) * 100}%`,
                  }}
                />
              </div>

              <h3>{currentQuestion.prompt}</h3>

              <div
                className={`quiz-script balinese-script ${
                  quizSection === 'baca-kalimat' ? 'long-script' : ''
                }`}
              >
                {currentQuestion.glyph}
              </div>

              <div className="answers">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.key}
                    className={`answer ${
                      answer === option.key ? 'selected' : ''
                    } ${
                      checked && option.key === currentQuestion.correctAnswer
                        ? 'correct'
                        : ''
                    } ${
                      checked &&
                      answer === option.key &&
                      answer !== currentQuestion.correctAnswer
                        ? 'wrong'
                        : ''
                    }`}
                    onClick={() => setAnswer(option.key)}
                    disabled={checked}
                  >
                    <span>{option.key}</span>
                    {option.value}
                  </button>
                ))}
              </div>

              {checked && (
                <p className="feedback">
                  {answer === currentQuestion.correctAnswer
                    ? `Benar! ${currentQuestion.explanation}`
                    : `Belum tepat. Jawaban yang benar adalah ${correctOption?.value}.`}
                </p>
              )}

              <div className="quiz-bottom">
                <span>Skor benar: {score}</span>

                {!checked ? (
                  <button
                    className="button-primary"
                    onClick={() =>
                      checkAnswer(currentQuestion.correctAnswer)
                    }
                    disabled={!answer}
                  >
                    Periksa Jawaban →
                  </button>
                ) : (
                  <button
                    className="button-primary"
                    onClick={() => nextQuizQuestion(activeQuestions.length)}
                  >
                    {quizQuestionIndex === activeQuestions.length - 1
                      ? 'Lihat Hasil →'
                      : 'Soal Selanjutnya →'}
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}


  
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
           <p className="ai-message-text">
  {cleanAiText(item.content)}
  </p>
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
  if (selectedCategory === 'Angka Bali') {
    return renderAngkaBali()
  }

  if (selectedCategory === 'Gantungan & Gempelan') {
    return renderGantunganGempelan()
  }

  return renderMaterial()


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
