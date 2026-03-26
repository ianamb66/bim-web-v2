import { useEffect, useRef } from "react";
import { rgba } from "../lib/color";

export function NeuronBackground({ theme }: { theme: "dark" | "light" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      alpha: number;
    }> = [];

    let mouse = { x: -1000, y: -1000 };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 6000);
      for (let i = 0; i < numParticles; i++) {
        const r = Math.random() * 1.5 + 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseRadius: r,
          radius: r,
          alpha: 0.4,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = theme === "dark";
      const colorBase = isDark ? "255, 255, 255" : "0, 0, 0";
      const colorAccent = "234, 179, 8";

      if (mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = rgba(colorBase, 0.05);
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetRadius = p.baseRadius;
        let targetAlpha = 0.3;

        if (mouse.x > 0 && dist < 200) {
          const force = (200 - dist) / 200;
          p.x += dx * force * 0.02;
          p.y += dy * force * 0.02;
          targetRadius = p.baseRadius + force * 2.5;
          targetAlpha = 0.3 + force * 0.7;
        }

        p.radius += (targetRadius - p.radius) * 0.1;
        p.alpha += (targetAlpha - p.alpha) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(colorBase, p.alpha);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 10000) {
            ctx.strokeStyle = rgba(colorBase, isDark ? 0.1 : 0.05);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          const dx1 = p1.x - mouse.x;
          const dy1 = p1.y - mouse.y;
          const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          if (dist1 < 220) {
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx2 = p2.x - mouse.x;
              const dy2 = p2.y - mouse.y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              if (dist2 < 220) {
                const dx3 = p1.x - p2.x;
                const dy3 = p1.y - p2.y;
                const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
                if (dist3 < 120) {
                  const avgDist = (dist1 + dist2) / 2;
                  const opacity = Math.max(0, 1 - avgDist / 220);
                  ctx.beginPath();
                  ctx.moveTo(mouse.x, mouse.y);
                  ctx.lineTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.closePath();
                  ctx.fillStyle = rgba(colorAccent, opacity * 0.15);
                  ctx.fill();
                  ctx.strokeStyle = rgba(colorAccent, opacity * 0.6);
                  ctx.stroke();
                }
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-normal"
    />
  );
}
