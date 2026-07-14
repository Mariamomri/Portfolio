import { Link } from "react-router-dom";
import shipImg from "../assets/img/spaceship.png";
import astImg from "../assets/img/ast.png";
import avventurImg from "../assets/img/avventur.png";
import doorImg from "../assets/img/door.jpg";
import magicalImg from "../assets/img/magical.jpg";
import sunsetImg from "../assets/img/sunset.jpg";
import Button from "../components/Button";
import "../assets/styles/home.css";

var HOTSPOTS = [
  { label: "Skills", to: "/skills", top: "66%", left: "10%", img: astImg },
  {
    label: "Experience",
    to: "/experience",
    top: "50%",
    left: "38%",
    img: avventurImg,
  },
  {
    label: "Contact",
    to: "/contact",
    top: "38%",
    left: "58%",
    img: doorImg,
  },
  {
    label: "Languages",
    to: "/languages",
    top: "66%",
    left: "55%",
    img: magicalImg,
  },
  {
    label: "Projects",
    to: "/projects",
    top: "33%",
    left: "26%",
    img: sunsetImg,
  },
];

function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="ship-wrap">
          <img
            src={shipImg}
            alt="Mariam Omri — Dev Full Stack"
            className="ship-img"
          />
          {HOTSPOTS.map(function (spot) {
            return (
              <Link
                key={spot.label}
                to={spot.to}
                className="ship-hotspot"
                style={{ top: spot.top, left: spot.left }}
              >
                <span className="ship-hotspot-ring">
                  <img src={spot.img} alt={spot.label} />
                </span>
                <span className="ship-hotspot-label font-orbitron">
                  {spot.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="ship-hotspots-mobile">
          {HOTSPOTS.map(function (spot) {
            return (
              <Link key={spot.label} to={spot.to} className="ship-hotspot-m">
                <span className="ship-hotspot-ring">
                  <img src={spot.img} alt={spot.label} />
                </span>
                <span className="ship-hotspot-label font-orbitron">
                  {spot.label}
                </span>
              </Link>
            );
          })}
        </div>
        
        <Button href="/Mariam Omri.pdf" download className="home-cv-btn">
          Download CV
        </Button>
      </div>
    </div>
  );
}

export default Home;
