import React, { useState, useEffect } from "react";
// import { NavLink, Link } from "react-router-dom";
import Projectitems from "./Projectitems";
import "../Projects/Projectitems.css";
import Axios from "axios";
import "./Projectpage.css";

export default function Projectpage() {
  const [projectList, setprojectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setquery] = useState("");

  const projFunction = async () => {
    try {
      // eslint-disable-next-line
      const data = await Axios.get("http://localhost:3001/read").then(
        (response) => {
          setprojectList(response.data);
        }
      );
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    projFunction();
  }, []);

  const search = (data) => {
    return data.filter(
      (p) =>
        p.projectName.toLowerCase().includes(query.toLowerCase()) ||
        p.author.toLowerCase().includes(query.toLowerCase()) ||
        p.technology.toLowerCase().includes(query.toLowerCase()) ||
        p.authorid.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div>
      {/* <div className="searchBox">
        <input
        className="searchInput"
          type="text"
          placeholder="Search Something Here..."
          onChange={(e) => setquery(e.target.value)}
        />
        <button className="searchButton" href="#">
          <i className="fas fa-search"></i>
        </button>
      </div> */}

      <div
        className="container text-center"
        style={{
          margin: "15px auto",
          padding: "0",
          width: "max-content",
          border: "2px solid #001972",
        }}
      >
        <input
          style={{
            padding: "20px",
            minWidth: "310px",
            margin: "0",
            border: "none",
            outline: "none",
          }}
          type="text"
          placeholder="What are you looking for?"
          className="searchTerm"
          onChange={(e) => setquery(e.target.value)}
        />
        <i
          className="fas fa-search"
          style={{
            border: "1px solid #001972",
            margin: "0",
            background: "#001972",
            color: "#fff",
            padding: "13px",
          }}
        ></i>
      </div>

      {loading ? (
        <div className="container my-3">
          <div className="row">
            {search(projectList).length !== 0 ? (
              search(projectList).map((val, key) => {
                return (
                  <div className="col-md-4" key={key}>
                    <Projectitems
                      title={val.projectName}
                      description={val.description}
                      author={val.author}
                      url={val.projecturl}
                      authorid={val.authorid}
                      technology={val.technology}
                    />
                  </div>
                );
              })
            ) : (
              <div
                className="container projects-not-found text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="not-found-card card shadow">
                  <div className="card-body mx-2 my-4">
                    <h4 style={{color: "#001972", fontWeight: "bold", fontSize: "30px"}}>NO PROJECTS FOUND</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="loader-wrapper">
            <span className="loader">
              <span className="loader-inner"></span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
