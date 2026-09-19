# 🧸 Catatan Rilis AnakCerdas (Changelog)

Dokumentasi lengkap mengenai evolusi fitur, perbaikan antarmuka, dan peningkatan pengalaman belajar anak dari **Versi 1.0** hingga **Versi 1.1**.

---

## 📦 Versi 1.0 — Fondasi Awal & Konsep Flanel Edukatif
*Rilis Perdana Platform Edukasi Interaktif AnakCerdas*

### ✨ Fitur & Apa yang Dikerjakan Saat Itu:
1. **Konsep Desain "Kamar Boneka Flanel" (*Plush Felt Aesthetics*):**
   - Antarmuka bertema boneka flanel jahitan tangan yang menenangkan, tidak bising, dan ramah sensorik anak.
   - Palet warna pastel lembut (*Cream Base, Cream Deep, Bubblegum Pink, Raspberry, Gold Star*).
   - Efek tombol sentuh timbul-tenggelam (*felt button shadow*) yang mudah ditekan di layar sentuh tablet dan smartphone.
2. **4 Modul Petualangan Kuis:**
   - 🧮 **Matematika Ceria:** Penjumlahan, pengurangan, perkalian, dan logika dasar dipandu *Beruang Kiki*.
   - 🧠 **Daya Ingat & Dongeng:** Dongeng bergambar *"Kiki Si Kelinci dan Kebun Wortel Ajaib"* disusul pertanyaan ingatan dipandu *Kelinci Kiki*.
   - 🌱 **Pengetahuan Alam:** Hewan, tumbuhan, cuaca, dan tubuh manusia dipandu *Landak Dudu*.
   - 🏘️ **Pengetahuan Sosial:** Budi pekerti, gotong royong, sopan santun, dan simbol negara dipandu *Kucing Ramah*.
3. **Bank 200 Soal dengan Kurva 4 Tingkat:**
   - Setiap kategori memiliki bank 50 soal berkualitas tinggi (total 200 soal).
   - Setiap sesi latihan mengambil 20 soal bertingkat:
     - Soal 1 – 5: *Level 1 (Mudah / Pengenalan)*
     - Soal 6 – 10: *Level 2 (Ringan / Pemahaman)*
     - Soal 11 – 15: *Level 3 (Sedang / Penerapan)*
     - Soal 16 – 20: *Level 4 (Tantangan / Logika & Penalaran)*
   - Pilihan ganda (A, B, C) selalu diacak urutannya setiap kali bermain (*Fisher-Yates shuffle*).
4. **Synthesizer Web Audio API Murni (Zero Latency):**
   - Suara instan tanpa perlu unduh file MP3 berat:
     - Jingle gembira *Do-Mi-Sol* saat jawaban benar.
     - Chime lembut bersahabat saat jawaban belum tepat (tanpa bel hukuman yang mengagetkan anak).
     - Efek letupan kembang api (*confetti*).
   - 3 Tema Musik Latar (*BGM Synthesizer*):
     - 🎈 *Marimba Ceria* (Upbeat & Semangat)
     - 🌙 *Bintang Santai* (Kotak Musik Lullaby Tenang)
     - 🌲 *Petualangan Riang* (Acoustic Breeze)
   - Pop-up sambutan pemilih musik saat pertama kali masuk ke website.
5. **Aset Visual & Ikon SVG Kustom:**
   - 22 elemen visual SVG buatan tangan murni (bebas emoji sistem operasi yang berbeda-beda di tiap HP).
   - Indikator progres jalur jahitan (*Stitch Trail*) dan Kalung Bintang Prestasi di halaman hasil.
6. **Proteksi Anti-Inspect & Anti-Copy:**
   - Mencegah klik kanan, seleksi teks sembarangan, dan pintasan F12/inspect element agar anak fokus belajar dan aman.

---

## 🚀 Versi 1.1 — Penyempurnaan UX, Bebas Scroll, & Personalisasi Anak
*Pembaruan Besar Berdasarkan Masukan Nyata Pengguna & Prinsip Ergonomi Anak*

### 🔄 Perubahan & Fitur Baru yang Ditambahkan:
1. **Desain Bebas Scroll (*Single-Screen Fit*) & Pemangkasan Header Kuis:**
   - **Masalah Lama:** Di ponsel, anak harus *scroll* ke bawah untuk melihat pilihan jawaban bawah dan tombol "Selanjutnya".
   - **Solusi v1.1:**
     - `AppHeader` utama otomatis disembunyikan saat masuk ke sesi kuis.
     - Sub-header dipangkas menjadi bilah mini super-ramping setinggi ~32px.
     - Menghemat lebih dari 100px tinggi layar, menjamin pertanyaan dan opsi A, B, C **100% muat dalam satu layar tanpa scroll**.
