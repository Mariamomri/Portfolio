import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
} from "react-icons/fa6";

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
  return (
    <div className="relative min-h-screen">
      <div className="relative contact-content min-h-screen px-6 py-24 max-w-3xl mx-auto flex flex-col items-center text-center">
        <div className="contact-panel">
          <span className="contact-eyebrow font-orbitron">Get in touch</span>

          <h1 className="font-orbitron font-black text-4xl md:text-5xl text-glow">
            Contact
          </h1>

          <p className="text-gray-300 max-w-xl">
            I'm currently completing my Full-Stack Web Developer training and am
            looking for an internship starting on{" "}
            <strong>November 9, 2026</strong>. If you're looking for a motivated
            and curious developer eager to learn and contribute to real-world
            projects, I'd be happy to connect. Feel free to get in touch!
          </p>

          <div className="contact-location">
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
