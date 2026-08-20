const mouse = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.55 };
const smooth = { x: mouse.x, y: mouse.y };
const gridOff = { x: 0, y: 0 };
const MASK_SCALE = 0.4;
let canvas, ctx, revealEl, patternEl;

function radius() {
  return Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)));
}

function resizeMask() {
  if (!canvas) return;
  canvas.width = Math.max(1, Math.round(window.innerWidth * MASK_SCALE));
  canvas.height = Math.max(1, Math.round(window.innerHeight * MASK_SCALE));
  const cell = Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028)));
  if (patternEl) {
    patternEl.setAttribute('width', String(cell));
    patternEl.setAttribute('height', String(cell));
    const path = patternEl.querySelector('path');
    if (path) path.setAttribute('d', `M ${cell} 0 L 0 0 0 ${cell}`);
  }
}

function revealFrame() {
  smooth.x += (mouse.x - smooth.x) * 0.1;
  smooth.y += (mouse.y - smooth.y) * 0.1;
  if (ctx && revealEl) {
    const r = radius() * MASK_SCALE;
    const sx = smooth.x * MASK_SCALE;
    const sy = smooth.y * MASK_SCALE;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,1)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    g.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    g.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL('image/png');
    revealEl.style.maskImage = `url(${url})`;
    revealEl.style.webkitMaskImage = `url(${url})`;
    revealEl.style.maskSize = '100% 100%';
  }
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  const cx = smooth.x / w - 0.5;
  const cy = smooth.y / h - 0.5;
  gridOff.x += (cx * 16 - gridOff.x) * 0.06;
  gridOff.y += (cy * 16 - gridOff.y) * 0.06;
  if (patternEl) {
    patternEl.setAttribute('x', String(gridOff.x));
    patternEl.setAttribute('y', String(gridOff.y));
  }
  requestAnimationFrame(revealFrame);
}

function initReveal() {
  const stage = document.querySelector('.image-reveal');
  if (!stage || !window.matchMedia('(min-width: 1024px)').matches) return;
  revealEl = stage.querySelector('.bg-reveal');
  patternEl = document.getElementById('gridPattern');
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  resizeMask();
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('resize', resizeMask);
  revealFrame();
}

function initMagnet(el, { padding = 150, strength = 3 } = {}) {
  if (!el) return;
  const on = 'transform 0.3s ease-out';
  const off = 'transform 0.6s ease-in-out';
  el.style.willChange = 'transform';
  window.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const inside = e.clientX > r.left - padding && e.clientX < r.right + padding
      && e.clientY > r.top - padding && e.clientY < r.bottom + padding;
    if (inside) {
      const dx = (e.clientX - (r.left + r.width / 2)) / strength;
      const dy = (e.clientY - (r.top + r.height / 2)) / strength;
      el.style.transition = on;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    } else {
      el.style.transition = off;
      el.style.transform = 'translate3d(0,0,0)';
    }
  }, { passive: true });
}

function initMarquee() {
  const section = document.getElementById('marquee');
  const rowA = document.getElementById('rowA');
  const rowB = document.getElementById('rowB');
  if (!section || !rowA || !rowB) return;
  const onScroll = () => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    const offset = (window.scrollY - top + window.innerHeight) * 0.3;
    rowA.style.transform = `translateX(${offset - 200}px)`;
    rowB.style.transform = `translateX(${-(offset - 200)}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initFadeIns() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '50px', threshold: 0 });
  document.querySelectorAll('.fade').forEach((el) => io.observe(el));
}

function initAnimatedText() {
  const el = document.getElementById('aboutText');
  if (!el) return;
  const text = el.dataset.text || el.textContent;
  el.innerHTML = '';
  const chars = [...text].map((ch) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.opacity = '0.2';
    el.appendChild(s);
    return s;
  });
  const onScroll = () => {
    const r = el.getBoundingClientRect();
    const start = window.innerHeight * 0.8;
    const end = window.innerHeight * 0.2;
    const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
    chars.forEach((s, i) => {
      const local = Math.min(1, Math.max(0, p * chars.length - i));
      s.style.opacity = String(0.2 + local * 0.8);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initStack() {
  const cards = [...document.querySelectorAll('.stack-card')];
  const total = cards.length;
  const onScroll = () => {
    cards.forEach((card, index) => {
      const r = card.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight * 0.35)));
      const target = 1 - (total - 1 - index) * 0.03;
      const scale = 1 - (1 - target) * p;
      card.style.transform = `scale(${scale})`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initNav() {
  document.querySelectorAll('[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

initReveal();
initMagnet(document.getElementById('magnet'), { padding: 150, strength: 3 });
initMarquee();
initFadeIns();
initAnimatedText();
initStack();
initNav();
