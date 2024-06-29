import React, { useState, useEffect } from "react";
import "../Projects/ProjectUploader.css"

import Axios from "axios";

function MaterialUpload() {
  const [mName, setmName] = useState("");
  const [mUrl, setmUrl] = useState("");
  const [mSubject, setmSubject] = useState("");
  const [mType, setmType] = useState("");
  const [mAuthor, setmAuthor] = useState("");
  const [Department, setDepartment] = useState("");
  const [Semester, setSemester] = useState("");
  const [College, setCollege] = useState("");


  const AddtoList = () => {
    Axios.post("http://localhost:3001/imaterials", {
        mName: mName,
        mUrl: mUrl,
        mSubject: mSubject,
        mType: mType,
        mAuthor: mAuthor,
        Department: Department,
        Semester: Semester,
        College: College
    });
  };
  return (
    <div className="proj">
        <h1>Material Section Uploader</h1>

        <label> Material Name: </label>
        <input type="text" onChange={(event) => {setmName(event.target.value)}} />
        <label> Material URL: </label>
        <input type="text"  onChange={(event) => {setmUrl(event.target.value)}} />
        <label> Subject : </label>
        <input type="text"  onChange={(event) => {setmSubject(event.target.value)}} />
        <label> Material Type: </label>
        <input type="text"  onChange={(event) => {setmType(event.target.value)}} />
        <label> Material Author: </label>
        <input type="text"  onChange={(event) => {setmAuthor(event.target.value)}} />
        <label> Department : </label>
        <input type="text"  onChange={(event) => {setDepartment(event.target.value)}} />
        <label>  Semester : </label>
        <input type="text"  onChange={(event) => {setSemester(event.target.value)}} />
        <label>  College : </label>
        <input type="text"  onChange={(event) => {setCollege(event.target.value)}} />

        <button className="btn btn-primary" onClick={AddtoList}  >ADD</button>
        
    </div>
  );
}
export default MaterialUpload;