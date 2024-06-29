import * as React from "react";
import { Link } from "react-router-dom";
import Homeitems from "./Homeitems";
import "./Homepage.css";
import materialsimg from "../../Images/materials_img.jpg";
import projectsimg from "../../Images/projects_img.jpg";
import welcomeimg from "../../Images/Transparent_logo.png";
import Footer from "../Footer/Footer";

export default function Homepage() {
  return (
    <>
      <div className="container-sm home-page-description my-5">
        
        <div className="left-text-area">
          <h3 className="welcome-text">
            Welcome to{" "}
            <Link to="/" className="welcome-link">
              Scholar's Shelf
            </Link>
          </h3>
          <p className="textbox">
            <b>ScholarShelf</b> is a platform exclusively designed for <b>Charusat Students</b>. ScholarShelf aims two fundamental things about it being an effective way to communicate and meet the requirements of students who are willing to enhance their learning.<b> First fundamental</b> is improving their overall exam marks by providing the required materials and continuously improving those over the time. <b>Second fundamental  </b> aspect of the project is improving their overall development by providing the project references and the forum section which will help them to clear their doubts.</p>
          <a className="explore-more-link" href="#explore-more-section">
            <i className="fa-solid fa-angle-right"></i> Explore more
          </a>
        </div>
        <div className="right-image-area">
          <img
            className="welcome-img img-fluid "
            src={welcomeimg}
            alt=""
          />
        </div>
      </div>

      <div className="py-2">
        <hr className="divider" />
      </div>

      <div className="container px-3 py-0" id="explore-more-section">
        <h3 className="py-1 welcome-text text-center">
          Checkout Materials and Projects here
        </h3>
        <div className="row">
          <div className="col-lg-6">
            <div className="p-3">
              <Homeitems
                cardimg={materialsimg}
                title="Materials"
                link="/Materials"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-3">
              <Homeitems
                cardimg={projectsimg}
                title="Projects"
                link="/Projects"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
