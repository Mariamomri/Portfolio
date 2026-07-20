import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../assets/styles/cursor.css";

function Cursor() {
  var dotRef = useRef(null);
  var ringRef = useRef(null);

  useEffect(function () {
    var isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    var dot = dotRef.current;
    var ring = ringRef.current;

    var setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    var setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    var setRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    var setRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    var handleMove = function (e) {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    var handleOver = function (e) {
      if (e.target.closest("a, button, .cursor-hover")) {
        ring.classList.add("cursor-ring-hover");
      }
    };
    var handleOut = function (e) {
      if (e.target.closest("a, button, .cursor-hover")) {
        ring.classList.remove("cursor-ring-hover");
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return function () {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default Cursor;
