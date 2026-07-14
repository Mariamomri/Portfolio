import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
} from "react-icons/fa6";
import { useEffect, useRef } from "react";
import gsap from "gsap";

var links = [
  {
    icon: FaEnvelope,
    label: "Email",
    href: "mailto:codegirlbxl@gmail.com",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Mariamomri",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mariam-omri-full-stack/",
  },
];

function Contact() {
  var panelRef = useRef(null);
  var eyebrowRef = useRef(null);
  var letterRefs = useRef([]);
  var paraRef = useRef(null);
  var locRef = useRef(null);
  var linkRefs = useRef([]);

  var title = "Contact";

  useEffect(function () {
    var ctx = gsap.context(function () {
      var tl = gsap.timeline({ delay: 0.2 });

      tl.set(letterRefs.current, {
        opacity: 0,
        y: -60,
        rotation: function () {
          return gsap.utils.random(-60, 60);
        },
      })
        .set([eyebrowRef.current, paraRef.current, locRef.current], {
          opacity: 0,
          y: 16,
        })
        .set(linkRefs.current, { opacity: 0, scale: 0 })

        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          letterRefs.current,
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "back.out(2.5)",
          },
          "-=0.15",
        )
        .to(
          paraRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          locRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .to(
          linkRefs.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "back.out(2.2)",
          },
          "-=0.15",
        );
    }, panelRef);

    return function () {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="relative contact-content min-h-screen px-6 py-24 max-w-3xl mx-auto flex flex-col items-center text-center">
        <div className="contact-panel" ref={panelRef}>
          <span className="contact-eyebrow font-orbitron" ref={eyebrowRef}>
            Get in touch
          </span>

          <h1 className="font-orbitron font-black text-4xl md:text-5xl text-glow contact-title">
            {title.split("").map(function (char, i) {
              return (
                <span
                  key={i}
                  ref={function (el) {
                    letterRefs.current[i] = el;
                  }}
                  className="contact-title-letter"
                >
                  {char}
                </span>
              );
            })}
          </h1>

          <p className="text-gray-300 max-w-xl" ref={paraRef}>
            I am currently completing my Full-Stack Web Developer training and
            am looking for an internship starting on{" "}
            <strong>November 9, 2026</strong>. <br />
            If you're looking for a motivated and curious developer who is eager
            to learn and contribute to real-world projects, I would be happy to
            connect. <br />
            Please feel free to get in touch!
          </p>

          <div className="contact-location" ref={locRef}>
            <FaLocationDot />
            Brussels, Belgium
          </div>

          <div className="contact-links">
            {links.map(function (link) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                  ref={function (el) {
                    linkRefs.current[links.indexOf(link)] = el;
                  }}
                >
                  <span className="contact-link-icon">
                    <link.icon />
                  </span>
                  <span className="contact-link-label font-orbitron">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
