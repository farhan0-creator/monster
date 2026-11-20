/**
 * Interactive Frost Cursor & Scroll-Triggered Ice Flake Emitter.
 * Tracks pointer movement and drops crystalline ice flakes from the cursor when scrolling.
 */

import React, { useEffect, useRef } from 'react';

interface FrostCursorProps {
  reducedMotion?: boolean;
}

interface IceFlake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  alpha: number;
  life: number;
  maxLife: number;
  swayFreq: number;
  swayPhase: number;
  kind: 'crystal' | 'shard' | 'speck';
  color: string;
}

const MAX_FLAKES = 110;
const FLAKE_COLORS = ['#F5F7F8', '#BDEEFF', '#E2F5FF'];

export const FrostCursor: React.FC<FrostCursorProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resizeCanvas();

    const flakes: IceFlake[] = [];
    let pointerX = width * 0.5;
    let pointerY = height * 0.45;
    let smoothX = pointerX;
    let smoothY = pointerY;
    let pointerActive = false;
    let scrollPulse = 0;
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;
    let lastTime = performance.now();

    const spawnFlakes = (x: number, y: number, count: number, scrollImpulse = 0) => {
      for (let i = 0; i < count; i++) {
        if (flakes.length >= MAX_FLAKES) {
          flakes.shift();
        }
        const roll = Math.random();
        const kind: IceFlake['kind'] =
          roll < 0.45 ? 'crystal' : roll < 0.8 ? 'shard' : 'speck';
        const spreadAngle = (Math.random() - 0.5) * 1.4;
        const baseSpeed = 0.6 + Math.random() * 1.6 + Math.min(3.2, Math.abs(scrollImpulse) * 0.03);

        flakes.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.sin(spreadAngle) * (0.9 + Math.random() * 1.4),
          vy: baseSpeed + Math.random() * 1.1,
          size: kind === 'crystal' ? 4.5 + Math.random() * 4.5 : kind === 'shard' ? 3 + Math.random() * 3.5 : 1.5 + Math.random() * 2,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.06,
          alpha: 0.75 + Math.random() * 0.25,
          life: 0,
          maxLife: 55 + Math.random() * 45,
          swayFreq: 0.04 + Math.random() * 0.05,
          swayPhase: Math.random() * Math.PI * 2,
          kind,
          color: FLAKE_COLORS[Math.floor(Math.random() * FLAKE_COLORS.length)],
        });
      }
    };

    const drawCrystal = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      for (let arm = 0; arm < 6; arm++) {
        const angle = (arm * Math.PI) / 3;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        c.moveTo(0, 0);
        c.lineTo(cos * size, sin * size);

        // Delicate crystalline chevron barb
        const barbLen = size * 0.38;
        const barbStart = size * 0.58;
        const bx = cos * barbStart;
        const by = sin * barbStart;
        c.moveTo(bx, by);
        c.lineTo(bx + Math.cos(angle + 0.65) * barbLen, by + Math.sin(angle + 0.65) * barbLen);
        c.moveTo(bx, by);
        c.lineTo(bx + Math.cos(angle - 0.65) * barbLen, by + Math.sin(angle - 0.65) * barbLen);
      }
      c.stroke();
    };

    const drawShard = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.lineTo(size * 0.55, 0);
      c.lineTo(0, size);
      c.lineTo(-size * 0.55, 0);
      c.closePath();
      c.fill();
    };

    const ensureLoopRunning = () => {
      if (rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };

    const render = (now: number) => {
      const dt = Math.min(2, (now - lastTime) / 16.667);
      lastTime = now;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate cursor aura
      smoothX += (pointerX - smoothX) * Math.min(1, 0.28 * dt);
      smoothY += (pointerY - smoothY) * Math.min(1, 0.28 * dt);
      scrollPulse = Math.max(0, scrollPulse - 0.045 * dt);

      // Draw subtle frosted cursor halo on fine-pointer devices
      if (isFinePointer && pointerActive) {
        const ringRadius = 11 + scrollPulse * 9;
        ctx.save();
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(189, 238, 255, ${0.28 + scrollPulse * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(smoothX, smoothY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 247, 248, 0.85)';
        ctx.fill();
        ctx.restore();
      }

      // Update & draw falling ice flakes
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i];
        f.life += dt;
        if (f.life >= f.maxLife || f.y > height + 30) {
          flakes.splice(i, 1);
          continue;
        }

        // Sub-zero gravity + gentle lateral sway
        f.vy += 0.055 * dt;
        f.vx *= Math.pow(0.985, dt);
        f.x += (f.vx + Math.sin(f.life * f.swayFreq + f.swayPhase) * 0.45) * dt;
        f.y += f.vy * dt;
        f.rotation += f.vr * dt;

        const lifeRatio = f.life / f.maxLife;
        const fade = lifeRatio < 0.15 ? lifeRatio / 0.15 : 1 - (lifeRatio - 0.15) / 0.85;
        const opacity = Math.max(0, f.alpha * fade);

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = f.color;
        ctx.fillStyle = f.color;
        ctx.lineWidth = 1.1;
        ctx.shadowColor = 'rgba(189, 238, 255, 0.65)';
        ctx.shadowBlur = 5;

        if (f.kind === 'crystal') {
          drawCrystal(ctx, f.size);
        } else if (f.kind === 'shard') {
          drawShard(ctx, f.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, f.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      const needsAnotherFrame =
        flakes.length > 0 ||
        scrollPulse > 0.01 ||
        Math.abs(pointerX - smoothX) > 0.3 ||
        Math.abs(pointerY - smoothY) > 0.3 ||
        (isFinePointer && pointerActive);

      if (needsAnotherFrame) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerActive = true;
      ensureLoopRunning();
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      ensureLoopRunning();
    };

    let lastWheelEmit = 0;
    const handleWheel = (e: WheelEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerActive = true;

      const now = performance.now();
      if (now - lastWheelEmit > 28) {
        lastWheelEmit = now;
        const intensity = Math.min(6, Math.max(2, Math.round(Math.abs(e.deltaY) / 35) + 2));
        spawnFlakes(pointerX, pointerY, intensity, e.deltaY);
        scrollPulse = Math.min(1, scrollPulse + 0.45);
        ensureLoopRunning();
      }
    };

    let lastScrollEmit = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (Math.abs(delta) < 1) return;

      const now = performance.now();
      // Avoid double-spawning right next to wheel events, while catching keyboard/scrollbar/touch scrolls
      if (now - lastWheelEmit > 45 && now - lastScrollEmit > 35) {
        lastScrollEmit = now;
        const count = Math.min(5, Math.max(2, Math.round(Math.abs(delta) / 20) + 1));
        spawnFlakes(pointerX, pointerY, count, delta);
        scrollPulse = Math.min(1, scrollPulse + 0.4);
        ensureLoopRunning();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};
