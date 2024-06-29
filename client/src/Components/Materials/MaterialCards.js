import React from "react";
import { Link } from "react-router-dom";
import "./MaterialCards.css";

function MaterialCards(props) {
  let { srNo, mName, mUrl, mSubject, mType, mAuthor, Department, Semester } =
    props;
  let srno = 1;
  const colors = [
    "blue",
    "yellow",
    "green",
    "red",
    "purple",
    "violet",
    "wheat",
  ];
  return (
    <div className="container">
      <table className="text-center" id="demotable">
        <tr>
          <td>
            <a className="material-link visit-link" href={mUrl} target="_blank" rel="noreferrer">
              {mName}
            </a>
          </td>
          <td>{mAuthor}</td>
          <td>{Department}</td>
        </tr>
      </table>
    </div>
  );
}

export default MaterialCards;
