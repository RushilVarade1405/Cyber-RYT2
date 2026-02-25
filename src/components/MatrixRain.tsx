import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890ABCDEF<>/{}[]|\\!@#$%^&*";
    const fontSize = 14;

    const getColumns = () => Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(getColumns()).fill(1);

    const draw = () => {
      // Fade trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const columns = getColumns();
      if (drops.length !== columns) {
        drops = Array(columns).fill(1);
      }

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Leading character — bright white-blue glow
        if (drops[i] <= 2) {
          ctx.fillStyle = "rgba(220, 240, 255, 0.95)";
          ctx.shadowColor = "rgba(119, 158, 175, 0.9)";
          ctx.shadowBlur = 8;
        } else {
          // Trail — vivid blue, clearly visible
          ctx.fillStyle = "hsla(220, 5%, 49%, 0.75)";
          ctx.shadowColor = "rgba(54, 65, 70, 0.4)";
          ctx.shadowBlur = 3;
        }

        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
    />
  );
}