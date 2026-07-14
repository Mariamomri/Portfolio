import { useState, useRef } from "react";
import {
  SiReact,
  SiPhp,
  SiMysql,
  SiSymfony,
  SiTailwindcss,
  SiBootstrap,
  SiCss,
} from "react-icons/si";

import geofox from "../assets/img/geofox.png";
import conversionLogo from "../assets/img/échange-de-signes-change-euro-et-dollar-conversion-monétaire-illustration-vectorielle-isolée-sur-fond-blanc-258991261.webp";
import typing from "../assets/img/typing.png";
import basketball from "../assets/img/basketball.gif";
import list from "../assets/img/list.gif";
import earth from "../assets/img/earth.gif";

var projects = [
  {
    title: "Basketball",
    logo: basketball,
    description:
      "School project built with Symfony 7.4: authentication, email verification, password reset, French/Italian translations, full CRUD. Deployed on AlwaysData.",
    tech: [SiSymfony, SiPhp, SiTailwindcss, SiMysql],
    demo: "https://mariam.alwaysdata.net/Basketball",
  },
  {
    title: "Geofox",
    logo: geofox,
    description:
      "Full-stack geography quiz: timer, leaderboard, video backgrounds, responsive layout. React frontend with a REST API to a PHP and MySQL backend.",
    tech: [SiReact, SiTailwindcss, SiPhp, SiMysql],
    demo: "https://mariam.alwaysdata.net/Geofox",
  },
  {
    title: "Projet Typing",
    logo: typing,
    description:
      "React app for a typing speed test, with real-time WPM calculation. Deployed on AlwaysData with a Vite base path configuration.",
    tech: [SiReact],
    demo: "https://mariam.alwaysdata.net/Projet-Typing",
  },
  {
    title: "Todo List",
    logo: list,
    description:
      "React app for managing daily tasks, with the ability to add, complete, and delete items.",
    tech: [SiReact],
    demo: "https://mariam.alwaysdata.net/todolist",
  },
  {
    title: "Villes",
    logo: earth,
    description:
      "PHP app with a MySQL backend for managing city data, interface built with Bootstrap.",
    tech: [SiPhp, SiMysql, SiBootstrap, SiCss],
    demo: "https://mariam.alwaysdata.net/villes",
  },
  {
    title: "Conversion",
    logo: conversionLogo,
    description:
      "PHP app for data/unit conversion, built as a school exercise on server-side logic.",
    tech: [SiPhp],
    demo: "https://mariam.alwaysdata.net/conversion",
  },
];

function ProjectStar(props) {
  var project = props.project;
  var onHover = props.onHover;
  var onLeave = props.onLeave;
  var Icon = project.icon;

  return (
    <a
      href={project.demo}
      target="_blank"
      rel="noreferrer"
      className="project-star"
      onMouseEnter={function () {
        onHover(project);
      }}
      onMouseLeave={onLeave}
    >
      <span className="project-star-dot">
        {project.logo ? (
          <img src={project.logo} alt="" />
        ) : Icon ? (
          <Icon />
        ) : null}
      </span>
      <span className="project-star-label font-orbitron">{project.title}</span>
    </a>
  );
}

function Projects() {
  var videoEndedState = useState(false);
  var videoEnded = videoEndedState[0];
  var setVideoEnded = videoEndedState[1];

  var hoveredState = useState(null);
  var hovered = hoveredState[0];
  var setHovered = hoveredState[1];
  var videoRef = useRef(null);

  return (
    <div className="relative min-h-[70vh] md:min-h-screen">
      <video
        ref={videoRef}
        className="projects-bg-video"
        src="/video/roomspace.mp4"
        autoPlay
        muted
        playsInline
        onLoadedMetadata={function () {
          if (videoRef.current) {
            videoRef.current.playbackRate = 3.5;
          }
        }}
        onEnded={function () {
          setVideoEnded(true);
        }}
      />

      <div
        className={
          "relative min-h[70vh] md:min-h-screen projects-content" +
          (videoEnded ? " projects-content-visible" : "")
        }
      >
        <h1 className="font-orbitron font-black text-4xl md:text-5xl text-center text-glow pt-32 md:pt-16">
          Projects
        </h1>

        <div className="projects-dock">
          {projects.map(function (project) {
            return (
              <ProjectStar
                key={project.title}
                project={project}
                onHover={setHovered}
                onLeave={function () {
                  setHovered(null);
                }}
              />
            );
          })}
        </div>

        {hovered && (
          <div className="project-tooltip">
            <div className="project-tooltip-title font-orbitron">
              {hovered.title}
            </div>
            <p className="project-tooltip-desc">{hovered.description}</p>
            <div className="project-tooltip-tech">
              {hovered.tech.map(function (TechIcon, i) {
                return <TechIcon key={i} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
