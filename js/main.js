// The Bone Wars: header behavior (header height, mobile menu, active tab, depth meter).
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const meterFill = document.querySelector('.depth-meter-fill');

  // 1. Keep --header-h in sync so scroll-margin-top clears the sticky header.
  const syncHeaderHeight = () => {
    root.style.setProperty('--header-h', `${header.offsetHeight}px`);
  };
  new ResizeObserver(syncHeaderHeight).observe(header);

  // 2. Mobile "Sections" menu. CSS shows the list when aria-expanded is "true".
  const setMenu = (open) => toggle.setAttribute('aria-expanded', String(open));
  const menuIsOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setMenu(!menuIsOpen()));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuIsOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  // 3. Active tab: whichever section crosses a thin line about 35% down the
  //    viewport. The hero (#top) has no tab, so reaching it clears them all.
  const linkFor = new Map(navLinks.map((link) => [link.hash.slice(1), link]));
  const setActive = (id) => {
    navLinks.forEach((link) => {
      if (link === linkFor.get(id)) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-35% 0px -64% 0px' });
  document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));

  // 4. Depth meter: fill width tracks how far down the page you are.
  let ticking = false;
  const updateMeter = () => {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    meterFill.style.width = `${progress * 100}%`;
    ticking = false;
  };
  const requestMeterUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateMeter);
    }
  };
  window.addEventListener('scroll', requestMeterUpdate, { passive: true });
  window.addEventListener('resize', requestMeterUpdate);
  updateMeter();
})();