2. **Pop-up Bottom Sheet Umpan Balik & Penjelasan Lebih Besar:**
   - Menggantikan pesan feedback statis dengan laci pop-up mengambang (*felt bottom sheet*) yang naik mulus dari bawah.
   - **Peningkatan Font:** Ukuran font penjelasan edukatif diperbesar secara signifikan dengan kotak teks yang lebih lapang dan nyaman dibaca anak.
   - Tombol besar *"Soal Berikutnya ➡️"* selalu berada di posisi yang konsisten di bagian bawah layar.
3. **Kontrol Audio Mengambang Vertikal di Kanan Atas:**
   - Tombol pemilih musik dan tombol mute diubah menjadi **dua tombol bulat flanel mengambang (*floating*) di pojok kanan atas**, tersusun vertikal ke bawah.
   - Tidak memakan ruang vertikal halaman dan mudah dijangkau kapan saja.
4. **Auto-Pause Background Music (`visibilitychange`):**
   - BGM otomatis dijeda (*paused*) saat anak beralih tab atau meminimalkan browser, dan otomatis melanjutkan melodi saat kembali ke web.
5. **Onboarding Profil Anak (Nama & Rentang Usia):**
   - Pop-up sambutan ramah flanel pada kunjungan pertama:
     - Input nama panggilan anak (misal: "Budi", "Aisyah").
     - Memilih kartu kelompok usia:
       - 🌱 **4 - 6 Tahun** (PAUD / TK)
       - ⭐ **7 - 9 Tahun** (SD Kelas 1-3)
       - 🏆 **10 - 12 Tahun** (SD Kelas 4-6)
   - Profil tersimpan secara lokal dan persisten di `localStorage`.
   - Di beranda hadir sapaan hangat *"Halo, [Nama Anak]! 🎈"* beserta lencana profil mini (`👤 [Nama] ([Usia]) • ✏️`) yang dapat diklik untuk berganti profil kapan saja jika kakak/adik bermain bergantian.
6. **Personalisasi Sapaan Nama Anak & Maskot di Feedback:**
   - Feedback kuis memanggil nama anak secara langsung:
     - *Benar:* *"Wah, Hebat Banget, [Nama Anak]! ⭐"*
     - *Salah:* *"Hampir Tepat, [Nama Anak]! 💡 Jangan berkecil hati ya, kata [Nama Maskot] jawaban yang benar adalah: '...'."*
   - Nama maskot dinamis mengikuti modul kuis: *Beruang Kiki* 🐻, *Kelinci Kiki* 🐰, *Landak Dudu* 🦔, dan *Kucing Miko* 🐱.
7. **Bank Soal Adaptif Kelompok Usia:**
   - Soal difilter berdasarkan usia anak:
     - **4–6 Tahun:** Disajikan soal-soal hitungan 1–10 konkret bergambar dan pengenalan flora/fauna dasar.
     - **7–9 Tahun:** Kurva seimbang 4 tingkat (Mudah s.d Tantangan).
     - **10–12 Tahun:** Soal penalaran cerita, perkalian/pembagian lanjutan, sains analitis, dan wawasan sosial.
8. **Representasi Visual Konkret pada Soal (*Concrete-Pictorial-Abstract*):**
    - Tepat di bawah pertanyaan, hadir bantuan visual yang bisa dihitung dengan jari:
      - *Matematika:* Logika matematis konkret yang ramah nalar anak. Penjumlahan & pengurangan menampilkan objek konkret di kedua sisi (`[ 🍎🍎 ] + [ 🍎🍎🍎 ] = ?`), sedangkan perkalian & pembagian menampilkan objek konkret dikalikan angka pengali murni (`[ 🍎🍎🍎🍎🍎 ] × [ 2 ] = ?`), sehingga anak tidak bingung mengalikan "apel dengan apel".
      - *Alam & Sosial:* Lencana topik konkret (🐝 Lebah, 🇮🇩 Bendera, 🦒 Jerapah, dll.).
9. **Modul Ingatan Sistem 3 Bab (7 – 7 – 6 Soal):**
   - Mengubah format dinding teks panjang menjadi alur membaca buku cerita bertahap:
     - **Bab 1:** *Kiki & Pintu Rahasia* (baca 2 paragraf) ➡️ Jawab **Soal 1 s.d 7**.
     - **Bab 2:** *Tiga Wortel Ajaib & Burung Piko* (baca 2 paragraf) ➡️ Jawab **Soal 8 s.d 14**.
     - **Bab 3:** *Berbagi Kasih & Bintang Persahabatan* (baca 2 paragraf) ➡️ Jawab **Soal 15 s.d 20**.
   - Dilengkapi tombol *"📖 Intip Dongeng"* di bilah atas kuis untuk melihat kembali isi cerita sewaktu-waktu.
10. **Penyimpanan Koleksi Bintang di `localStorage`:**
    - Rekor bintang terbaik anak tersimpan secara persisten di browser.
    - Total bintang ditampilkan di beranda (*"⭐ X Bintang Terkumpul!"*) dan lencana bintang pada setiap kartu menu (`⭐ X/20`).

---

*AnakCerdas © 2026 — Dibuat dengan penuh kasih untuk anak-anak Indonesia.*
