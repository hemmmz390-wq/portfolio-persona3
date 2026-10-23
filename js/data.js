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
    { id: "system", label: "SYSTEM", desc: "Nyalakan / matikan efek suara." },
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
};
