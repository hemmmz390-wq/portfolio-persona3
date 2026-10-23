"""Ubah foto berlatar transparan jadi ilustrasi biru ala Persona 3 Reload.

Pakai:  python tools/toonify.py assets/character.webp assets/character-toon.webp

Langkah: grayscale -> diterangkan -> 5 warna (navy, biru, cyan, biru pucat, putih)
lalu dikali garis hitam hasil deteksi tepi. Transparansi foto asli dipertahankan.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

PALETTE = np.array([
    (3, 8, 34),       # bayangan paling gelap (hampir hitam)
    (10, 36, 122),    # biru tua
    (58, 168, 255),   # cyan
    (214, 241, 255),  # biru pucat
    (255, 255, 255),  # sorotan
], dtype=np.float32) / 255
THRESHOLDS = [0.24, 0.40, 0.56, 0.70]  # batas kecerahan antar warna di atas
SCALE = 1.6       # perbesar dulu supaya garis lebih halus
GAMMA = 0.62      # < 1 = lebih terang (baju hitam jadi ada detail)
BLUR = 1.4        # haluskan sebelum dibagi warna
INK = 14.0        # makin besar makin tebal/banyak garis
INK_OFFSET = 1.2
OUTLINE = 5        # tebal garis luar siluet (px, setelah diperbesar)


def toonify(src, dst):
    im = Image.open(src).convert("RGBA")
    im = im.resize((int(im.width * SCALE), int(im.height * SCALE)), Image.LANCZOS)
    rgba = np.asarray(im, dtype=np.float32) / 255
    alpha = rgba[..., 3]

    # premultiplied supaya tepi siluet ikut jadi garis
    gray = (rgba[..., 0] * .3 + rgba[..., 1] * .59 + rgba[..., 2] * .11) * alpha
    lit = gray ** GAMMA
    soft_img = Image.fromarray((lit * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(BLUR))
    soft = np.asarray(soft_img, dtype=np.float32) / 255

    lap = soft_img.filter(ImageFilter.Kernel((3, 3), [-1, -1, -1, -1, 8, -1, -1, -1, -1], 1, 0))
    edge = np.asarray(lap, dtype=np.float32) / 255
    lines = np.clip(INK_OFFSET - INK * edge, 0, 1)[..., None]

    idx = np.digitize(soft, THRESHOLDS)
    flat = PALETTE[idx] * lines

    # garis luar hitam: siluet dilebarkan, ditaruh di belakang gambar
    a_img = Image.fromarray((alpha * 255).astype(np.uint8))
    outer = np.asarray(a_img.filter(ImageFilter.MaxFilter(OUTLINE * 2 + 1)), dtype=np.float32) / 255
    a = alpha[..., None]
    rgb = flat * a + PALETTE[0] * (1 - a)
    out = np.dstack([rgb, np.maximum(alpha, outer)])
    Image.fromarray((out * 255).astype(np.uint8), "RGBA").save(dst, quality=92)
    print(f"{dst}: {im.width}x{im.height}")


if __name__ == "__main__":
    toonify(sys.argv[1], sys.argv[2])
