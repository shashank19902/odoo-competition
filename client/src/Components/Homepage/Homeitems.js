import React from "react";
import { Link } from "react-router-dom";

export default function Homeitems(props) {
  return (
    <div>
      <div className="card shadow" style={{ borderRadius: "20px" }}>
        <Link to={props.link}>
          <img src={props.cardimg} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body bg-none">
          <h4 className="card-title py-2">{props.title}</h4>
          <Link to={props.link} className="py-2 visit-link">
            <i className="fa-solid fa-angle-right"></i> Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
