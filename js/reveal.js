const mouse = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.5 };
const smooth = { x: mouse.x, y: mouse.y };
const gridOff = { x: 0, y: 0 };
let cell = 48;
let canvas;
let ctx;
let revealEl;
let patternEl;

function radius() {
  return Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)));
}

const MASK_SCALE = 0.4;

function resize() {
  if (!canvas) return;
  canvas.width = Math.max(1, Math.round(window.innerWidth * MASK_SCALE));
  canvas.height = Math.max(1, Math.round(window.innerHeight * MASK_SCALE));
  cell = Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028)));
  if (patternEl) {
    patternEl.setAttribute('width', String(cell));
    patternEl.setAttribute('height', String(cell));
    const path = patternEl.querySelector('path');
    if (path) path.setAttribute('d', `M ${cell} 0 L 0 0 0 ${cell}`);
  }
}

function frame() {
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
    revealEl.style.webkitMaskSize = '100% 100%';
  }

  const cx = canvas ? smooth.x / canvas.width - 0.5 : 0;
  const cy = canvas ? smooth.y / canvas.height - 0.5 : 0;
  gridOff.x += (cx * 16 - gridOff.x) * 0.06;
  gridOff.y += (cy * 16 - gridOff.y) * 0.06;
  if (patternEl) {
    patternEl.setAttribute('x', String(gridOff.x));
    patternEl.setAttribute('y', String(gridOff.y));
  }

  requestAnimationFrame(frame);
}

export function initReveal() {
  const stage = document.querySelector('.image-reveal');
  if (!stage) return;
  revealEl = stage.querySelector('.bg-reveal');
  patternEl = document.getElementById('gridPattern');
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  window.addEventListener('resize', resize);
  frame();
}

export function initDrawers() {
  const root = document.getElementById('drawerRoot');
  const panel = document.getElementById('drawerPanel');
  const title = document.getElementById('drawerTitle');
  const body = document.getElementById('drawerBody');
  const drawers = {
    aerospace: {
      title: 'Aerospace',
      html: `<p class="sub">Now · Collins Aerospace · Landing Systems</p>
        <p>I am a Materials &amp; Process Technology (M&amp;PT) Engineer at Collins Aerospace Landing Systems, an RTX business. A decade of regulated laboratory science, now applied to aerospace materials, special processes, and process engineering.</p>
        <p>Coatings and finishes, chemical processing, process qualification, and NADCAP-governed control for landing gear in manufacturing, overhaul, and repair.</p>
        <ul><li>NADCAP Gold</li><li>AC7108</li><li>FAA Part 145</li></ul>`,
    },
    chemistry: {
      title: 'Chemistry',
      html: `<p class="sub">Wet chemistry · EPA / USP</p>
        <p>Before aerospace I spent years in high-volume wet chemistry — environmental enforcement and pharmaceutical laboratories — where titration, ion chromatography, spectroscopy, and chain-of-custody were the job.</p>
        <p>If the chemistry is not documented, it did not happen. That discipline now sits behind process baths and special-process control.</p>
        <ul><li>EPA</li><li>USP</li><li>NELAC</li><li>cGMP</li></ul>`,
    },
    micro: {
      title: 'Microbiology',
      html: `<p class="sub">M.S. Microbiology · Cleanrooms</p>
        <p>Master’s-level microbiologist (University of Florida). In sterile-drug manufacturing I executed disinfectant efficacy studies, ISO 4 environmental monitoring, endotoxin testing, and isolate identification.</p>
        <p>Invisible risk treated as engineering: sampling plans, contact times, and a report that will stand in an audit.</p>
        <ul><li>ISO 4</li><li>USP &lt;85&gt;</li><li>EM</li></ul>`,
    },
    systems: {
      title: 'Systems',
      html: `<p class="sub">Infrastructure · Data integrity</p>
        <p>The first professional chapter was information systems: hardware, networks, diagnostics, keeping production alive. A process is only as good as the record it leaves behind.</p>
        <p>That systems instinct now sits under laboratory LIMS, process software, and aerospace special-process control.</p>
        <ul><li>Networks</li><li>LIMS</li><li>Traceability</li></ul>`,
    },
  };

  function open(key) {
    const d = drawers[key];
    if (!d) return;
    title.textContent = d.title;
    body.innerHTML = d.html;
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('open'));
  }
  function close() {
    root.classList.remove('open');
    setTimeout(() => { root.hidden = true; }, 280);
  }

  document.querySelectorAll('[data-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.dataset.drawer));
  });
  root.querySelector('.backdrop').addEventListener('click', close);
  root.querySelector('.drawer-close').addEventListener('click', close);
  document.querySelector('.logo')?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
