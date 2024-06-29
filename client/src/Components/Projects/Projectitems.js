import React from "react";
import "../Projects/Projectitems.css";
import github_logo from "../../Images/github.png";

function Projectitems(props) {
  let { title, description, author, url, authorid, technology } = props;

  const images = ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80", "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHRlY2hub2xvZ3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"];
  const tech = technology.split(",");
  return (
    <div className="card shadow ">
      <img
        src={images[Math.floor(Math.random() * images.length)]}
        className="card-img-top"
        alt={github_logo}
      />
      <div className="card-body py-2 px-3">
        <p className="card-text author">
          <li className="author-name">{author.replace(",", " ")}</li>
          <span className="card-text author-name">
            {authorid.replace(",", " ")}
          </span>
        </p>
        <h5 className="card-title">{title}</h5>

        <p className="card-text description">{description}</p>
        <p className="card-text">
          <ul className="tags">
            {tech.map((name) => (
              <li className="tag">{name + " "} </li>
            ))}{" "}
          </ul>
        </p>

        <a
          className="find-out-more-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-angle-right"></i> Find out more
        </a>
      </div>
    </div>
  );
}
export default Projectitems;
