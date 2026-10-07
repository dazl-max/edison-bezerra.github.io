 document.getElementById('year').textContent = new Date().getFullYear();

  // Spotlight que acompanha o cursor (apenas desktop)
  const spot = document.getElementById('spotlight');
  if (matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('mousemove', e => {
      spot.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, var(--glow), transparent 80%)`;
    });
  }

  // Menu mobile
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
    menuBtn.textContent = '☰';
  }));

  // Destaca no menu a seção visível
  const links = document.querySelectorAll('.nav a');
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
  const setActive = () => {
    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach(a => a.classList.toggle('active', !!current && a.getAttribute('href') === '#' + current.id));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();