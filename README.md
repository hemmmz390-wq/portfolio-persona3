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

## Mengubah konten

Edit `js/data.js` saja. Setelah mengubah CSS/JS, naikkan angka `?v=` di `index.html` supaya browser tidak memakai versi lama.
