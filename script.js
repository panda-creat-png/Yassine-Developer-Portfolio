lucide.createIcons();

const header = document.querySelector('.site-header');
const progress = document.querySelector('.progress');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  header.classList.toggle('scrolled', scrollY > 50);
}

addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
  lucide.createIcons();
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  if (el.closest('.hero')) el.style.transitionDelay = `${index * 80}ms`;
  observer.observe(el);
});

function initScene() {
  if (!window.THREE) return;
  const canvas = document.querySelector('#scene');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const group = new THREE.Group();
  scene.add(group);
  const geometry = new THREE.IcosahedronGeometry(2.15, 2);
  const solid = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x20261e, roughness: 0.26, metalness: 0.45, flatShading: true }));
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), new THREE.LineBasicMaterial({ color: 0xc7ff4a, transparent: true, opacity: 0.48 }));
  group.add(solid, wire);
  group.position.set(2.8, 0.15, 0);
  group.rotation.set(-0.18, 0.3, 0.12);

  const smallGeometry = new THREE.TorusGeometry(0.75, 0.035, 10, 80);
  const ring = new THREE.Mesh(smallGeometry, new THREE.MeshBasicMaterial({ color: 0xff7657 }));
  ring.position.set(2.9, 0.1, 1.1);
  ring.rotation.x = 1.2;
  scene.add(ring);
  scene.add(new THREE.HemisphereLight(0xf2f0e9, 0x111410, 2.8));
  const light = new THREE.DirectionalLight(0xc7ff4a, 4);
  light.position.set(4, 4, 5);
  scene.add(light);

  let pointerX = 0, pointerY = 0;
  addEventListener('pointermove', event => {
    pointerX = (event.clientX / innerWidth - 0.5) * 0.55;
    pointerY = (event.clientY / innerHeight - 0.5) * 0.35;
  }, { passive: true });

  function resize() {
    const hero = document.querySelector('.hero');
    renderer.setSize(hero.clientWidth, hero.clientHeight, false);
    camera.aspect = hero.clientWidth / hero.clientHeight;
    camera.updateProjectionMatrix();
    group.position.x = innerWidth < 760 ? 1.25 : 2.8;
    group.position.y = innerWidth < 760 ? 1.45 : 0.15;
    group.scale.setScalar(innerWidth < 760 ? 0.72 : 1);
  }
  addEventListener('resize', resize);
  resize();

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function render(time = 0) {
    group.rotation.y += (pointerX + time * 0.00008 - group.rotation.y) * 0.035;
    group.rotation.x += (-pointerY - group.rotation.x) * 0.035;
    ring.rotation.z = time * 0.00035;
    renderer.render(scene, camera);
    if (!reduced) requestAnimationFrame(render);
  }
  render();
}

initScene();
