import React from "react";
import { Link } from "react-router-dom";
import "./SubjectCards.css";

function SubjectCards(props) {
  let { id1, sub1, fname } = props;
  const myData = {
    subject_name: "",
    fname:""
  };
  // console.log(id1);

  return (
    <div>
      <div className="card shadow subject-card px-0 py-3">
        <div className="card-body subject-card-body">
          <h1 className="card-title subject-title">{sub1}</h1>
          <h6
            style={{
              fontSize: "15px",
              lineClamp: "2",
              minHeight: "50px",
              maxHeight: "50px",
              overflow: "hidden",
            }}
            className="card-subtitle subject-full-form mb-2 pt-3 pb-5 text-muted"
          >
            {fname}
          </h6>
          <li className="subject-list" style={{ listStyle: "none" }}>
            <Link
              className="find-materials-link"
              to="/SubjectMaterials"
              id={id1}
              onClick={(event) =>
                (myData.subject_name = event.currentTarget.id , myData.fname=fname)

              }
              state={myData}
            >
              <span className="link-text">
                <i className="fa-solid fa-angle-right"></i> Find Materials
              </span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default SubjectCards;
