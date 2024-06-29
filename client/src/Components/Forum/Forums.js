import React from "react";
import { Link } from "react-router-dom";
import "../Materials/SubjectCards.css";

function Forums(props) {
  let { title, description, id1 } = props;
  const forumData = {
    forumId: "",
  };

  return (
    <div>
      <div className="card shadow mx-3 " style={{ textAlign: "left" }}>
        <div className="card-body">
          <h5 className="" style={{ fontWeight: "bold", color: "#001972" }}>
            {title}
          </h5>
          <p
            className="card-text"
            style={{
              fontSize: "17px",
              textAlign: "justify",
              lineClamp: "3",
              maxHeight: "50px",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
          <li className="subject-list" style={{ listStyle: "none" }}>
            <Link
              className="visit-link"
              id={{ id1 }}
              to={'/forum/'+ id1}
              onClick={() => (forumData.forumId = id1)}
              state={forumData}
            >
              <span className="link-text">
                <i className="fa-solid fa-angle-right"></i> Add your Thoughts
              </span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Forums;
