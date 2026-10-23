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
  if (D.profile.hero) {
    document.body.classList.add("has-hero");
    heroEl.innerHTML = `<img src="${D.profile.hero}" alt="">`;
  } else {
    heroEl.remove();
  }

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
    if (item.id === "system") return toggleSound();
    open(item.id);
  }

  function toggleSound() {
    state.sound = !state.sound;
    $("#sound-label").textContent = `Suara: ${state.sound ? "ON" : "OFF"}`;
    D.menu.find((m) => m.id === "system").desc = `Efek suara sekarang ${state.sound ? "ON" : "OFF"}. Tekan lagi untuk mengubah.`;
    $("#menu-desc").textContent = D.menu[state.menu].desc;
    sfx.confirm();
  }

  // Parallax ringan mengikuti mouse
  addEventListener("mousemove", (e) => {
    const x = (e.clientX / innerWidth - 0.5) * -18;
    const y = (e.clientY / innerHeight - 0.5) * -12;
    $("#menu-column").style.translate = `${x}px ${y}px`;
    $("#side-number").style.translate = `${-x * 1.5}px ${-y}px`;
    if (heroEl.isConnected) heroEl.style.translate = `${x * 0.5}px ${y * 0.5}px`;
    if (charEl.isConnected) charEl.style.translate = `${-x * 0.6}px ${-y * 0.4}px`;
  });

  // ---------- Transisi antar layar ----------
  const wipe = $("#wipe");
  function transition(swap) {
    state.busy = true;
    wipe.classList.remove("run");
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
      const scr = $(`#screen-${id}`);
      scr.classList.add("open");
      scr.setAttribute("aria-hidden", "false");
      state.view = id;
      if (id === "project") renderProjects();
      if (id === "skills") renderSkills();
      if (id === "contact") renderContact();
    });
  }

  function back() {
    if (state.busy || state.view === "menu") return;
    sfx.back();
    const scr = $(`#screen-${state.view}`);
    transition(() => {
      scr.classList.remove("open");
      scr.setAttribute("aria-hidden", "true");
      $("#menu").classList.remove("away");
      state.view = "menu";
    });
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

  // ---------- Keyboard ----------
  addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (state.view === "loading") return state.ready && start();
    if (state.busy) return;
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
