/* Canvas confetti burst — the canvas is only created on the first burst. */
const COLORS = ["#ff4fa3", "#ff8a3d", "#ffd23f", "#c3f55c", "#4d7cff", "#8b5cf6", "#2fd6a5"];

interface Particle {
  x: number; y: number; vx: number; vy: number;
  s: number; c: string; rot: number; vr: number; life: number; round: boolean;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let parts: Particle[] = [];
let running = false;

function resize() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function setup(): CanvasRenderingContext2D | null {
  if (ctx) return ctx;
  canvas = document.createElement("canvas");
  canvas.className = "confetti";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();
  addEventListener("resize", resize);
  return ctx;
}

function frame() {
  if (!ctx) return;
  const c = ctx;
  c.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  for (const p of parts) {
    p.vy += 0.25;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 1;
    c.save();
    c.translate(p.x, p.y);
    c.rotate(p.rot);
    c.globalAlpha = Math.min(1, p.life / 40);
    c.fillStyle = p.c;
    if (p.round) {
      c.beginPath();
      c.arc(0, 0, p.s / 2, 0, Math.PI * 2);
      c.fill();
    } else {
      c.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    }
    c.restore();
  }
  if (parts.length) requestAnimationFrame(frame);
  else {
    running = false;
    c.clearRect(0, 0, innerWidth, innerHeight);
  }
}

export function confetti(x: number, y: number) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!setup()) return;
  for (let i = 0; i < 140; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
    const v = 6 + Math.random() * 10;
    parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      s: 6 + Math.random() * 8, c: COLORS[(Math.random() * COLORS.length) | 0],
      rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, life: 120 + Math.random() * 60, round: Math.random() < 0.3,
    });
  }
  if (!running) {
    running = true;
    requestAnimationFrame(frame);
  }
}
