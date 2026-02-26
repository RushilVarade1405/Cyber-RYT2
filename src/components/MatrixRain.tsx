import { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.75 }: { opacity?: number }) {
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

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890ABCDEF<>/{}[]|\\!@#$%^&*";
    const fontSize = 13;

    const getColumns = () => Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(getColumns()).fill(1);

    const draw = () => {
      // Fade trail
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const columns = getColumns();
      while (drops.length < columns) drops.push(Math.random() * -100);

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        if (drops[i] <= 2) {
          // Leading character — bright white-gray glow
          ctx.fillStyle = "rgba(220,230,235,0.95)";
          ctx.shadowColor = "rgba(180,200,210,0.9)";
          ctx.shadowBlur = 8;
        } else {
          // Trail — graded gray tones
          const brightness = Math.random();
          if (brightness > 0.97) {
            ctx.fillStyle = "rgba(200,210,215,0.9)";   // rare bright
          } else if (brightness > 0.85) {
            ctx.fillStyle = "rgba(130,150,160,0.65)";  // medium gray
          } else if (brightness > 0.55) {
            ctx.fillStyle = "rgba(80,95,105,0.45)";    // dim gray
          } else {
            ctx.fillStyle = "rgba(40,50,55,0.3)";      // near-invisible
          }
          ctx.shadowColor = "rgba(54,65,70,0.4)";
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

    const interval = setInterval(draw, 45);

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
        opacity,
      }}
    />
  );
}