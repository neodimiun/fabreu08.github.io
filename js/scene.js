import * as THREE from 'three';

const canvas = document.getElementById('webgl');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ERA_COLORS = [0xff5a1f, 0x2ec4b6, 0x7cff6b, 0x00f0ff];

if (!canvas || reduceMotion) {
  document.documentElement.classList.add('no-webgl');
} else {
  try {
    initScene(canvas);
  } catch (err) {
    console.error('WebGL scene failed to start', err);
    document.documentElement.classList.add('no-webgl');
  }
}

function initScene(canvas) {
  const mobile = () => window.innerWidth < 768;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile(),
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile() ? 1.2 : 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 40);
  camera.position.z = 6;

  const count = mobile() ? 380 : 900;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    seeds[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: mobile() ? 0.035 : 0.048,
    color: ERA_COLORS[0],
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = document.visibilityState === 'visible';
  });

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile() ? 1.2 : 1.6));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const clock = new THREE.Clock();
  const colorA = new THREE.Color();
  const colorB = new THREE.Color();

  function frame() {
    requestAnimationFrame(frame);
    if (!running) return;
    const t = clock.getElapsedTime();
    const era = window.__era || { index: 0, mix: 0 };
    const i = Math.max(0, Math.min(3, era.index || 0));
    const n = Math.max(0, Math.min(3, i + 1));
    colorA.setHex(ERA_COLORS[i]);
    colorB.setHex(ERA_COLORS[n]);
    material.color.copy(colorA).lerp(colorB, era.mix || 0);

    const pos = geometry.attributes.position;
    for (let p = 0; p < count; p += 1) {
      let x = pos.getX(p);
      let y = pos.getY(p);
      const drift = 0.004 + seeds[p] * 0.01;
      if (i === 0) y += drift * 1.7;
      else if (i === 1) { y += drift * 0.45; x += Math.sin(t + p) * 0.002; }
      else if (i === 2) { x += Math.sin(t * 0.4 + p) * 0.004; y += Math.cos(t * 0.3 + p) * 0.003; }
      else y -= drift * 2.2;
      if (y > 4.6) y = -4.6;
      if (y < -4.6) y = 4.6;
      if (x > 7) x = -7;
      if (x < -7) x = 7;
      pos.setXYZ(p, x, y, pos.getZ(p));
    }
    pos.needsUpdate = true;
    points.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  }

  frame();
}
