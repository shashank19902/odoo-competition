import React, { useState, useEffect } from "react";
import SubjectCards from "./SubjectCards";
import "./SubjectCards.css";
import Axios from "axios";

function SubjectDisplay() {
  const [subList, setSubList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setquery] = useState("");

  const matFunction = async () => {
    try {
      const data = await Axios.get(
        "http://localhost:3001/rcards"
      ).then((response) => {
        setSubList(response.data);
      });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const search = (data) => {
    return data.filter(
      (p) =>
        p.subject.toLowerCase().includes(query.toLowerCase()) ||
        p.fname.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    matFunction();
  }, []);

  return (
    <div className="home">
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
          
          <div className="row ">
            {search(subList).length !== 0 ? (
              search(subList).map((val, key) => {
                return (
                  <div className="col-md-4 " key={key}>
                    <SubjectCards
                      id1={val.subject}
                      sub1={val.subject}
                      fname={val.fname}
                    />
                  </div>
                );
              })
            ) :  (
              <div
                className="container projects-not-found text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="not-found-card card shadow">
                  <div className="card-body mx-2 my-4">
                    <h4 style={{color: "#001972", fontWeight: "bold", fontSize: "30px"}}>NO SUBJECTS FOUND</h4>
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

export default SubjectDisplay;
