const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0 };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles(count = 110) {
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 1.8 + 0.8,
  }));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist < 170) {
      const force = (170 - dist) / 170;
      p.vx += (dx / dist) * force * 0.035 + mouse.vx * 0.008;
      p.vy += (dy / dist) * force * 0.035 + mouse.vy * 0.008;
    }

    p.vx *= 0.96;
    p.vy *= 0.96;

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 42, 92, 0.35)';
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
  mouse.vx = e.clientX - mouse.x;
  mouse.vy = e.clientY - mouse.y;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  resize();
  createParticles();
});

resize();
createParticles();
animate();
