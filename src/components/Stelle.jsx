import { useEffect, useRef } from "react";

function Stellenumero(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random(),
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.02 + 0.01,
  }));
}

const STARS = Stellenumero(200);

export default function Stelle() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const starsRef = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const shooters = Array.from({ length: 4 }, () => makeShooters());

    function makeShooters() {
      return {
        x: Math.random() * 100,
        y: Math.random() * 40,
        length: Math.random() * 90 + 50,
        speed: Math.random() * 1.5 + 0.8,
        angle: 35 + Math.random() * 20,
        opacity: 0,
        progress: 0,
        active: false,
        delay: Math.floor(Math.random() * 400),
      };
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shooters.forEach((s) => {
        if (!s.active) {
          s.delay--;
          if (s.delay <= 0) s.active = true;
          return;
        }
        s.progress += s.speed * 0.003;
        if (s.progress < 0.2) s.opacity = s.progress / 0.2;
        else if (s.progress > 0.7) s.opacity = 1 - (s.progress - 0.7) / 0.3;
        else s.opacity = 1;

        const rad = (s.angle * Math.PI) / 180;
        const dist = s.progress * (canvas.width * 0.6);
        const cx = (s.x / 100) * canvas.width + dist * Math.cos(rad);
        const cy = (s.y / 100) * canvas.height + dist * Math.sin(rad);

        const grad = ctx.createLinearGradient(
          cx - s.length * Math.cos(rad),
          cy - s.length * Math.sin(rad),
          cx,
          cy,
        );
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `rgba(200, 220, 255, ${s.opacity * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(
          cx - s.length * Math.cos(rad),
          cy - s.length * Math.sin(rad),
        );
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (s.progress >= 1) Object.assign(s, makeShooters());
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const animate = () => {
      const now = performance.now();
      starsRef.current.forEach((el, i) => {
        if (!el) return;
        const star = STARS[i];
        const force = star.z * 28;
        const tx = mouseRef.current.x * force;
        const ty = mouseRef.current.y * force;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        const pulse = Math.sin(now * star.twinkleSpeed + star.twinklePhase);
        el.style.opacity = star.opacity * (0.5 + 0.5 * ((pulse + 1) / 2));
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {STARS.map((star, i) => (
          <div
            key={i}
            ref={(el) => (starsRef.current[i] = el)}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "white",
              boxShadow:
                star.z > 0.75
                  ? `0 0 ${star.size * 3}px rgba(200,220,255,0.8)`
                  : "none",
            }}
          />
        ))}
      </div>
    </>
  );
}
