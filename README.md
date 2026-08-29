# AnakCerdas 🧸

> **Website Latihan Soal Interaktif, Ceria, dan Ramah Anak (Usia di Bawah 12 Tahun)**

AnakCerdas adalah platform web edukasi berbasis **Vue 3** yang dirancang dengan konsep *"Kamar Bermain Boneka Flanel"*. Aplikasi ini menghadirkan pengalaman belajar yang menyenangkan seperti bermain, dilengkapi visual boneka jahitan tangan, efek suara marimba ceria, dan umpan balik positif tanpa rasa takut gagal.

---

## ✨ Fitur Utama

- **4 Modul Petualangan (Total 80 Soal Interaktif)**:
  - 🧮 **Matematika (20 Soal)**: Penjumlahan, pengurangan, perkalian, dan pembagian sederhana dipandu *Beruang Kiki*.
  - 🧠 **Ingatan (Cerpen + 20 Soal)**: Membaca cerpen bergambar *"Kiki Si Kelinci dan Kebun Wortel Ajaib"* disusul uji daya ingat dipandu *Kelinci Kiki*.
  - 🌱 **Pengetahuan Alam (20 Soal)**: Hewan, tumbuhan, cuaca, dan tubuh manusia dipandu *Landak Dudu*.
  - 🏘️ **Pengetahuan Sosial (20 Soal)**: Budi pekerti, gotong royong, sopan santun, dan simbol negara dipandu *Kucing Ramah*.
- **Desain Flanel & Jalur Jahitan (*Stitch Trail*)**:
  - Palet warna pastel lembut (*Cream Base, Cream Deep, Bubblegum Pink, Raspberry, Gold Star*).
  - Garis jahitan flanel interaktif sebagai indikator progres soal dan **Kalung Bintang Prestasi** pada halaman hasil.
  - Tombol sentuh timbul-tenggelam (*felt button shadow*) yang ramah untuk tablet dan smartphone.
- **Ikon SVG Kustom**:
  - Seluruh 22 elemen visual dibuat menggunakan format SVG kustom murni (bebas emoji sistem operasi).
- **Synthesizer Audio Web Audio API**:
  - Musik latar marimba & ukulele ceria, jingle jawaban benar (Do-Mi-Sol), chime lembut saat salah, dan fanfare perayaan.
  - Kontrol mute/unmute persisten di seluruh sesi.
- **Umpan Balik Positif & Review 20 Soal**:
  - Penjelasan ramah anak tanpa kata menghakimi serta rincian ulasan lengkap jawaban benar vs jawaban anak.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **State Management** | [Pinia](https://pinia.vuejs.org/) |
| **Routing** | [Vue Router 4](https://router.vuejs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom Felt Design Tokens |
| **Audio Engine** | Web Audio API Synthesizer |
| **Testing** | [Vitest](https://vitest.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) (SPA History Mode ready) |

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (v18.0.0 atau lebih baru)
- npm / pnpm / yarn

### 2. Instalasi Dependensi
```bash
git clone https://github.com/Novazeb/anakcerdas.git
cd anakcerdas
npm install
```

### 3. Menjalankan Server Lokal (Development)
```bash
npm run dev
```
Buka browser ke `http://localhost:5173`.

### 4. Menjalankan Pengujian Unit (Vitest)
```bash
npm run test:unit
```

### 5. Membangun untuk Produksi (Build)
```bash
npm run build
```
File siap saji akan dibuat di folder `dist/`.

---

## 🌐 Deploy ke Vercel

Aplikasi ini sudah dilengkapi dengan file konfigurasi [`vercel.json`](./vercel.json) untuk mendukung routing SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Cara Deploy:
1. Hubungkan repositori GitHub ini ke dashboard [Vercel](https://vercel.com).
2. Framework preset akan otomatis terdeteksi sebagai **Vite**.
3. Klik **Deploy** dan website akan langsung online!

---

## 📁 Struktur Folder Proyek

```
anakcerdas/
├── public/                # Asset publik statis
├── src/
│   ├── assets/            # CSS Variables, Design Tokens, Base Styles
│   ├── components/
│   │   ├── common/        # AppHeader, AudioToggle, MascotCharacter, StitchTrail
│   │   ├── home/          # MenuCard
│   │   ├── icons/         # 22 Ikon SVG Kustom
│   │   ├── quiz/          # QuestionCard, AnswerOption, AnswerFeedback, StoryIntro
│   │   └── result/        # ScoreSummary, MotivationQuote, StarNecklace, AnswerReviewList
│   ├── composables/       # useShuffle, useConfetti, useReducedMotion
│   ├── data/              # 80 Bank Soal JSON (Matematika, Ingatan, Alam, Sosial)
│   ├── router/            # Vue Router dengan Navigation Guards
│   ├── stores/            # Pinia Stores (quizStore, audioStore)
│   ├── utils/             # Web Audio sound synthesizer
│   ├── views/             # HomeView, QuizView, ResultView
│   ├── App.vue
│   └── main.js
├── tests/
│   └── unit/              # Vitest test suites
├── index.html
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## 📄 Lisensi

Dibuat dengan penuh cinta dan kasih untuk anak-anak Indonesia. © 2026 AnakCerdas.

