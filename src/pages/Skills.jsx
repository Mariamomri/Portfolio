import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiSass,
  SiWordpress,
  SiTypescript,
  SiAngular,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiSymfony,
  SiJson,
  SiMysql,
  SiPhpmyadmin,
  SiFigma,
  SiGit,
  SiGithub,
  SiLinux,
  SiTrello,
  SiGnubash,
  SiUml,
  SiDiagramsdotnet,
} from "react-icons/si";
import {
  FaSearch,
  FaPencilRuler,
  FaNetworkWired,
  FaSitemap,
  FaBriefcase,
} from "react-icons/fa";
import "../assets/styles/skills.css";

const CATEGORIES = [
  {
    name: "Frontend",
    color: "#a855f7",
    radius: 48,
    labelAngle: -95,
    skills: [
      { name: "HTML5", level: 95, Icon: SiHtml5 },
      { name: "CSS3", level: 95, Icon: SiCss },
      { name: "JavaScript", level: 92, Icon: SiJavascript },
      { name: "React", level: 88, Icon: SiReact },
      { name: "TypeScript", level: 78, Icon: SiTypescript },
      { name: "Angular", level: 72, Icon: SiAngular },
      { name: "Tailwind CSS", level: 90, Icon: SiTailwindcss },
      { name: "Bootstrap", level: 85, Icon: SiBootstrap },
      { name: "SASS", level: 75, Icon: SiSass },
      { name: "WordPress", level: 82, Icon: SiWordpress },
    ],
  },
  {
    name: "DevOps & Tools",
    color: "#22d3ee",
    radius: 42.7,
    labelAngle: 5,
    skills: [
      { name: "Git", level: 90, Icon: SiGit },
      { name: "GitHub", level: 90, Icon: SiGithub },
      { name: "Linux", level: 65, Icon: SiLinux },
      { name: "Trello", level: 80, Icon: SiTrello },
      { name: "Bash", level: 60, Icon: SiGnubash },
    ],
  },
  {
    name: "Backend",
    color: "#60a5fa",
    radius: 37.3,
    labelAngle: 190,
    skills: [
      { name: "PHP", level: 85, Icon: SiPhp },
      { name: "Symfony", level: 80, Icon: SiSymfony },
      { name: "JSON", level: 90, Icon: SiJson },
      { name: "API REST", level: 82, Icon: FaNetworkWired },
    ],
  },
  {
    name: "Database",
    color: "#34d399",
    radius: 32,
    labelAngle: 100,
    skills: [
      { name: "MySQL", level: 85, Icon: SiMysql },
      { name: "PHPMyAdmin", level: 85, Icon: SiPhpmyadmin },
    ],
  },
  {
    name: "Design & UX",
    color: "#f472b6",
    radius: 26.7,
    labelAngle: -60,
    skills: [
      { name: "Figma", level: 65, Icon: SiFigma },
      { name: "SEO", level: 60, Icon: FaSearch },
      { name: "UX/UI", level: 65, Icon: FaPencilRuler },
    ],
  },
  {
    name: "Methodology",
    color: "#fbbf24",
    radius: 21.3,
    labelAngle: 260,
    skills: [
      { name: "MERISE", level: 75, Icon: FaSitemap },
      { name: "UML", level: 70, Icon: SiUml },
      { name: "Draw.io", Icon: SiDiagramsdotnet },
    ],
  },
  {
    name: "Office",
    color: "#94a3b8",
    radius: 16,
    labelAngle: 150,
    skills: [{ name: "MS Office", level: 90, Icon: FaBriefcase }],
  },
];

const TMAX = 220;
const MAX_RADIUS = Math.max(...CATEGORIES.map((c) => c.radius));
CATEGORIES.forEach((cat) => {
  cat.duration = TMAX * Math.pow(cat.radius / MAX_RADIUS, 1.5);
});

function sizeForLevel(level) {
  return 26 + (level / 100) * 24;
}

