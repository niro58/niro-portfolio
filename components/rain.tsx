"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

function randRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Rain: React.FC = () => {
  const rainContainer = useRef<HTMLCanvasElement | null>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  useEffect(() => {
    const canvas = rainContainer.current;
    if (!canvas) return;

    canvas.width = window.innerWidth / 1.2;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.strokeStyle = "rgba(174, 194, 224, 0.5)";

      ctx.lineWidth = 2;

      ctx.lineCap = "round";

      const init = [];
      const maxParts = 50;
      for (let a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 3,
          xs: -4 + Math.random() * 2 + 2,
          ys: 40
        });
      }

      const particles = [...init];

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (let c = 0; c < particles.length; c++) {
          const p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      };

      const move = () => {
        for (let b = 0; b < particles.length; b++) {
          const p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -10;
          }
        }
      };

      const interval = setInterval(draw, 40);

      return () => {
        if (!inView) return;
        clearInterval(interval);
      };
    }
  }, [inView]);

  return (
    <div ref={ref} className="absolute flex min-h-screen w-full justify-center">
      {inView && <canvas ref={rainContainer} className="-z-10" />}
    </div>
  );
};
