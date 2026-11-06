# AKSARUNIKA
### Platform Pembelajaran Aksara Bali Berbasis Artificial Intelligence

## 1. Description

AKSARUNIKA merupakan platform pembelajaran digital berbasis web yang dirancang untuk membantu masyarakat mengenal, memahami, dan mempelajari Aksara Bali secara interaktif.

Platform ini mengintegrasikan materi pembelajaran Aksara Bali dengan teknologi Artificial Intelligence (AI) melalui fitur AI Tutor. Pengguna dapat mempelajari berbagai jenis aksara, mengenal kosakata dan kalimat, menguji kemampuan, serta mengajukan pertanyaan secara langsung kepada AI Tutor.

AKSARUNIKA dikembangkan sebagai bentuk pemanfaatan teknologi digital untuk mendukung pelestarian budaya Bali, khususnya dalam pembelajaran Aksara Bali.

## 2. Problem & Target User

### Problem

Pembelajaran Aksara Bali masih menghadapi beberapa tantangan, seperti:

- Terbatasnya media pembelajaran digital yang interaktif.
- Kesulitan bagi pemula dalam mengenali bentuk dan memahami penggunaan Aksara Bali.
- Kurangnya sarana pembelajaran mandiri yang menyediakan penjelasan secara langsung.
- Perlunya inovasi teknologi untuk meningkatkan ketertarikan generasi muda terhadap budaya Bali.

### Target User

AKSARUNIKA ditujukan kepada:

- Pelajar dan mahasiswa.
- Masyarakat umum yang ingin mempelajari Aksara Bali.
- Pengguna pemula yang ingin mengenal bentuk dan aturan penulisan Aksara Bali.
- Pendidik yang membutuhkan media pendukung pembelajaran.

## 3. Key Features

### Beranda
Halaman utama yang memperkenalkan AKSARUNIKA dan menyediakan navigasi menuju berbagai fitur.

### Mengenal Aksara Bali
Menyediakan pengenalan dasar mengenai Aksara Bali.

### Jelajahi Aksara
Menyediakan materi pembelajaran berdasarkan kategori:
- Aksara Wreastra.
- Gantungan dan Gempelan.
- Pengangge Suara.
- Aksara Swalalita.
- Angka Bali.
- Pengangge Tengenan.
- Ceciren dan Tanda Baca.

### Kosakata
Menyajikan contoh kosakata Bahasa Bali beserta bentuk tulisan Aksara Bali.

### Kalimat
Menyediakan contoh kalimat Bahasa Bali beserta tulisan Aksara Bali sebagai bahan latihan membaca.

### Tes Kemampuan
Terdiri atas:
- Tebak Aksara.
- Tes Membaca Kalimat.

### AI Tutor
Fitur berbasis AI yang memungkinkan pengguna bertanya mengenai Aksara Bali dan pengetahuan umum serta memperoleh penjelasan secara interaktif.

## 4. Tech Stack

| Teknologi | Fungsi |
|---|---|
| React | Pengembangan antarmuka pengguna |
| TypeScript | Pengembangan kode aplikasi |
| Vite | Development server dan build tool |
| CSS | Pengaturan tampilan aplikasi |
| Node.js | Backend pada lingkungan lokal |
| Vercel Functions | Backend API pada deployment |
| Google Gemini API | Layanan Artificial Intelligence |
| GitHub | Pengelolaan source code |
| Vercel | Hosting dan deployment |

## 5. AI Implementation

AKSARUNIKA menggunakan Google Gemini API untuk mendukung fitur AI Tutor.

**AI Model:** Gemini 3.5 Flash Lite.

### Cara Kerja AI Tutor

1. Pengguna memasukkan pertanyaan melalui halaman AI Tutor.
2. Frontend mengirimkan pertanyaan dan riwayat percakapan ke endpoint `/api/chat`.
3. Backend meneruskan permintaan ke Google Gemini API menggunakan API Key yang tersimpan dalam Environment Variables.
4. Gemini memproses pertanyaan berdasarkan instruksi sistem yang telah ditentukan.
5. Hasil respons dikirim kembali ke frontend dalam format JSON.
6. AI Tutor menampilkan jawaban kepada pengguna.

