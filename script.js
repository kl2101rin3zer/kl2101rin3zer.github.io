  const hero = document.getElementById("hero"),
    heroTitle = document.getElementById("heroTitle"),
    heroSubblock = document.querySelector(".hero-subblock"),
    counters = document.querySelectorAll(".stat-num"),
    toggle = document.getElementById("themeToggle"),
    icon = document.getElementById("themeIcon");
  const onScroll = () => {
    document.body.classList.toggle("scrolled", scrollY > 20);
    hero.style.setProperty("--hero-offset", `${scrollY * 0.3}px`);
    heroSubblock.style.transform = `translateY(${scrollY * 0.12}px)`;
    hero.classList.toggle("blur", scrollY > 40);
  };
  addEventListener("scroll", onScroll);
  const fadeObserver = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      fadeObserver.unobserve(e.target);
    }
  }));
  const statsObserver = new IntersectionObserver(es => {
    if (!statsStarted && es.some(e => e.isIntersecting)) {
      statsStarted = true;
      counters.forEach(c => {
        const t = +c.dataset.target,
          s = c.dataset.suffix || "",
          d = 1200,
          start = performance.now();
        const upd = n => {
  const p = Math.min((n - start) / d, 1),
    v = Math.floor((p * t) / 1) * 1;  // Jump by 4s
          c.textContent = v + (p === 1 ? s : "");
          if (p < 1) requestAnimationFrame(upd);
        };
        requestAnimationFrame(upd);
      });
    }
  }, { threshold: 0.5});
  document.querySelectorAll(".fade-appear").forEach(el => fadeObserver.observe(el));
  setTimeout(() => heroTitle.classList.add("visible"), 300);
  setTimeout(() => heroSubblock.classList.add("visible"), 600);
  let statsStarted = false;
  statsObserver.observe(document.querySelector(".stats-screen"));
  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    icon.textContent = document.body.classList.contains("dark") ? "light_mode" : "dark_mode";
  };
  onScroll();
