"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * DPR;
      canvas.height = height * DPR;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    const NODE_COUNT = width < 768 ? 38 : 70;

    const nodes: Node[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,

        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,

        radius: Math.random() * 1.8 + 0.6,
      });
    }

    const drawGrid = () => {
      const gridSize = 72;

      ctx.beginPath();

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 1;

      ctx.stroke();
    };

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {

          const a = nodes[i];
          const b = nodes[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {

            const opacity = 1 - distance / 130;

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(34,211,238,${opacity * 0.12})`;

            ctx.lineWidth = 1;

            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      nodes.forEach((node) => {

        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
        }

        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
        }

        ctx.beginPath();

        ctx.arc(
          node.x,
          node.y,
          node.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "rgba(103,232,249,0.75)";

        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(34,211,238,0.5)";

        ctx.fill();
      });
    };

    const drawScanlines = () => {

      const time = Date.now() * 0.00008;

      for (let i = 0; i < 3; i++) {

        const y =
          ((time * 1000 + i * 280) % (height + 200)) - 100;

        const gradient = ctx.createLinearGradient(
          0,
          y,
          0,
          y + 120
        );

        gradient.addColorStop(0, "rgba(34,211,238,0)");
        gradient.addColorStop(0.5, "rgba(34,211,238,0.035)");
        gradient.addColorStop(1, "rgba(34,211,238,0)");

        ctx.fillStyle = gradient;

        ctx.fillRect(0, y, width, 120);
      }
    };

    const animate = () => {

      ctx.clearRect(0, 0, width, height);

      drawGrid();
      drawConnections();
      drawNodes();
      drawScanlines();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] opacity-90"
    />
  );
}