document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-navigation');
const navigationLinks = [...navigation.querySelectorAll('.nav-link')];
const sections = navigationLinks.map(link => document.querySelector(link.hash));

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') === 'false');
});

navigationLinks.forEach((link, index) => link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    sections[index].focus({ preventScroll: true });
  }
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) setMenu(false);
});
window.matchMedia('(min-width: 940px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

let activeSection = -1;
let scrollFrame = 0;

function updateNavigation() {
  scrollFrame = 0;
  const marker = window.innerHeight * 0.25;
  const current = sections.findLastIndex(section => section.getBoundingClientRect().top <= marker);
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
  const index = atBottom ? sections.length - 1 : Math.max(current, 0);
  if (index === activeSection) return;

  activeSection = index;
  navigationLinks.forEach((link, linkIndex) => {
    const active = linkIndex === index;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function queueNavigationUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavigation);
}

window.addEventListener('scroll', queueNavigationUpdate, { passive: true });
window.addEventListener('resize', queueNavigationUpdate);
updateNavigation();

document.querySelector('#year').textContent = new Date().getFullYear();

function drawStack(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(2, 2);
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  function path(points, stroke, fill) {
    ctx.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    if (fill) {
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }

  const layers = [
    { y: 72, stroke: '#fb633e', face: '#3e2c22', edge: '#523020' },
    { y: 150, stroke: '#d6c2a1', face: '#35332a', edge: '#414034' },
    { y: 228, stroke: '#acbc9b', face: '#2d382c', edge: '#364534' },
  ];

  function drawPlate({ y, stroke, face, edge }) {
    // Project the traces and ports onto the same plane as the plate.
    const point = (u, v, depth = 0) => [146 + 111 * (u - v), y + 46 * (u + v - 1) + depth];
    const back = point(0, 0);
    const right = point(1, 0);
    const front = point(1, 1);
    const left = point(0, 1);

    path([left, front, point(1, 1, 11), point(0, 1, 11)], stroke, edge);
    path([front, right, point(1, 0, 11), point(1, 1, 11)], stroke, face);
    path([back, right, front, left], stroke, face);

    ctx.globalAlpha = .28;
    for (const step of [.2, .4, .6, .8]) {
      path([point(step, .08), point(step, .92)], stroke);
      path([point(.08, step), point(.92, step)], stroke);
    }
    ctx.globalAlpha = 1;

    path([point(.15, .16), point(.39, .16), point(.39, .44), point(.52, .44)], stroke);
    path([point(.55, .27), point(.8, .27), point(.8, .6)], stroke);
    path([point(.22, .77), point(.58, .77), point(.58, .61)], stroke);
    path([point(.38, .44), point(.62, .44), point(.62, .67), point(.38, .67)], stroke, face);
    path([point(.45, .5), point(.55, .5), point(.55, .61), point(.45, .61)], stroke, stroke);

    for (const [u, v] of [[.15, .16], [.8, .6], [.22, .77], [.55, .27]]) {
      const [x, portY] = point(u, v);
      ctx.fillStyle = stroke;
      ctx.fillRect(x - 1.5, portY - 1.5, 3, 3);
    }

    ctx.setLineDash([2, 4]);
    path([point(.22, 1, 6), point(.85, 1, 6)], stroke);
    ctx.setLineDash([]);
    path([right, [284, y], [299, y + 15], [310, y + 15]], stroke);
    ctx.fillStyle = stroke;
    ctx.fillRect(308, y + 13, 4, 4);
  }

  ctx.setLineDash([3, 5]);
  path([[35, 39], [35, 271], [146, 301], [257, 271], [257, 39]], '#78816e');
  path([[146, 16], [146, 301]], '#78816e');
  ctx.setLineDash([]);

  for (const layer of [...layers].reverse()) drawPlate(layer);
}

drawStack(document.querySelector('.stack-plot-art'));
