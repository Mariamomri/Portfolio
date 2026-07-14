import { NavLink, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark, FaBars, FaXmark } from "react-icons/fa6";
import musicDay from "../assets/music/day.mp3";
import "../assets/styles/header.css";
import logoImg from "../assets/img/logo.png";

function Header() {
  var audioRef = useRef(null);
  var playingState = useState(false);
  var isPlaying = playingState[0];
  var setIsPlaying = playingState[1];

  var menuState = useState(false);
  var menuOpen = menuState[0];
  var setMenuOpen = menuState[1];

  function toggleMusic() {
    var audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().catch(function () {});
      setIsPlaying(true);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <audio ref={audioRef} src={musicDay} loop preload="auto" />

      <header className="header">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logoImg} alt="Mariam Omri" className="logo-mark" />
        </Link>

        <button
          type="button"
          className="nav-burger"
          onClick={function () {
            setMenuOpen(!menuOpen);
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>

        <nav className={menuOpen ? "nav-open" : ""}>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/skills"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="/experience"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Experience
          </NavLink>
          <NavLink
            to="/languages"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Languages
          </NavLink>
          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>

          <button
            type="button"
            onClick={toggleMusic}
            className="music-toggle"
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? <FaVolumeHigh /> : <FaVolumeXmark />}
          </button>
        </nav>
      </header>
    </>
  );
}

export default Header;
