/* ============================================================
   DevOpen — script.js
   Vanilla JS (ES6+). Three.js + GSAP optional (CDN).
   Site works fully without JS; this layer is pure enhancement.
   ============================================================ */
(function () {
  "use strict";

  const root = document.documentElement;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  let currentTheme = "dark";
  let currentLang = "en";
  let bgUpdateColor = null; // set by threeBg

  /* ---------- small helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  const accentHex = function () {
    return currentTheme === "light" ? 0x6234d4 : 0x7c50e6;
  };

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ============================================================
     THEME
     ============================================================ */
  (function theme() {
    const stored = localStorage.getItem("devopen-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    currentTheme = stored || (systemDark ? "dark" : "light");
    root.setAttribute("data-theme", currentTheme);

    const btn = $("#theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", currentTheme);
        localStorage.setItem("devopen-theme", currentTheme);
        if (bgUpdateColor) bgUpdateColor();
      });
    }
  })();

  /* ============================================================
     I18N  (English default, Turkish option)
     ============================================================ */
  function applyLang(lang) {
    currentLang = lang;
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    localStorage.setItem("devopen-lang", lang);

    $all("[data-en]").forEach(function (el) {
      const val = el.getAttribute("data-" + lang);
      if (val != null) el.innerHTML = val;
    });

    // language switch segments
    $all(".lang-toggle .seg").forEach(function (s) {
      s.classList.toggle("on", s.getAttribute("data-lang-seg") === lang);
    });

    // (re)start the terminal typing in the new language
    if (window.__term) window.__term.setLang(lang);
  }

  (function langInit() {
    const stored = localStorage.getItem("devopen-lang");
    const initial = stored || "en";
    const btn = $("#lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        applyLang(currentLang === "en" ? "tr" : "en");
        toast(currentLang === "en" ? "Language: English" : "Dil: Türkçe");
      });
    }
    // applied after typer is created (see bottom)
    window.__initialLang = initial;
  })();

  /* ============================================================
     NAVBAR / MENU / ACTIVE LINK
     ============================================================ */
  const navbar = $(".navbar");
  function onScroll() {
    if (window.scrollY > 30) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  (function mobileMenu() {
    const body = document.body;
    const burger = $("#hamburger");
    const menu = $("#mobile-menu");
    if (!burger || !menu) return;
    burger.addEventListener("click", function () { body.classList.toggle("mobile-open"); });
    $all("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { body.classList.remove("mobile-open"); });
    });
  })();

  (function activeNav() {
    const links = $all(".nav-links a[href^='#']");
    const map = {};
    links.forEach(function (l) {
      const id = l.getAttribute("href").slice(1);
      if (document.getElementById(id)) map[id] = l;
    });
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          if (map[e.target.id]) map[e.target.id].classList.add("active");
        }
      });
    }, { threshold: 0.4, rootMargin: "-20% 0px -50% 0px" });
    Object.keys(map).forEach((id) => obs.observe(document.getElementById(id)));
  })();

  /* ============================================================
     REVEAL + COUNTERS
     ============================================================ */
  (function reveal() {
    const els = $all(".reveal");
    if (prefersReduced) { els.forEach((e) => e.classList.add("in")); return; }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (e.target.dataset.delay || 0) + "ms";
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((e) => obs.observe(e));
  })();

  (function counters() {
    const nums = $all("[data-count]");
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        if (prefersReduced) { el.textContent = target + suffix; return; }
        const dur = 1400, start = performance.now();
        (function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.5 });
    nums.forEach((n) => obs.observe(n));
  })();

  /* ============================================================
     TEAM CARD tilt + spotlight
     ============================================================ */
  (function tiltCards() {
    if (isTouch || prefersReduced) return;
    $all(".team-card").forEach(function (card) {
      card.addEventListener("mousemove", function (ev) {
        const r = card.getBoundingClientRect();
        const x = ev.clientX - r.left, y = ev.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * -8;
        const ry = ((x / r.width) - 0.5) * 8;
        card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
        card.style.setProperty("--mx", (x / r.width) * 100 + "%");
        card.style.setProperty("--my", (y / r.height) * 100 + "%");
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  })();

  /* ============================================================
     CUSTOM CURSOR (hover-capable only)
     ============================================================ */
  (function cursor() {
    if (isTouch || prefersReduced) return;
    const dot = $("#cursor-dot");
    const ring = $("#cursor-ring");
    if (!dot || !ring) return;
    document.body.classList.add("has-cursor");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();

    const interactive = "a, button, .tech-item, .stat-card, .project-card, .pill, .magnetic";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(interactive)) ring.classList.add("hovering");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(interactive)) ring.classList.remove("hovering");
    });
  })();

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  (function magnetic() {
    if (isTouch || prefersReduced) return;
    $all(".magnetic").forEach(function (el) {
      const strength = 0.35;
      el.addEventListener("mousemove", function (e) {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  })();

  /* ============================================================
     HERO terminal typewriter (bilingual)
     ============================================================ */
  (function terminal() {
    const body = $("#terminal-body");
    if (!body) return;

    const PROMPT = '<span class="t-prompt">devopen <span class="tilde">~</span> $ </span>';
    const scripts = {
      en: [
        { cmd: "whoami" },
        { out: "open-source software collective · istanbul" },
        { cmd: "ls projects/" },
        { out: '<span class="file">dondurma-rss-reader</span>  <span class="file">subzilla</span>  <span class="file">naisho</span>  +6' },
        { cmd: "cat philosophy.md" },
        { out: "no algorithms · no tracking · MIT licensed" },
        { cmd: "flutter run -d all" },
        { out: '<span class="ok">✓</span> 6 platforms · built in the open' },
      ],
      tr: [
        { cmd: "whoami" },
        { out: "açık kaynak yazılım kolektifi · istanbul" },
        { cmd: "ls projeler/" },
        { out: '<span class="file">dondurma-rss-reader</span>  <span class="file">subzilla</span>  <span class="file">naisho</span>  +6' },
        { cmd: "cat felsefe.md" },
        { out: "algoritma yok · takip yok · MIT lisanslı" },
        { cmd: "flutter run -d all" },
        { out: '<span class="ok">✓</span> 6 platform · açık kaynak üretildi' },
      ],
    };

    let script = scripts.en;
    let timers = [];
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function wait(ms, fn) { timers.push(setTimeout(fn, ms)); }

    function caretLine() {
      const line = document.createElement("div");
      line.className = "t-line";
      line.innerHTML = PROMPT + '<span class="term-caret"></span>';
      body.appendChild(line);
    }

    function renderAll() {
      body.innerHTML = "";
      script.forEach(function (item) {
        const line = document.createElement("div");
        if (item.cmd) {
          line.className = "t-line";
          line.innerHTML = PROMPT + '<span class="t-cmd">' + item.cmd + "</span>";
        } else {
          line.className = "t-line t-out";
          line.innerHTML = item.out;
        }
        body.appendChild(line);
      });
      caretLine();
    }

    function run() {
      clearTimers();
      body.innerHTML = "";
      let i = 0;

      function next() {
        if (i >= script.length) { caretLine(); return; }
        const item = script[i];
        const line = document.createElement("div");
        if (item.cmd) {
          line.className = "t-line";
          const cmd = document.createElement("span");
          cmd.className = "t-cmd";
          line.innerHTML = PROMPT;
          line.appendChild(cmd);
          body.appendChild(line);
          let c = 0;
          (function typeChar() {
            cmd.textContent = item.cmd.slice(0, c);
            c++;
            if (c <= item.cmd.length) wait(36 + Math.random() * 46, typeChar);
            else { i++; wait(360, next); }
          })();
        } else {
          line.className = "t-line t-out";
          line.innerHTML = item.out;
          line.style.opacity = "0";
          body.appendChild(line);
          wait(90, function () {
            line.style.transition = "opacity 0.25s ease";
            line.style.opacity = "1";
          });
          i++;
          wait(360, next);
        }
      }
      next();
    }

    window.__term = {
      setLang: function (lang) {
        script = scripts[lang] || scripts.en;
        if (prefersReduced) { renderAll(); }
        else { run(); }
      },
    };
  })();

  /* ============================================================
     TECH ITEMS: random sticker rotation + click spin
     ============================================================ */
  (function techPlay() {
    $all(".tech-item").forEach(function (item) {
      if (!prefersReduced) {
        const rot = (Math.random() * 6 - 3).toFixed(2);
        item.style.setProperty("--rot", rot + "deg");
      }
      item.addEventListener("click", function () {
        item.classList.remove("spin");
        void item.offsetWidth; // reflow
        item.classList.add("spin");
        const name = $(".tech-name", item);
        if (name) toast((currentLang === "en" ? "↻ " : "↻ ") + name.textContent);
      });
    });
  })();

  /* ============================================================
     CONFETTI ENGINE
     ============================================================ */
  const confetti = (function () {
    const canvas = $("#confetti");
    if (!canvas) return { burst: function () {} };
    const ctx = canvas.getContext("2d");
    let parts = [];
    let raf = null;
    const colors = ["#7c50e6", "#5a6ee6", "#39a7cc", "#a78bfa", "#5fc7e8", "#c4b5fd"];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function burst(originX, originY, count) {
      if (prefersReduced) return;
      const cx = originX != null ? originX : window.innerWidth / 2;
      const cy = originY != null ? originY : window.innerHeight / 3;
      const n = count || 120;
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 4 + Math.random() * 9;
        parts.push({
          x: cx, y: cy,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 4,
          g: 0.18 + Math.random() * 0.12,
          s: 5 + Math.random() * 7,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          col: colors[(Math.random() * colors.length) | 0],
          life: 1,
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts = parts.filter((p) => p.life > 0 && p.y < canvas.height + 40);
      parts.forEach(function (p) {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.006;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.col;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.55);
        ctx.restore();
      });
      if (parts.length) raf = requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); raf = null; }
    }

    return { burst: burst };
  })();

  /* ============================================================
     EASTER EGGS
     ============================================================ */
  // Click the logo mark -> confetti
  (function logoEgg() {
    const mark = $("#brand-mark");
    if (!mark) return;
    mark.addEventListener("click", function (e) {
      e.preventDefault();
      const r = mark.getBoundingClientRect();
      mark.classList.remove("kick");
      void mark.offsetWidth;
      mark.classList.add("kick");
      confetti.burst(r.left + r.width / 2, r.top + r.height / 2, 90);
    });
  })();

  // Konami code -> party mode
  (function konami() {
    const seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let pos = 0;
    let partyOn = false;
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          pos = 0;
          partyOn = !partyOn;
          document.body.classList.toggle("party", partyOn && !prefersReduced);
          confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 220);
          toast(currentLang === "en" ? "🎉 Party mode " + (partyOn ? "ON" : "OFF") : "🎉 Parti modu " + (partyOn ? "AÇIK" : "KAPALI"));
        }
      } else {
        pos = e.keyCode === seq[0] ? 1 : 0;
      }
    });
  })();

  /* ============================================================
     GSAP scroll niceties (optional)
     ============================================================ */
  (function gsapLayer() {
    if (prefersReduced || typeof window.gsap === "undefined") return;
    const gsap = window.gsap;
    if (window.ScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);
      gsap.to(".hero-glow", {
        yPercent: 30, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }
  })();

  /* ============================================================
     THREE.JS interactive particle field (theme-aware + repel)
     ============================================================ */
  (function threeBg() {
    if (prefersReduced || typeof window.THREE === "undefined") return;
    const canvas = $("#bg-canvas");
    if (!canvas) return;
    const THREE = window.THREE;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (err) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 18;

    const COUNT = window.innerWidth < 768 ? 110 : 220;
    const positions = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 46;
      const y = (Math.random() - 0.5) * 32;
      const z = (Math.random() - 0.5) * 22;
      positions[i * 3] = base[i * 3] = x;
      positions[i * 3 + 1] = base[i * 3 + 1] = y;
      positions[i * 3 + 2] = base[i * 3 + 2] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.16,
      color: accentHex(),
      transparent: true,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // theme-aware material
    bgUpdateColor = function () {
      mat.color.setHex(accentHex());
      if (currentTheme === "light") {
        mat.blending = THREE.NormalBlending;
        mat.opacity = 0.7;
        mat.size = 0.2;
      } else {
        mat.blending = THREE.AdditiveBlending;
        mat.opacity = 0.6;
        mat.size = 0.16;
      }
      mat.needsUpdate = true;
    };
    bgUpdateColor();

    // mouse in world-ish space for repel
    const mouse = new THREE.Vector2(-999, -999);
    const target = new THREE.Vector2(0, 0);
    window.addEventListener("mousemove", function (e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.x = mouse.x;
      target.y = mouse.y;
    }, { passive: true });

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    let camX = 0, camY = 0, raf;
    const pos = geo.attributes.position.array;
    // mouse projected into the particle plane
    const mWorld = new THREE.Vector3();

    function animate() {
      raf = requestAnimationFrame(animate);
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0003;

      // smooth parallax camera
      camX += (target.x * 2.6 - camX) * 0.03;
      camY += (target.y * 2.0 - camY) * 0.03;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(scene.position);

      // approximate mouse position on z=0 plane
      mWorld.set(mouse.x, mouse.y, 0.5).unproject(camera);
      const dir = mWorld.sub(camera.position).normalize();
      const distToPlane = -camera.position.z / dir.z;
      const px = camera.position.x + dir.x * distToPlane;
      const py = camera.position.y + dir.y * distToPlane;

      // repel particles near the cursor, spring back to base
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const dx = pos[ix] - px;
        const dy = pos[ix + 1] - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < 36) {
          const d = Math.sqrt(d2) || 0.001;
          const f = (6 - d) / 6;
          pos[ix] += (dx / d) * f * 0.9;
          pos[ix + 1] += (dy / d) * f * 0.9;
        }
        pos[ix] += (base[ix] - pos[ix]) * 0.04;
        pos[ix + 1] += (base[ix + 1] - pos[ix + 1]) * 0.04;
      }
      geo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else animate();
    });
  })();

  /* ---------- Footer year ---------- */
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Console easter egg ---------- */
  try {
    console.log(
      "%cDevOpen %c— we build open. we build bold.\n%cgithub.com/DevOpen-io · info@devopen.io\nTip: try the Konami code ↑↑↓↓←→←→ B A",
      "color:#f97316;font-weight:bold;font-size:16px",
      "color:#94a3b8;font-size:13px",
      "color:#3b82f6;font-size:12px"
    );
  } catch (e) {}

  /* ---------- Kick off i18n (this also starts the typewriter) ---------- */
  applyLang(window.__initialLang || "en");
})();