AI Tutor dirancang untuk memberikan penjelasan yang ramah, mudah dipahami, dan relevan dengan pembelajaran Aksara Bali.

## 6. Architecture / Data Flow

AKSARUNIKA menggunakan arsitektur frontend dan backend yang terhubung melalui API.

**Alur sistem:**

User → React Frontend → API `/api/chat` → Backend → Google Gemini API → Respons AI → Frontend → User.

Komponen utama:

- Frontend: React dan TypeScript.
- Backend lokal: Node.js melalui `server.mjs`.
- Backend deployment: Vercel Functions melalui `api/chat.js`.
- AI Service: Google Gemini API.
- Environment Variables: `GEMINI_API_KEY` untuk autentikasi layanan AI.

Pada lingkungan lokal, permintaan API diteruskan melalui konfigurasi Vite Proxy. Pada lingkungan produksi, permintaan diproses oleh Vercel Functions.

## 7. Installation / Run Instructions

### Prerequisites

- Node.js dan npm.
- Git.
- Koneksi internet.
- Google Gemini API Key.

### Clone Repository

```bash
git clone https://github.com/lianaprabha3-lab/AKSARUNIKA.git
cd AKSARUNIKA
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Buat file `.env.local` pada direktori utama proyek.

```env
GEMINI_API_KEY=your_gemini_api_key
```

Ganti `your_gemini_api_key` dengan API Key Google Gemini milik pengguna.

Jangan mengunggah file `.env.local` atau API Key asli ke repositori publik.

### Run Backend Server

Buka terminal pertama:

```bash
node server.mjs
```

Backend lokal berjalan pada:

```text
http://localhost:3002
```

### Run Frontend

Buka terminal kedua:

```bash
npm run dev
```

Vite akan menampilkan alamat lokal untuk mengakses aplikasi melalui browser.

### Build Application

```bash
npm run build
```

## 8. Deployment URL

**Live Application:**

https://aksarunika-git-development-yahayukk.vercel.app/

**GitHub Repository:**

https://github.com/lianaprabha3-lab/AKSARUNIKA

## 9. Demo Account

Tidak diperlukan akun demo karena AKSARUNIKA tidak menggunakan sistem autentikasi atau login pengguna.

Pengguna dapat langsung mengakses aplikasi dan menggunakan fitur pembelajaran yang tersedia.

## 10. Known Limitations

Beberapa keterbatasan AKSARUNIKA pada tahap MVP meliputi:

1. AI Tutor memerlukan koneksi internet untuk berkomunikasi dengan Google Gemini API.
2. Respons AI dapat memiliki ketidaktepatan informasi, terutama dalam penjelasan aturan penulisan dan penggunaan Aksara Bali.
3. Ketersediaan layanan AI bergantung pada layanan eksternal, batas penggunaan API, dan konfigurasi server.
4. Materi pembelajaran masih dapat dikembangkan dengan tambahan kosakata, kalimat, dan contoh penggunaan Aksara Bali.
5. Aplikasi masih berada pada tahap MVP sehingga fitur dan konten dapat dikembangkan lebih lanjut.

## 11. Third-party Resources / Credits

Teknologi dan layanan pihak ketiga yang digunakan meliputi:

- React.
- TypeScript.
- Vite.
- Node.js.
- Google Gemini API.
- GitHub.
- Vercel.

Sumber dan lisensi font, gambar, ikon, serta aset pendukung lainnya perlu dicantumkan sesuai dengan sumber asli masing-masing.

## 12. Team Members

- [Yurika Ramadhani Octavia Alfan] – [Ketua Tim].
- [Ni Putu Liana Prabha Amandita] – [Anggota 1].
- [Feriskha Indy Eritri] – [Anggota 2].
