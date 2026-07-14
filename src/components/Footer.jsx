import "../assets/styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a
          href="https://github.com/Mariamomri"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/mariam-omri-full-stack"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:codegirlbxl@gmail.com">
          <i className="fa-solid fa-envelope"></i>
        </a>
      </div>

      <div className="footer-info">
        <p>
          <i className="fa-solid fa-location-dot"></i> Brussels
        </p>

        <p>
          <i className="fa-solid fa-phone"></i> +32-466-272161
        </p>
      </div>
    </footer>
  );
}

export default Footer;
