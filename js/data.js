// ===== Ganti semua isi di file ini dengan data kamu sendiri =====
window.PORTFOLIO = {
  profile: {
    name: "ELBERT ALWI",
    role: "Web Developer / Photographer / Content Creator",
    photo: "assets/profile.webp", // kosongkan untuk avatar inisial
    hero: "assets/hero.webp", // gambar latar penuh menu utama (subjek di kiri, kanan kosong untuk menu) — kosongkan untuk latar laut biasa
    character: "", // isi "assets/character-toon.webp" untuk menampilkan karakter lagi (dibuat dengan tools/toonify.py)
    characterPose: "float", // "float" = melayang terbalik di air (ala P3R), "stand" = berdiri tegak
    stats: [
      ["BASE", "Bali"],
      ["AWARD", "Top 5 ARSPACE"],
      ["ARCANA", "Fool"],
    ],
    bio: [
      "Saya web developer, fotografer, dan content creator yang fokus membangun produk digital yang bersih dan fungsional, serta bercerita lewat foto dan video.",
      "Dari web app untuk UMKM dan hotel, website SEO, sampai konten TikTok tentang hidden gem di Bali — saya suka mengubah ide menjadi antarmuka. Portfolio ini terinspirasi dari pause menu Persona 3 Reload: navigasi pakai keyboard (↑ ↓ Enter Esc) atau mouse.",
    ],
    quote: { text: "Building for the web. Turning ideas into interfaces.", author: "Elbert Alwi" },
  },

  menu: [
    { id: "project", label: "PROJECT", desc: "Lihat proyek-proyek yang pernah saya buat." },
    { id: "skills", label: "SKILLS", desc: "Statistik kemampuan dan tools yang saya kuasai." },
    { id: "about", label: "ABOUT", desc: "Kenalan lebih dekat dengan saya." },
    { id: "contact", label: "CONTACT", desc: "Kirim pesan — inbox selalu terbuka." },
    { id: "photography", label: "PHOTOGRAPHY", desc: "Karya fotografi saya — pilih kategori seperti menu pertarungan." },
  ],

  projects: [
    {
      title: "Marginku", rank: 10, category: "Financial Tool", year: "2026",
      summary: "Web app pelacak margin untuk pemilik UMKM: margin per produk, saran harga jual, HPP rata-rata tertimbang, beda komisi GoFood/GrabFood/ShopeeFood, dan pembagian budget bulanan. Tanpa daftar, data tersimpan di browser.",
      tech: ["Solo Developer", "Web App", "Vercel"], link: "https://marginku-orcin.vercel.app",
    },
    {
      title: "Hospi AI", rank: 9, category: "Hotel AI Assistant", year: "2026",
      summary: "Asisten digital hotel yang mengubah permintaan tamu (chat, tombol cepat, atau rekaman suara, 8 bahasa) jadi tiket kerja yang otomatis diarahkan ke departemen yang tepat dengan timer SLA.",
      tech: ["Team Project", "AI", "Dashboard"], link: "https://hospi-ai.vercel.app",
    },
    {
      title: "Hibiz", rank: 8, category: "Organization Site", year: "2026",
      summary: "Website HIMA Business Technology and AI Innovation: susunan pengurus 2026–2027 beserta visi-misi, dan dokumentasi program yang sudah berjalan.",
      tech: ["Solo Developer", "Web", "Vercel"], link: "https://hibiz-web.vercel.app",
    },
    {
      title: "Kosguide", rank: 7, category: "SEO & SEM Website", year: "2026",
      summary: "Panduan barang kebutuhan kamar kos untuk mahasiswa dan anak rantau, dibangun untuk menang di pencarian: structured data, sitemap, landing page kampanye, dan kalkulator starter pack.",
      tech: ["SEO", "SEM", "Structured Data"], link: "https://kosguide.vercel.app",
    },
    {
      title: "Neduh Gas", rank: 6, category: "Content Creation", year: "2026",
      summary: "Channel TikTok tentang hidden gem, UMKM lokal, dan budaya Bali lewat storytelling dan vlog. Tim empat orang — saya di bagian content creation dan editing.",
      tech: ["TikTok", "Video Editing", "Storytelling"], link: "https://www.tiktok.com/@neduh_gas",
    },
  ],

  // Level 0–100 adalah perkiraan — sesuaikan sendiri.
  skills: {
    FRONTEND: [["Next.js", 85], ["React", 85], ["Tailwind CSS", 90], ["TypeScript", 78], ["SEO & SEM", 80]],
    PHOTOGRAPHY: [["Lightroom", 85], ["Camera Gear", 82]],
    CONTENT: [["CapCut", 88], ["AI Studio", 80], ["Storytelling", 82]],
    LANGUAGE: [["English", 75], ["Mandarin", 70]],
  },

  contact: [
    { app: "Email", handle: "elbertalwi0103@gmail.com", href: "mailto:elbertalwi0103@gmail.com", icon: "✉" },
    { app: "Instagram", handle: "@bert_alwi", href: "https://www.instagram.com/bert_alwi/", icon: "◎" },
    { app: "LinkedIn", handle: "in/elbert-alwi", href: "https://www.linkedin.com/in/elbert-alwi-4a4322388/", icon: "in" },
    { app: "TikTok", handle: "@neduh_gas", href: "https://www.tiktok.com/@neduh_gas", icon: "♪" },
  ],

  // ===== PHOTOGRAPHY (layar menu pertarungan) =====
  // Tambah karya: taruh foto di assets/photography/ (+ versi kecil di assets/photography/thumbs/),
  // lalu tambahkan satu entri di `photos`. `category` harus salah satu id di bawah (street/portrait/still/event).
  photography: {
    person: "assets/character.webp", // foto potongan berlatar transparan untuk sosok di tengah
    // x / y = posisi tombol dalam persen terhadap artboard persegi. invert = huruf ke-berapa yang dibalik warnanya.
    buttons: [
      { id: "all", label: "ORDER", jp: "作戦を指示する", badge: "L2", title: "Semua Karya", hint: "Semua karya", x: 1, y: 24, invert: 1 },
      { id: "street", label: "GUN", jp: "銃を構える", icon: "dpad", iconSide: "end", title: "Street & Travel", hint: "Street & travel", x: 0, y: 50, invert: 1 },
      { id: "portrait", label: "PERSONA", jp: "スキルを使う", icon: "triangle", title: "Portrait", hint: "Portrait", x: 52, y: 29, invert: 5 },
      { id: "still", label: "ITEM", jp: "アイテムを使う", icon: "square", title: "Product & Still-life", hint: "Product & still-life", x: 41, y: 49, invert: 2 },
      { id: "event", label: "SWORD", jp: "近接武器で攻撃", icon: "circle", title: "Event & Action", hint: "Event & action", x: 69, y: 55, invert: 3 },
      { id: "about", label: "GUARD", jp: "防御する", icon: "cross", title: "About Elbert", hint: "Tentang saya & kontak", x: 50, y: 75, invert: 1, type: "about" },
    ],
    // field opsional: location, year, description — tampil hanya kalau diisi
    photos: [
      {
        id: "reading-room", title: "Reading Room", category: "portrait",
        src: "assets/photography/award-reading-room-wide.webp", thumbnail: "assets/photography/thumbs/award-reading-room-wide.webp",
        width: 1401, height: 787,
        alt: "Seseorang duduk di kursi membaca selembar kertas di ruangan gelap, diapit dua lemari tinggi",
        description: "Juara 3 — ENLIGHT 2025 Photography Competition",
      },
      {
        id: "table-light", title: "Table Light", category: "portrait",
        src: "assets/photography/award-table-light.webp", thumbnail: "assets/photography/thumbs/award-table-light.webp",
        width: 1280, height: 719,
        alt: "Seseorang menyandarkan kepala di lengan pada meja putih, cahaya matahari membentuk pola lembut di dinding",
        description: "Top Five — ARSPACE Photography Competition, Universitas Ciputra Surabaya",
      },
      {
        id: "sea-temple", title: "Sea Temple", category: "street",
        src: "assets/photography/sea-temple.webp", thumbnail: "assets/photography/thumbs/sea-temple.webp",
        width: 2000, height: 1125,
        alt: "Pura laut di atas batu karang, ombak menyapu karang di bawahnya di bawah langit biru cerah",
      },
      {
        id: "clifftop-path", title: "Clifftop Path", category: "street",
        src: "assets/photography/clifftop-path.webp", thumbnail: "assets/photography/thumbs/clifftop-path.webp",
        width: 2000, height: 1125,
        alt: "Jalan setapak di tepi tebing dengan pagar kayu, pepohonan dan rumput di satu sisi, ombak pecah di bawah",
      },
      {
        id: "offering-walk", title: "Offering Walk", category: "street",
        src: "assets/photography/temple-offering-walk.webp", thumbnail: "assets/photography/thumbs/temple-offering-walk.webp",
        width: 2000, height: 1127,
        alt: "Perempuan berbusana putih melintas di depan gerbang batu berukir, membawa keranjang sesajen di atas kepala",
      },
      {
        id: "greenhouse", title: "Greenhouse", category: "event",
        src: "assets/photography/greenhouse-group.webp", thumbnail: "assets/photography/thumbs/greenhouse-group.webp",
        width: 2000, height: 1333,
        alt: "Sekelompok anak muda mengobrol dan tertawa di rumput depan greenhouse jaring yang besar",
      },
      {
        id: "cave-ceremony", title: "Cave Ceremony", category: "event",
        src: "assets/photography/cave-ceremony.webp", thumbnail: "assets/photography/thumbs/cave-ceremony.webp",
        width: 2000, height: 1123,
        alt: "Orang-orang berbusana upacara putih berkumpul di mulut gua laut, satu orang berjalan di air dangkal",
      },
      {
        id: "sunset-jump", title: "Sunset Jump", category: "event",
        src: "assets/photography/sunset-jump-field.webp", thumbnail: "assets/photography/thumbs/sunset-jump-field.webp",
        width: 965, height: 543,
        alt: "Dua siluet orang melompat di atas lapangan saat matahari terbenam rendah di belakang mereka",
      },
    ],
  },
};