function statusForLevel(level) {
  if (level >= 85)
    return { label: "Mastered", tag: "STATUS: ONLINE // STABLE" };
  if (level >= 60) return { label: "In progress", tag: "STATUS: SYNCING" };
  return { label: "Research", tag: "STATUS: EXPERIMENTAL" };
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawCanvas(ctx, size, dpr, elapsed) {
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);

  const center = size / 2;
  const ellipseSquash = 0.8;

  CATEGORIES.forEach((cat) => {
    const rx = (cat.radius / 100) * size;
    const ry = rx * ellipseSquash;
    ctx.beginPath();
    ctx.setLineDash([3, 7]);
    ctx.lineDashOffset = -elapsed * 8;
    ctx.strokeStyle = hexToRgba(cat.color, 0.55);
    ctx.lineWidth = 1.2;
    ctx.ellipse(center, center, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    const labelRad = (cat.labelAngle * Math.PI) / 180;
    const lx = center + rx * Math.cos(labelRad);
    const ly = center + ry * Math.sin(labelRad);
    ctx.fillStyle = hexToRgba(cat.color, 0.75);
    ctx.font = `${Math.max(9, size * 0.013)}px "Space Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cat.name.toUpperCase(), lx, ly);
  });

  const pulse = 1 + 0.09 * Math.sin(elapsed * 1.6);
  const sunR = size * 0.032 * pulse;

  const glow = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    sunR * 3.2,
  );
  glow.addColorStop(0, "rgba(255, 220, 120, 0.55)");
  glow.addColorStop(1, "rgba(255, 180, 60, 0)");
  ctx.beginPath();
  ctx.fillStyle = glow;
  ctx.arc(center, center, sunR * 3.2, 0, Math.PI * 2);
  ctx.fill();

  const core = ctx.createRadialGradient(
    center - sunR * 0.3,
    center - sunR * 0.35,
    1,
    center,
    center,
    sunR,
  );
  core.addColorStop(0, "#fffbe6");
  core.addColorStop(0.5, "#ffd84d");
  core.addColorStop(1, "#f5a623");
  ctx.beginPath();
  ctx.fillStyle = core;
  ctx.arc(center, center, sunR, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function Skills() {
  const galaxyRef = useRef(null);
  const canvasRef = useRef(null);
  const planetElRefs = useRef([]);
  const tooltipRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const planets = [];
  CATEGORIES.forEach((cat) => {
    const count = cat.skills.length;
    const step = 360 / count;
    const offset = cat.labelAngle + step / 2;
    cat.skills.forEach((skill, i) => {
      planets.push({
        ...skill,
        category: cat.name,
        color: cat.color,
        radius: cat.radius,
        duration: cat.duration,
        baseAngle: offset + i * step,
      });
    });
  });

  useEffect(() => {
    let raf;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const start = performance.now();

    const resize = () => {
      const size = galaxyRef.current?.clientWidth || 0;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = canvasRef.current;
      if (canvas && size) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      const size = galaxyRef.current?.clientWidth || 0;
      const center = size / 2;

      if (canvasRef.current && size) {
        drawCanvas(canvasRef.current.getContext("2d"), size, dpr, elapsed);
      }

      planets.forEach((p, i) => {
        const el = planetElRefs.current[i];
        if (!el || !size) return;
        const angle = p.baseAngle + (elapsed / p.duration) * 360;
        const rad = (angle * Math.PI) / 180;
        const rx = (p.radius / 100) * size;
        const ry = rx * 0.8;
        const x = center + rx * Math.cos(rad);
        const y = center + ry * Math.sin(rad);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(planetElRefs.current, {
        scale: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
      });
      gsap.to(planetElRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.025,
        ease: "back.out(2.2)",
        delay: 0.3,
      });
    }, galaxyRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (hovered && tooltipRef.current) {
      gsap.fromTo(
        tooltipRef.current,
        { opacity: 0, scale: 0.85, y: 6 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "back.out(2)" },
      );
    }
  }, [hovered]);

  const showTooltip = (skill, category, color, e) => {
    const rect = galaxyRef.current.getBoundingClientRect();
    setHovered({
      skill,
      category,
      color,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hoveredData = hovered
    ? planets.find((p) => p.name === hovered.skill)
    : null;
  const hoveredStatus = hoveredData ? statusForLevel(hoveredData.level) : null;

  return (
    <div className="skills-page">
      <div className="skills-layout">
        <div className="skills-categories">
          {CATEGORIES.map((cat) => (
            <div className="category-block" key={cat.name}>
              <div className="category-title" style={{ color: cat.color }}>
                {cat.name}
              </div>
              <div className="category-pills">
                {cat.skills.map((skill) => (
                  <span
                    className="skill-pill"
                    key={skill.name}
                    style={{ "--pill-color": cat.color }}
                  >
                    <skill.Icon />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="galaxy" ref={galaxyRef}>
          <canvas ref={canvasRef} className="galaxy-canvas" />

          {planets.map((p, i) => {
            const size = sizeForLevel(p.level);
            const isActive = hovered?.skill === p.name;
            return (
              <div
                key={p.name}
                ref={(el) => (planetElRefs.current[i] = el)}
                className="planet-pos"
              >
                <div
                  className={`planet${isActive ? " active" : ""}`}
                  style={{ width: size, height: size, "--glow-color": p.color }}
                  onMouseEnter={(e) =>
                    showTooltip(p.name, p.category, p.color, e)
                  }
                  onMouseMove={(e) =>
                    showTooltip(p.name, p.category, p.color, e)
                  }
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => showTooltip(p.name, p.category, p.color, e)}
                >
                  <p.Icon />
                </div>
              </div>
            );
          })}

          {hovered && hoveredData && (
            <div
              className="skill-tooltip"
              ref={tooltipRef}
              style={{ left: hovered.x, top: hovered.y }}
            >
              <div className="row">
                <div
                  className="icon-box"
                  style={{
                    background: `${hovered.color}22`,
                    color: hovered.color,
                  }}
                >
                  <hoveredData.Icon />
                </div>
                <span className="name">{hovered.skill}</span>
              </div>
              <div className="meta">
                {hoveredData.level}% — {hoveredStatus.label}
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${hoveredData.level}%`,
                    background: hovered.color,
                  }}
                />
              </div>
              <div className="status-tag">{hoveredStatus.tag}</div>
            </div>
          )}
        </div>
      </div>

      <div className="skills-mobile-list">
        {planets.map((p) => (
          <div
            className="card"
            key={p.name}
            style={{ borderColor: `${p.color}55` }}
          >
            <p.Icon style={{ color: p.color }} />
            <div className="info">
              <span className="name">{p.name}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${p.level}%`, background: p.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
