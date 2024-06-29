import React from "react";
import "./Footer.css"

export default function Footer() {
  return (
    <div>
      <footer className="mt-5 text-center text-white footer-links-section">
        <div className="container pt-4">
          <section className="mb-3">
            {/* <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
            >
              <i className="fa-brands fa-facebook"></i>
            </a> */}

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.instagram.com/scholarshelf/"
              role="button"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.linkedin.com/company/83524279/admin/"
              role="button"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="mailto:shahyash452@gmail.com"
              role="button"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </section>
        </div>

        <div className="text-center p-3 footer-copyright-section">
          © 2022 Copyright <span>&nbsp;&nbsp;-</span>
          <a className=" copyright-link" href="https://scholarshelf.vercel.app/">
            <span>&nbsp;&nbsp;</span>scholarshelf.vercel.app
          </a>
        </div>
      </footer>
    </div>
  );
}
