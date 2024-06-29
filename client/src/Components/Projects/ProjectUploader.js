import React, { useState, useEffect } from "react";
import Projectitems from "./Projectitems";
import "../Projects/ProjectUploader.css"

import Axios from "axios";

function ProjectUploader() {
  const [projectName, setprojectName] = useState("");
  const [description, setdescription] = useState("");
  const [author, setauthor] = useState("");
  const [projecturl, setprojecturl] = useState("");

  const [projectList, setprojectList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setprojectList(response.data);
    });
  }, []);

  const AddtoList = () => {
    Axios.post("http://localhost:3001/5bwghty", {
      projectName: projectName,
      description: description,
      author: author,
      projecturl: projecturl,
    });
  };
  return (
    <div className="proj">
        <h1>Project Section Uploader</h1>

        <label> Project Name: </label>
        <input type="text" onChange={(event) => {setprojectName(event.target.value)}} />
        <label> Project Description: </label>
        <input type="text"  onChange={(event) => {setdescription(event.target.value)}} />
        <label> Project Author: </label>
        <input type="text"  onChange={(event) => {setauthor(event.target.value)}} />
        <label> Project URL: </label>
        <input type="text" onChange={(event) => {setprojecturl(event.target.value)}}  />
        <button className="btn btn-primary" onClick={AddtoList}  >ADD</button>
      <div className="container my-3">
        <div className="row">
          {projectList.map((val, key) => {
            return (
              <div className="col-md-4" key={key}>
                <Projectitems
                  title={val.projectName}
                  description={val.description}
                  author={val.author}
                  url={val.projecturl}
                />
              </div>
            );
          })}
        </div>
      </div>
        
    </div>
  );
}
export default ProjectUploader;