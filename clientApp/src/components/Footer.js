import React from "react";

const Footer = () => (
  <footer className={`footer text-center py-2 bg-primary-custom mt-5`}>
    <div className="footer-copyright ">
      <h4 className="mb-0">
        Made with <i className={`fa fa-heart text_red`} aria-hidden="true"></i>{" "}
        by{" "}
        <a
          className="text-white"
          target="blank"
          href="https://github.com/JhonasV"
        >
          Jhonas Veras
        </a>
      </h4>
    </div>
  </footer>
);

export default Footer;
