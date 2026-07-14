import { useEffect, useRef } from "react";
import gsap from "gsap";
import earthImg from "../assets/img/earth-planet.gif";
import Ship from "../components/Ship";
import "../assets/styles/languages.css";

var LANGUAGES = ["English", "French", "Dutch", "Arabic", "Italian"];

var FLIGHT_DURATION = 8;

function Languages() {
  var nodeRefs = useRef([]);
  var nodeRefsMobile = useRef([]);

  useEffect(function () {
    var ctx = gsap.context(function () {
      gsap.set(nodeRefs.current, {
        opacity: 0,
        x: -20,
      });
      gsap.to(nodeRefs.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: FLIGHT_DURATION / LANGUAGES.length,
        ease: "power2.out",
      });
      gsap.set(nodeRefsMobile.current, {
        opacity: 0,
        y: 16,
      });
      gsap.to(nodeRefsMobile.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.25,
        ease: "power2.out",
        delay: 0.3,
      });
    });
    return function () {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Ship />
      <div className="languages-page">
        <div className="languages-globe-wrap">
          <img src={earthImg} alt="Earth" className="languages-globe" />
          <div className="language-stack">
            {LANGUAGES.map(function (name, i) {
              return (
                <div
                  key={name}
                  ref={function (el) {
                    nodeRefsMobile.current[i] = el;
                  }}
                  className="language-node font-orbitron"
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>

        <div className="language-track">
          {LANGUAGES.map(function (name, i) {
            return (
              <div
                key={name}
                ref={function (el) {
                  nodeRefs.current[i] = el;
                }}
                className="language-node font-orbitron"
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Languages;
