# Elbert Alwi — Persona Portfolio

Portfolio bergaya pause menu **Persona 3 Reload**, dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa build).

Navigasi: `↑ ↓` pilih, `Enter` konfirmasi, `Esc` kembali, `Q / E` pindah tab skill, `M` suara on/off. Mouse juga bisa.

## Struktur

| Path | Isi |
| --- | --- |
| `index.html` | Kerangka halaman dan semua layar |
| `css/style.css` | Semua gaya dan animasi |
| `js/data.js` | **Semua konten** — profil, project, skill, kontak, foto |
| `js/main.js` | Navigasi, transisi, efek suara |
| `assets/` | Foto hero, foto profil, gambar karakter |
| `tools/toonify.py` | Mengubah foto transparan jadi ilustrasi biru ala P3R |

## Menjalankan lokal

```bash
python -m http.server 5173
```

Lalu buka http://localhost:5173.

## Menambah karya foto (layar PHOTOGRAPHY)

1. Taruh foto di `assets/photography/` dan versi kecilnya (lebar ±720px) di `assets/photography/thumbs/`.
2. Tambahkan satu entri di `photography.photos` dalam `js/data.js`:

```js
{
  id: "nama-unik", title: "Judul", category: "street", // street | portrait | still | event
  tags: ["award"], // opsional: ikut tampil di tombol AWARD
  src: "assets/photography/foto.webp", thumbnail: "assets/photography/thumbs/foto.webp",
  width: 2000, height: 1333, alt: "Deskripsi isi foto",
  location: "", year: "", description: "", // opsional, tampil hanya kalau diisi
},
```

Tombol ALL/STREET/PRODUCT/PORTRAIT/EVENT/AWARD, posisinya (`x`, `y` dalam %), dan kategori yang dibukanya diatur di `photography.buttons`.

## Mengubah konten

Edit `js/data.js` saja. Setelah mengubah CSS/JS, naikkan angka `?v=` di `index.html` supaya browser tidak memakai versi lama.
