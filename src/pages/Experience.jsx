import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";
import Navicella from "../components/Navicella";
import "../assets/styles/experience.css";

const EDUCATION = [
  {
    period: "2025 — 2026",
    title: "Web Developer Full-Stack",
    place: "Cfitech, Brussels",
    description:
      "Intensive full-stack training: JavaScript, TypeScript, React, Angular, PHP, Symfony, MySQL, Tailwind CSS, Git and WordPress. Project-based approach.",
  },
  {
    period: "2024 — 2025",
    title: "French",
    place: "Centre Béguinage, Brussels",
    description: "Language course to strengthen professional French.",
  },
  {
    period: "2023 — 2025",
    title: "Dutch",
    place: "CVO Lethas, Brussels",
    description: "Language course to strengthen professional Dutch.",
  },
  {
    period: "2016 — 2019",
    title: "English & IT Skills",
    place: "ESOL, England",
    description: "English language and IT skills training.",
  },
  {
    period: "2003 — 2008",
    title: "Business Management Diploma",
    place: "IPSAS, Italy",
    description: "Diploma in business management.",
  },
];

const EXPERIENCE = [
  {
    period: "06/2019 — 09/2019",
    title: "Accounting Employee",
    place: "Saragozza, Italy",
    description:
      "Cash management, accounting entries, correspondence, invoice recording, report preparation, order management, payroll, tax documents.",
  },
  {
    period: "09/2017 — 04/2019",
    title: "Volunteer",
    place: "Greenbank School, England",
    description:
      "Participated in training sessions, educational projects, and organization of school events.",
  },
  {
    period: "02/2011 — 03/2013",
    title: "Back-Office Employee",
    place: "GPA S.P.A, Italy",
    description:
      "Claims file management, data entry and updates, archive management, client communication, phone handling, report writing.",
  },
];

const EDU_POS = [
  [-5.6, 1.5, 3.2], //WEB DESTRA+SONOSTRA ....SU_GIU....LONTANO_VICINO
  [-5.5, 3.8, 0.5], //FRENCH
  [4.6, 3.8, -2.8], //DUTSH
  [-2, 3.6, -1.5], //ENGLISH
  [-5.3, -0.4, 5], //BUSINESS
];

const EXP_POS = [
  [4.8, 1.6, -0.5],
  [5.1, 0, 1.5],
  [4.7, -1.6, 3],
];

function PanelCard({ item, Icon, type }) {
  return (
    <div className={`hud-panel ${type}`}>
      <div className="hud-panel-icon">
        <Icon />
      </div>
      <div className="hud-panel-period">{item.period}</div>
      <h3 className="hud-panel-title font-orbitron">{item.title}</h3>
      <div className="hud-panel-place">{item.place}</div>
      <p className="hud-panel-description">{item.description}</p>
    </div>
  );
}

function Experience() {
  const panels = [
    ...EDUCATION.map((item, i) => ({
      position: EDU_POS[i],
      content: (
        <PanelCard item={item} Icon={FaGraduationCap} type="education" />
      ),
    })),
    ...EXPERIENCE.map((item, i) => ({
      position: EXP_POS[i],
      content: <PanelCard item={item} Icon={FaBriefcase} type="work" />,
    })),
  ];

  return (
    <>
      <Navicella panels={panels} />
    </>
  );
}

export default Experience;
