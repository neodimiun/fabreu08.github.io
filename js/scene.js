import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const canvas = document.getElementById('webgl');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  const isMobile = () => window.innerWidth < 768;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile(),
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.25 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070a, 0.046);

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(-0.4, 1.35, 6.2);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  scene.add(new THREE.AmbientLight(0x6b7c93, 0.28));

  const key = new THREE.DirectionalLight(0x4ea3e0, 2.1);
  key.position.set(-6, 8, 4);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xe61231, 1.35);
  rim.position.set(5, 2.4, -3);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffffff, 1.1, 18);
  fill.position.set(1.2, 2.2, 3.4);
  scene.add(fill);

  const hangar = new THREE.Group();
  scene.add(hangar);

  const grid = new THREE.GridHelper(28, 42, 0x1b4f86, 0x121821);
  grid.position.y = -1.15;
  grid.material.transparent = true;
  grid.material.opacity = 0.38;
  hangar.add(grid);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(9, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x0b1016,
      metalness: 0.72,
      roughness: 0.38,
      envMapIntensity: 0.55,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.149;
  hangar.add(floor);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.15, 2.22, 80),
    new THREE.MeshBasicMaterial({
      color: 0x0057b8,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -1.14;
  hangar.add(ring);

  const gear = createLandingGear();
  gear.position.set(1.55, -0.15, 0);
  hangar.add(gear);

  const scan = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 0.045),
    new THREE.MeshBasicMaterial({
      color: 0x4ea3e0,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  scan.rotation.x = Math.PI / 2;
  gear.add(scan);

  const particles = createParticles(isMobile() ? 420 : 1100);
  hangar.add(particles);

  let composer = null;
  if (!isMobile()) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.28, 0.55, 0.82);
    composer.addPass(bloom);
  }

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = document.visibilityState === 'visible';
  });

  const look = new THREE.Vector3(1.15, 0.72, 0);
  const camBase = camera.position.clone();

  function layout() {
    const mobile = isMobile();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);

    if (mobile) {
      gear.userData.baseY = 0.12;
      gear.position.set(0.05, 0.12, -0.4);
      camBase.set(0, 1.55, 7.1);
      look.set(0, 0.55, 0);
    } else {
      gear.userData.baseY = -0.15;
      gear.position.set(1.55, -0.15, 0);
      camBase.set(-0.4, 1.35, 6.2);
      look.set(1.15, 0.72, 0);
    }
  }

  window.addEventListener('resize', layout);
  layout();

  const clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    if (!running) return;

    const t = clock.getElapsedTime();
    const scroll = window.scrollY || 0;

    gear.rotation.y = -0.42 + Math.sin(t * 0.18) * 0.22 + pointer.x * 0.18;
    gear.rotation.x = pointer.y * 0.08;
    gear.position.y = (gear.userData.baseY ?? -0.15) + Math.sin(t * 0.7) * 0.045;

    scan.position.y = -0.35 + Math.sin(t * 0.85) * 1.35;
    scan.material.opacity = 0.22 + Math.abs(Math.sin(t * 0.85)) * 0.28;

    particles.rotation.y = t * 0.012;

    camera.position.x = camBase.x + pointer.x * 0.35 + Math.sin(t * 0.12) * 0.08;
    camera.position.y = camBase.y + pointer.y * -0.18 + scroll * 0.00035;
    camera.position.z = camBase.z + scroll * 0.0011;
    camera.lookAt(look);

    if (composer && !isMobile()) composer.render();
    else renderer.render(scene, camera);
  }

  frame();
}

function createLandingGear() {
  const group = new THREE.Group();

  const chrome = new THREE.MeshPhysicalMaterial({
    color: 0xd5dde6,
    metalness: 1,
    roughness: 0.11,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.35,
    iridescence: 0.18,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [80, 380],
  });

  const coated = new THREE.MeshPhysicalMaterial({
    color: 0x1a2430,
    metalness: 0.92,
    roughness: 0.32,
    clearcoat: 0.45,
    envMapIntensity: 0.9,
  });

  const rubber = new THREE.MeshPhysicalMaterial({
    color: 0x141414,
    metalness: 0.08,
    roughness: 0.78,
  });

  const wire = new THREE.MeshBasicMaterial({
    color: 0x4ea3e0,
    wireframe: true,
    transparent: true,
    opacity: 0.11,
  });

  const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 1.72, 48), coated);
  strut.position.y = 1.42;
  const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 1.45, 48), chrome);
  piston.position.y = 0.42;
  const gland = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.12, 48), chrome);
  gland.position.y = 0.72;
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.16, 32), coated);
  collar.position.y = 2.22;
  const trunnion = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.26, 0.38), coated);
  trunnion.position.y = 2.38;

  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.62, 28), chrome);
  axle.rotation.z = Math.PI / 2;
  axle.position.y = -0.28;

  const fork = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.22), coated);
  fork.position.y = -0.05;

  function makeWheel(x) {
    const wheel = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.17, 18, 56), rubber);
    tire.rotation.y = Math.PI / 2;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 36), chrome);
    hub.rotation.z = Math.PI / 2;
    const cap = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), coated);
    cap.rotation.y = Math.PI / 2;
    cap.position.x = 0.11;
    wheel.add(tire, hub, cap);
    wheel.position.set(x, -0.28, 0);
    return wheel;
  }

  const linkGeo = new THREE.BoxGeometry(0.06, 0.72, 0.08);
  const linkA = new THREE.Mesh(linkGeo, chrome);
  linkA.position.set(0.16, 0.55, 0.18);
  linkA.rotation.z = 0.38;
  const linkB = new THREE.Mesh(linkGeo, chrome);
  linkB.position.set(-0.16, 0.55, 0.18);
  linkB.rotation.z = -0.38;

  const hydraulic = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 16), chrome);
  hydraulic.position.set(0.28, 1.05, -0.16);
  hydraulic.rotation.z = 0.18;

  const parts = [strut, piston, gland, collar, trunnion, axle, fork, linkA, linkB, hydraulic, makeWheel(-0.72), makeWheel(0.72)];
  parts.forEach((part) => group.add(part));

  const ghost = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 1.72, 12), wire);
  ghost.position.copy(strut.position);
  group.add(ghost);

  group.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = false;
      obj.receiveShadow = false;
    }
  });

  return group;
}

function createParticles(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const blue = new THREE.Color(0x4ea3e0);
  const red = new THREE.Color(0xe61231);
  const white = new THREE.Color(0xe8eef5);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.45) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.2) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

    const mix = Math.random();
    const color = mix > 0.86 ? red : mix > 0.45 ? blue : white;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}
