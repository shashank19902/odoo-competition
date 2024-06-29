import React from "react";
import "./AboutUs.css";
import profilebackground1 from "../../Images/profile-background-image1.jpg";
import profilebackground2 from "../../Images/profile-background-image2.jpg";
import profilebackground3 from "../../Images/profile-background-image3.jpg";
import ayush from "../../Images/ayush.jpeg";
import yash from "../../Images/yash.jpeg";
import shashank from "../../Images/shashank.jpeg";

export default function AboutUs() {
  return (
    <div className="container ">
      <div className="our-vision-container my-5 px-3 py-4">
        <h3>Our Mission</h3>
        <p className="vision-mission-text" style={{textAlign: "justify"}}>
          Our Mission is to Provide a <b>Simple Interface</b> to College Student for their <b>Study Materials</b>, <b>Projects </b>,
          <b>Previous year Question Papers </b>, <b>Practical Files </b> and many more things at a <b>Single Place</b>, at a <b>Single Website</b>, at a <b>Single Plateform.</b>
          <br/>So students get relief from finding different materials from diffrent faculties at different plateforms...
        </p>
      </div>
      <div className="our-mission-container my-5 px-3 py-4">
        <h3 className="mobile-view">Our Vision</h3>
        <p className="vision-mission-text vision-text" style={{textAlign: "justify"}}>
          Our Vision is launch this website for <b>Every Universities across India</b>, and make this Engineering materials finding process easy.
          <br/>We wants to help student to get out from this material burden and have some relief...<br></br>Our Project is currently only available in Charusat University only.
        </p>
        <h3 className="desktop-view">Our Vision</h3>
      </div>
      <h3 className="text-center page-heading my-3">Meet the Developers</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card  profile-card shadow">
            <div className="image1">
              <img src={profilebackground1} alt="" />
            </div>
            <div className="image2">
              <img src={ayush} alt="" />
            </div>
            <div className="main-text">
              <h2>Ayush Shah</h2>
              <h6 className="card-subtitle text-muted my-2">
                Frontend Developer
              </h6>
              <p className="about-us">
                Data Science Enthusiast | Frontend Developer | Flutter Developer
              </p>
            </div>
            <div className="socials">
              <a href="https://github.com/ayushshah4403" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/ayush-shah-8028b3234/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/ayush_shah_official/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card profile-card shadow">
            <div className="image1">
              <img src={profilebackground2} alt="" />
            </div>
            <div className="image2">
              <img src={yash} alt="" />
            </div>
            <div className="main-text">
              <h2>Yash Shah</h2>
              <h6 className="card-subtitle text-muted my-2">
                Backend Developer
              </h6>
              <p className="about-us">
              Data Science Enthusiast | Backend Developer | Android Developer
              </p>
            </div>
            <div className="socials">
              <a
                href="https://github.com/shahyash452"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/yash-shah-295952219/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card profile-card shadow">
            <div className="image1">
              <img src={profilebackground3} alt="" />
            </div>
            <div className="image2">
              <img src={shashank} alt="Shashank Shah" />
            </div>
            <div className="main-text">
              <h2>Shashank Shah</h2>
              <h6 className="card-subtitle text-muted my-2">
                Backend Developer
              </h6>
              <p className="about-us">
                Ethical Hacking Enthusiastic | Codechef (1500+) | Backend
                Developer | Competitive Programmer | MERN Stack Developer
              </p>
            </div>
            <div className="socials">
              <a
                href="https://github.com/Shashank1719"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/shashank1719"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/_.king._1719/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
