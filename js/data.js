// ===== Ganti semua isi di file ini dengan data kamu sendiri =====
window.PORTFOLIO = {
  profile: {
    name: "ELBERT ALWI",
    role: "Web Developer / Photographer / Content Creator",
    photo: "assets/profile.webp", // kosongkan untuk avatar inisial
    hero: "assets/hero.webp", // gambar latar penuh menu utama (subjek di kiri, kanan kosong untuk menu) — kosongkan untuk latar laut biasa
    heroVideo: "assets/hero.mp4", // video latar menu utama (loop, tanpa suara); `hero` dipakai sebagai poster & cadangan — kosongkan untuk foto saja
    music: "assets/audio/bgm.mp3", // backsound (loop); mulai setelah pengunjung menekan tombol pertama — kosongkan untuk tanpa lagu
    musicVolume: 0.35, // 0–1
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
  // lalu tambahkan satu entri di `photos`. `category` = street/portrait/still/event; `tags: ["award"]` (opsional)
  // membuat foto ikut muncul juga di tombol dengan id yang sama.
  photography: {
    person: "assets/character.webp", // foto potongan berlatar transparan untuk sosok di tengah
    // Dua kolom mengapit sosok. side: "left" | "right".
    // x = jarak tepi tombol yang menghadap sosok dari tepi luar artboard (%), y = posisi atas (%).
    // invert = huruf ke-berapa yang dibalik warnanya (0 = tidak ada).
    buttons: [
      { id: "all", label: "ALL", jp: "すべての作品", badge: "L2", title: "Semua Karya", hint: "Semua karya", side: "left", x: 63, y: 14, invert: 2 },
      { id: "street", label: "STREET", jp: "ストリート", icon: "dpad", title: "Street & Travel", hint: "Street & travel", side: "left", x: 66, y: 41, invert: 3 },
      { id: "still", label: "PRODUCT", jp: "プロダクト", icon: "square", title: "Product & Still-life", hint: "Product & still-life", side: "left", x: 63, y: 68, invert: 3 },
      { id: "portrait", label: "PORTRAIT", jp: "ポートレート", icon: "triangle", title: "Portrait", hint: "Portrait", side: "right", x: 63, y: 14, invert: 5 },
      { id: "event", label: "EVENT", jp: "イベント", icon: "circle", title: "Event & Action", hint: "Event & action", side: "right", x: 66, y: 41, invert: 3 },
      { id: "award", label: "AWARD", jp: "受賞作品", icon: "cross", title: "Award Winning", hint: "Foto juara lomba", side: "right", x: 63, y: 68, invert: 3 },
    ],
    // field opsional: location, year, description — tampil hanya kalau diisi
    photos: [
      {
        id: "reading-room", title: "Reading Room", category: "award",
        src: "assets/photography/award-reading-room-wide.webp", thumbnail: "assets/photography/thumbs/award-reading-room-wide.webp",
        width: 1401, height: 787,
        alt: "Seseorang duduk di kursi membaca selembar kertas di ruangan gelap, diapit dua lemari tinggi",
        description: "Juara 3 — ENLIGHT 2025 Photography Competition",
      },
      {
        id: "table-light", title: "Table Light", category: "award",
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
      {
        id: "product-coffee-cake", title: "Coffee Cake", category: "still",
        src: "assets/photography/product-coffee-cake.webp", thumbnail: "assets/photography/thumbs/product-coffee-cake.webp",
        width: 1499, height: 2000,
        alt: "Potongan kue kopi berlapis dengan krim bergelombang dan sebutir biji kopi di atasnya, di atas kertas putih berlatar kuning",
      },
      {
        id: "product-pain-au-chocolat", title: "Pain au Chocolat", category: "still",
        src: "assets/photography/product-pain-au-chocolat.webp", thumbnail: "assets/photography/thumbs/product-pain-au-chocolat.webp",
        width: 1333, height: 2000,
        alt: "Pain au chocolat berlapis dengan garis cokelat di atas piring keramik bertotol, disorot cahaya kuning",
      },
      {
        id: "product-good-day-leaves", title: "Good Day on Leaves", category: "still",
        src: "assets/photography/product-good-day-leaves.webp", thumbnail: "assets/photography/thumbs/product-good-day-leaves.webp",
        width: 853, height: 1280,
        alt: "Botol Good Day Cappuccino tergeletak di antara dedaunan hijau dan batu",
      },
      {
        id: "product-good-day-doodle", title: "Coffee Every Day", category: "still",
        src: "assets/photography/product-good-day-doodle.webp", thumbnail: "assets/photography/thumbs/product-good-day-doodle.webp",
        width: 853, height: 1280,
        alt: "Botol Good Day Cappuccino di atas rumput, dihiasi coretan ilustrasi putih bertuliskan Good Day dan coffee every day",
      },
      {
        id: "product-lucky-cat", title: "Lucky Cat", category: "still",
        src: "assets/photography/product-lucky-cat.webp", thumbnail: "assets/photography/thumbs/product-lucky-cat.webp",
        width: 726, height: 1280,
        alt: "Patung kucing keberuntungan putih dengan koin emas di dalam kotak akrilik bening beralas merah",
      },
      {
        id: "street-forest-light", title: "Forest Light", category: "street",
        src: "assets/photography/street-forest-light.webp", thumbnail: "assets/photography/thumbs/street-forest-light.webp",
        width: 720, height: 1280,
        alt: "Cahaya matahari menembus celah pepohonan tinggi di hutan, menerangi semak di bawahnya",
      },
      {
        id: "street-canopy", title: "Canopy", category: "street",
        src: "assets/photography/street-canopy.webp", thumbnail: "assets/photography/thumbs/street-canopy.webp",
        width: 900, height: 1600,
        alt: "Kanopi pohon rimbun difoto dari bawah, cabang-cabang menjulang ke langit biru",
      },
      {
        id: "street-paddy-flag", title: "Paddy & Flag", category: "street",
        src: "assets/photography/street-paddy-flag.webp", thumbnail: "assets/photography/thumbs/street-paddy-flag.webp",
        width: 853, height: 1280,
        alt: "Bendera merah putih berkibar di atas gubuk beratap hijau di tengah sawah",
      },
      {
        id: "street-golden-grass", title: "Golden Grass", category: "street",
        src: "assets/photography/street-golden-grass.webp", thumbnail: "assets/photography/thumbs/street-golden-grass.webp",
        width: 853, height: 1280,
        alt: "Siluet rumput liar dan pepohonan saat matahari terbenam dengan langit keemasan",
      },
      {
        id: "street-village-road", title: "Village Road", category: "street",
        src: "assets/photography/street-village-road.webp", thumbnail: "assets/photography/thumbs/street-village-road.webp",
        width: 1187, height: 1600,
        alt: "Jalan desa beraspal di antara sawah dan pepohonan, seseorang berjalan menjauh menuju rumah-rumah",
      },
      {
        id: "street-coastal-rock", title: "Coastal Rock", category: "street",
        src: "assets/photography/street-coastal-rock.webp", thumbnail: "assets/photography/thumbs/street-coastal-rock.webp",
        width: 776, height: 1034,
        alt: "Tebing batu karang berwarna jingga menjorok di atas pantai berbatu saat air surut",
      },
      {
        id: "street-temple-roof", title: "Temple Roof", category: "street",
        src: "assets/photography/street-temple-roof.webp", thumbnail: "assets/photography/thumbs/street-temple-roof.webp",
        width: 1125, height: 1500,
        alt: "Atap kelenteng berornamen naga dan ukiran warna-warni di bawah langit biru",
      },
      {
        id: "street-guardian-statues", title: "Guardian Statues", category: "street",
        src: "assets/photography/street-guardian-statues.webp", thumbnail: "assets/photography/thumbs/street-guardian-statues.webp",
        width: 1280, height: 959,
        alt: "Dua patung berwarna dengan ornamen emas berdiri di depan dinding batu bertingkat",
      },
      {
        id: "portrait-lattice-window", title: "Lattice Window", category: "portrait",
        src: "assets/photography/portrait-lattice-window.webp", thumbnail: "assets/photography/thumbs/portrait-lattice-window.webp",
        width: 915, height: 1600,
        alt: "Seseorang duduk dalam bayangan di depan jendela berteralis kisi, cahaya redup dari luar",
      },
      {
        id: "portrait-touch", title: "Touch", category: "portrait",
        src: "assets/photography/portrait-touch.webp", thumbnail: "assets/photography/thumbs/portrait-touch.webp",
        width: 853, height: 1280,
        alt: "Sebuah tangan menyentuh helai daun panjang dalam gelap",
      },
      {
        id: "portrait-amber-window", title: "Amber Window", category: "portrait",
        src: "assets/photography/portrait-amber-window.webp", thumbnail: "assets/photography/thumbs/portrait-amber-window.webp",
        width: 853, height: 1280,
        alt: "Siluet seseorang di depan jendela bertirai yang diterangi cahaya jingga",
      },
      {
        id: "event-night-parade", title: "Night Parade", category: "event",
        src: "assets/photography/event-night-parade.webp", thumbnail: "assets/photography/thumbs/event-night-parade.webp",
        width: 720, height: 1280,
        alt: "Kerumunan orang di jalan pada malam hari mengiringi arak-arakan dengan lampu biru dan merah",
      },
    ],
  },
};
