(() => {
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const state = { view: "loading", menu: 0, project: 0, tab: 0, mail: 0, busy: false, sound: true };

  // ---------- SFX (disintesis, tanpa file audio) ----------
  let ctx;
  function tone(freqs, { type = "square", dur = 0.06, gap = 0.05, vol = 0.05 } = {}) {
    if (!state.sound) return;
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const t = ctx.currentTime + i * gap;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    });
  }
  const sfx = {
    move: () => tone([1320], { dur: 0.04, vol: 0.03 }),
    confirm: () => tone([660, 990, 1480], { type: "triangle", dur: 0.12, gap: 0.05, vol: 0.08 }),
    back: () => tone([880, 520], { type: "triangle", dur: 0.1, gap: 0.06, vol: 0.07 }),
    start: () => tone([392, 523, 784, 1046], { type: "sawtooth", dur: 0.18, gap: 0.07, vol: 0.04 }),
  };

  // ---------- Isi data statis ----------
  $$("[data-bind]").forEach((el) => (el.textContent = D.profile[el.dataset.bind]));
  document.title = `${D.profile.name} | Portfolio`;

  // ---------- Foto hero (latar penuh menu) ----------
  const heroEl = $("#hero-bg");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let heroVideo = null;
  if (D.profile.hero || D.profile.heroVideo) {
    document.body.classList.add("has-hero");
    if (D.profile.heroVideo && !reduceMotion) {
      heroEl.innerHTML = `<video src="${D.profile.heroVideo}" poster="${D.profile.hero || ""}"
        autoplay muted loop playsinline preload="auto" disablepictureinpicture></video>`;
      heroVideo = heroEl.querySelector("video");
      // kalau video gagal dimuat, kembali ke foto
      heroVideo.addEventListener("error", () => {
        if (D.profile.hero) heroEl.innerHTML = `<img src="${D.profile.hero}" alt="">`;
        heroVideo = null;
      });
    } else {
      heroEl.innerHTML = `<img src="${D.profile.hero}" alt="">`;
    }
  } else {
    heroEl.remove();
  }
  // video hanya diputar saat menu utama terlihat (hemat baterai/CPU)
  const playHero = (on) => heroVideo && (on ? heroVideo.play().catch(() => {}) : heroVideo.pause());
  // browser bisa menahan video saat tab tidak aktif (hemat daya); lanjutkan lagi saat terlihat / ada interaksi
  const resumeHero = () => state.view === "menu" && document.visibilityState === "visible" && heroVideo?.paused && playHero(true);
  document.addEventListener("visibilitychange", resumeHero);
  addEventListener("pointerdown", resumeHero);
  addEventListener("keydown", resumeHero);

  // ---------- Karakter (gaya ilustrasi P3R) ----------
  const charEl = $("#character");
  if (D.profile.character) {
    charEl.classList.add(`pose-${D.profile.characterPose || "float"}`);
    charEl.innerHTML = `<div class="char-body"><img class="char-img" src="${D.profile.character}" alt=""></div>`;
  } else {
    charEl.remove();
  }

  // ---------- Menu utama ----------
  const menuList = $("#menu-list");
  menuList.innerHTML = D.menu
    .map((m, i) => `<li class="menu-item" role="menuitem" tabindex="-1" data-i="${i}" style="animation-delay:${i * 70}ms"><span class="label">${m.label}</span></li>`)
    .join("");
  const menuItems = $$(".menu-item", menuList);

  function setMenu(i, silent) {
    i = (i + D.menu.length) % D.menu.length;
    if (i !== state.menu && !silent) sfx.move();
    state.menu = i;
    menuItems.forEach((el, j) => el.classList.toggle("active", j === i));
    $("#menu-desc").textContent = D.menu[i].desc;
    const num = $("#side-number");
    num.textContent = String(i + 1).padStart(2, "0");
    num.classList.remove("bump");
    void num.offsetWidth;
    num.classList.add("bump");
  }

  menuItems.forEach((el) => {
    el.addEventListener("mouseenter", () => state.view === "menu" && setMenu(+el.dataset.i));
    el.addEventListener("click", () => state.view === "menu" && (setMenu(+el.dataset.i, true), selectMenu()));
  });

  function selectMenu() {
    const item = D.menu[state.menu];
    const el = menuItems[state.menu];
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
    open(item.id);
  }

  function toggleSound() {
    state.sound = !state.sound;
    $("#sound-label").textContent = `Suara: ${state.sound ? "ON" : "OFF"}`;
    sfx.confirm();
  }

  // Parallax ringan mengikuti mouse
  addEventListener("mousemove", (e) => {
    const x = (e.clientX / innerWidth - 0.5) * -18;
    const y = (e.clientY / innerHeight - 0.5) * -12;
    $("#menu-column").style.translate = `${x}px ${y}px`;
    $("#side-number").style.translate = `${-x * 1.5}px ${-y}px`;
    if (charEl.isConnected) charEl.style.translate = `${-x * 0.6}px ${-y * 0.4}px`;
  });

  // ---------- Transisi antar layar ----------
  const wipe = $("#wipe");
  // p5 = true: sapuan merah-hitam (dipakai saat masuk/keluar layar PHOTOGRAPHY)
  function transition(swap, p5 = false) {
    state.busy = true;
    wipe.classList.remove("run");
    wipe.classList.toggle("p5", p5);
    void wipe.offsetWidth;
    wipe.classList.add("run");
    setTimeout(swap, 560); // saat lapisan navy menutup penuh
    setTimeout(() => {
      wipe.classList.remove("run");
      state.busy = false;
    }, 1080);
  }

  function open(id) {
    if (state.busy) return;
    sfx.confirm();
    transition(() => {
      $("#menu").classList.add("away");
      playHero(false);
      const scr = $(`#screen-${id}`);
      scr.classList.add("open");
      scr.setAttribute("aria-hidden", "false");
      state.view = id;
      if (id === "project") renderProjects();
      if (id === "skills") renderSkills();
      if (id === "contact") renderContact();
      if (id === "photography") renderPhoto();
    }, id === "photography");
  }

  function back() {
    if (state.busy || state.view === "menu") return;
    sfx.back();
    const scr = $(`#screen-${state.view}`);
    transition(() => {
      scr.classList.remove("open");
      scr.setAttribute("aria-hidden", "true");
      $("#menu").classList.remove("away");
      playHero(true);
      state.view = "menu";
    }, state.view === "photography");
  }
  $$("[data-back]").forEach((b) => b.addEventListener("click", back));

  // ---------- PROJECT ----------
  const projList = $("#project-list");
  function renderProjects() {
    projList.classList.add("stagger");
    projList.innerHTML = D.projects
      .map(
        (p, i) => `<li class="project-card" role="tab" data-i="${i}" style="--i:${i}">
          <span class="rank"><span><small>RANK</small>${p.rank}</span></span>
          <div><h3>${p.title}</h3><p>${p.category}</p></div>
          <span class="year">${p.year}</span>
        </li>`
      )
      .join("");
    $$(".project-card", projList).forEach((el) => {
      el.addEventListener("mouseenter", () => setProject(+el.dataset.i));
      el.addEventListener("click", () => setProject(+el.dataset.i));
    });
    setProject(state.project, true);
  }

  function setProject(i, silent) {
    i = (i + D.projects.length) % D.projects.length;
    if (i === state.project && !silent) return;
    if (!silent) sfx.move();
    state.project = i;
    $$(".project-card", projList).forEach((el, j) => {
      el.classList.toggle("active", j === i);
      el.setAttribute("aria-selected", j === i);
    });
    const p = D.projects[i];
    const det = $("#project-detail");
    det.innerHTML = `
      <span class="detail-tag">${p.category.toUpperCase()}</span>
      <h2 class="detail-title">${p.title}</h2>
      <p class="detail-summary">${p.summary}</p>
      <div class="chips">${p.tech.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      <a class="detail-link" href="${p.link}" target="_blank" rel="noopener">LIHAT PROYEK ➜</a>
      <span class="detail-big" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>`;
    det.classList.remove("swap");
    void det.offsetWidth;
    det.classList.add("swap");
  }

  // ---------- SKILLS ----------
  const tabs = ["ALL", ...Object.keys(D.skills)];
  const tabNav = $("#skill-tabs");
  tabNav.innerHTML = tabs.map((t, i) => `<button class="skill-tab" role="tab" data-i="${i}">${t}</button>`).join("");
  $$(".skill-tab", tabNav).forEach((b) => b.addEventListener("click", () => setTab(+b.dataset.i)));
  $("#tab-prev").addEventListener("click", () => setTab(state.tab - 1));
  $("#tab-next").addEventListener("click", () => setTab(state.tab + 1));

  function renderSkills() {
    setTab(state.tab, true);
  }

  function setTab(i, silent) {
    i = (i + tabs.length) % tabs.length;
    if (!silent) sfx.move();
    state.tab = i;
    $$(".skill-tab", tabNav).forEach((b, j) => {
      b.classList.toggle("active", j === i);
      b.setAttribute("aria-selected", j === i);
    });
    const tab = tabs[i];
    const rows = tab === "ALL"
      ? Object.entries(D.skills).flatMap(([cat, list]) => list.map(([n, v]) => [n, v, cat]))
      : D.skills[tab].map(([n, v]) => [n, v, tab]);
    const grid = $("#skill-grid");
    grid.classList.remove("stagger");
    grid.innerHTML = rows
      .map(
        ([name, val, cat], k) => `<div class="skill-row" style="--i:${k}">
          <div><span class="skill-name">${name}</span><span class="skill-cat">${cat}</span></div>
          <span class="skill-lv"><small>Lv</small>${val}</span>
          <div class="meter"><i data-v="${val}"></i></div>
        </div>`
      )
      .join("");
    void grid.offsetWidth;
    grid.classList.add("stagger");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => $$(".meter i", grid).forEach((m) => (m.style.width = `${m.dataset.v}%`)))
    );
  }

  // ---------- ABOUT ----------
  const pr = D.profile;
  $("#about-stats").innerHTML = pr.stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  $("#about-bio").innerHTML = pr.bio.map((p) => `<p>${p}</p>`).join("");
  $("#quote-text").textContent = pr.quote.text;
  $("#quote-author").textContent = pr.quote.author;
  const initials = pr.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);
  $("#photo").innerHTML = pr.photo
    ? `<img src="${pr.photo}" alt="${pr.name}">`
    : `<svg viewBox="0 0 150 170" role="img" aria-label="${pr.name}">
        <rect width="150" height="170" fill="#0b3d91"/>
        <polygon points="0,120 150,60 150,170 0,170" fill="#001233"/>
        <polygon points="20,0 70,0 0,90" fill="#3fd0ff" opacity=".5"/>
        <text x="75" y="105" text-anchor="middle" font-family="Barlow Condensed" font-style="italic" font-weight="900" font-size="72" fill="#f2fbff">${initials}</text>
      </svg>`;

  // ---------- CONTACT ----------
  const mailList = $("#mail-list");
  function renderContact() {
    const rows = D.contact.map(
      (c, i) => `<li><a class="mail-row" href="${c.href}" target="_blank" rel="noopener" data-i="${i}">
        <span class="mail-icon">${c.icon}</span>
        <span><span class="mail-app">${c.app}</span><br><span class="mail-handle">${c.handle}</span></span>
      </a></li>`
    );
    while (rows.length < 6) {
      rows.push(`<li><div class="mail-row empty" aria-hidden="true"><span class="mail-icon">—</span><span class="mail-app">No Message</span></div></li>`);
    }
    mailList.innerHTML = rows.join("");
    $$("a.mail-row", mailList).forEach((a) => a.addEventListener("mouseenter", () => setMail(+a.dataset.i)));
    setMail(state.mail, true);
    const d = new Date();
    $("#phone-clock").textContent = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  function setMail(i, silent) {
    i = (i + D.contact.length) % D.contact.length;
    if (i !== state.mail && !silent) sfx.move();
    state.mail = i;
    $$("a.mail-row", mailList).forEach((a, j) => a.classList.toggle("active", j === i));
  }

  // ---------- PHOTOGRAPHY ----------
  const PH = D.photography;
  const ICONS = {
    triangle: '<polygon points="12,4.5 20.5,19 3.5,19"/>',
    circle: '<circle cx="12" cy="12" r="7.5"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18"/>',
    square: '<rect x="5" y="5" width="14" height="14"/>',
    dpad: '<path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z"/>',
  };
  const pmMenu = $("#pm-menu");
  const hintBar = $("#pm-hint-bar");
  const photosFor = (id) =>
    id === "all" ? PH.photos : PH.photos.filter((p) => p.category === id || (p.tags || []).includes(id));
  const hintFor = (b) => `${b.hint} · ${photosFor(b.id).length} foto`;
  const photoButtons = () => $$(".pm-btn", pmMenu);

  $("#pm-person").innerHTML = PH.person ? `<img src="${PH.person}" alt="" fetchpriority="high">` : "";
  pmMenu.innerHTML = PH.buttons
    .map((b, i) => {
      const letters = [...b.label]
        .map((c, j) => (j === b.invert - 1 ? `<span class="inv">${c}</span>` : c))
        .join("");
      const icon = b.icon
        ? `<span class="pm-icon pm-icon-${b.icon}" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[b.icon]}</svg></span>`
        : "";
      const badge = b.badge ? `<span class="pm-badge" aria-hidden="true">${b.badge}</span>` : "";
      // ikon & badge selalu di sisi yang menghadap sosok
      const end = b.side === "left";
      return `<button class="pm-btn pm-${b.id} pm-${b.side}" data-id="${b.id}" style="--x:${b.x};--y:${b.y};--i:${i}"
          aria-label="${b.label}: ${hintFor(b)}">
        ${end ? "" : icon + badge}
        <span class="pm-text" aria-hidden="true"><span class="pm-label">${letters}</span><span class="pm-jp">${b.jp}</span></span>
        ${end ? icon + badge : ""}
        <span class="pm-hint" aria-hidden="true">${hintFor(b)}</span>
      </button>`;
    })
    .join("");

  function showHint(btn) {
    const b = PH.buttons.find((x) => x.id === btn.dataset.id);
    hintBar.innerHTML = `<b>${b.label}</b> ${hintFor(b)}`;
  }
  photoButtons().forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.busy || state.overlay) return;
      btn.classList.remove("press");
      void btn.offsetWidth;
      btn.classList.add("press");
      sfx.confirm();
      // galeri muncul di balik sapuan merah-hitam, sama seperti saat masuk PHOTOGRAPHY
      transition(() => openCategory(btn.dataset.id, btn), true);
    });
    btn.addEventListener("focus", () => {
      showHint(btn);
      if (state.view === "photography" && !state.overlay) sfx.move();
    });
    btn.addEventListener("mouseenter", () => showHint(btn));
  });

  function renderPhoto() {
    showHint(photoButtons()[0]);
    setTimeout(() => photoButtons()[0].focus({ preventScroll: true }), 50);
  }

  // --- Overlay: galeri, profil, lightbox ---
  const gallery = $("#gallery");
  const galleryBody = $("#gallery-body");
  const lightbox = $("#lightbox");
  const lb = { list: [], i: 0, trigger: null };
  let galleryTrigger = null;

  function lockScroll(on) {
    document.body.classList.toggle("locked", on);
  }

  function openCategory(id, trigger) {
    const b = PH.buttons.find((x) => x.id === id);
    galleryTrigger = trigger;
    $("#gallery-tag").textContent = b.label;
    $("#gallery-title").textContent = b.title;
    {
      const list = photosFor(id);
      lb.list = list;
      $("#gallery-count").textContent = `${list.length} foto`;
      galleryBody.innerHTML = list.length
        ? `<ul class="g-grid">${list
            .map(
              (p, i) => `<li><button class="g-item" data-i="${i}" style="aspect-ratio:${p.width} / ${p.height}"
                aria-label="Buka foto: ${p.title}">
                <img src="${p.thumbnail || p.src}" alt="${p.alt}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async">
                <span class="g-cap">${p.title}</span>
              </button></li>`
            )
            .join("")}</ul>`
        : `<div class="g-empty"><strong>Belum ada karya</strong><p>Kategori ${b.title} masih kosong. Karya baru akan muncul di sini.</p></div>`;
      $$(".g-item", galleryBody).forEach((el) => el.addEventListener("click", () => openLightbox(+el.dataset.i, el)));
    }
    gallery.hidden = false;
    gallery.classList.remove("show");
    void gallery.offsetWidth;
    gallery.classList.add("show");
    galleryBody.scrollTop = 0;
    state.overlay = "gallery";
    lockScroll(true);
    $("#gallery-close").focus();
  }


  // tutup galeri di balik sapuan merah-hitam, sama seperti saat membukanya
  function closeGallery() {
    if (state.busy) return;
    sfx.back();
    transition(() => {
      gallery.hidden = true;
      state.overlay = null;
      lockScroll(false);
      if (galleryTrigger) galleryTrigger.focus({ preventScroll: true });
    }, true);
  }

  function openLightbox(i, trigger) {
    lb.trigger = trigger;
    lightbox.hidden = false;
    state.overlay = "lightbox";
    showPhoto(i);
    $("#lb-close").focus();
  }

  function showPhoto(i) {
    const n = lb.list.length;
    lb.i = (i + n) % n;
    const p = lb.list[lb.i];
    const img = $("#lb-img");
    img.classList.remove("broken");
    img.src = p.src;
    img.alt = p.alt;
    $("#lb-title").textContent = p.title;
    $("#lb-counter").textContent = `${lb.i + 1} / ${n}`;
    $("#lb-meta").textContent = [p.location, p.year, p.description].filter(Boolean).join(" · ");
    const single = n < 2;
    $("#lb-prev").hidden = single;
    $("#lb-next").hidden = single;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    state.overlay = "gallery";
    sfx.back();
    if (lb.trigger) lb.trigger.focus({ preventScroll: true });
  }

  $("#gallery-close").addEventListener("click", closeGallery);
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => (sfx.move(), showPhoto(lb.i - 1)));
  $("#lb-next").addEventListener("click", () => (sfx.move(), showPhoto(lb.i + 1)));
  lightbox.addEventListener("click", (e) => e.target === lightbox && closeLightbox());
  $("#lb-img").addEventListener("error", (e) => e.target.classList.add("broken"));
  // event error tidak bubble, jadi ditangkap di fase capture
  galleryBody.addEventListener("error", (e) => e.target.closest(".g-item")?.classList.add("broken"), true);

  function overlayKey(e, k) {
    const box = state.overlay === "lightbox" ? lightbox : gallery;
    if (k === "escape") {
      e.preventDefault();
      return state.overlay === "lightbox" ? closeLightbox() : closeGallery();
    }
    if (state.overlay === "lightbox" && (k === "arrowleft" || k === "arrowright")) {
      e.preventDefault();
      sfx.move();
      return showPhoto(lb.i + (k === "arrowright" ? 1 : -1));
    }
    // jaga fokus tetap di dalam overlay
    if (k === "tab") {
      const f = $$("button:not([hidden]), a[href]", box).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
    }
  }

  // ---------- Keyboard ----------
  addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (state.view === "loading") return state.ready && start();
    if (state.busy) return;
    if (state.overlay) return overlayKey(e, k);
    const up = k === "arrowup" || k === "w";
    const down = k === "arrowdown" || k === "s";
    const ok = k === "enter" || k === " ";
    const esc = k === "escape" || k === "backspace";
    if (up || down || ok) e.preventDefault();

    switch (state.view) {
      case "menu":
        if (up) setMenu(state.menu - 1);
        else if (down) setMenu(state.menu + 1);
        else if (ok) selectMenu();
        else if (k === "m") toggleSound();
        break;
      case "project":
        if (up) setProject(state.project - 1);
        else if (down) setProject(state.project + 1);
        else if (ok) $(".detail-link").click();
        else if (esc) back();
        break;
      case "skills":
        if (k === "q" || k === "arrowleft") setTab(state.tab - 1);
        else if (k === "e" || k === "arrowright") setTab(state.tab + 1);
        else if (esc) back();
        break;
      case "contact":
        if (up) setMail(state.mail - 1);
        else if (down) setMail(state.mail + 1);
        else if (ok) $$("a.mail-row", mailList)[state.mail].click();
        else if (esc) back();
        break;
      case "photography": {
        const btns = photoButtons();
        const cur = btns.indexOf(document.activeElement);
        const prev = up || k === "arrowleft";
        const next = down || k === "arrowright";
        if (prev || next) {
          e.preventDefault();
          const n = cur < 0 ? 0 : (cur + (next ? 1 : -1) + btns.length) % btns.length;
          btns[n].focus();
        } else if (ok && document.activeElement.matches(".pm-btn")) {
          document.activeElement.click();
        } else if (esc) back();
        break;
      }
      default:
        if (esc) back();
    }
  });

  // ---------- Loading ----------
  let pct = 0;
  const fill = $("#loading-fill");
  const label = $("#loading-percent");
  const loading = $("#loading");
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  let fontsDone = false;
  fontsReady.then(() => (fontsDone = true));

  const timer = setInterval(() => {
    const cap = fontsDone ? 100 : 90;
    pct = Math.min(cap, pct + Math.random() * 9 + 2);
    fill.style.width = `${pct}%`;
    label.textContent = `${Math.floor(pct)}%`;
    loading.setAttribute("aria-valuenow", Math.floor(pct));
    if (pct >= 100) {
      clearInterval(timer);
      state.ready = true;
      $(".loading-hud").style.opacity = ".35";
      $("#press-start").hidden = false;
    }
  }, 90);

  loading.addEventListener("click", () => state.ready && start());

  function start() {
    if (state.view !== "loading") return;
    state.view = "menu";
    sfx.start();
    loading.classList.add("done");
    $("#menu").classList.add("ready");
    setMenu(0, true);
  }
})();
