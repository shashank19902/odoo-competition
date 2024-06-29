import React, { useState } from "react";
import "./JoinCommunity.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

function JoinCommunity() {

  const colleges = ["CSPIT", "DEPSTAR", "OTHER"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const departments = ["CSE", "CE", "IT", "OTHER"];

  const [college, setCollege] = useState(colleges[0]);
  const [semester, setSemester] = useState(semesters[0]);
  const [department, setDepartment] = useState(departments[0]);


  const [community, setCommunity] = useState({
    fname: "",
    lname: "",
    email: "",
    github: "",
    linkedin: "",
    rollNumber: "",
  });

  // const notify = () => toast("Wow so easy!");

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setCommunity({ ...community, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const {
      fname,
      lname,
      email,
      github,
      linkedin,
      rollNumber,
    } = community;
    console.log(community);
    console.log(college);
    console.log(department);
    console.log(semester);

    const res = await fetch("/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        college,
        department,
        semester,
        github,
        linkedin,
        rollNumber,
      }),
    });

    console.log(community);
    console.log(college);
    console.log(department);
    console.log(semester);
    console.log(res);

    const data = await res.json();
    console.log(data);

    if (res.status === 200 && data) {
      // notify();
      window.alert(data.message);
      console.log("Request made successfully");
      setCollege("");
      setCommunity({
        fname: "",
        lname: "",
        email: "",
        github: "",
        linkedin: "",
        rollNumber: "",
      });
      setDepartment("");
      setSemester("");

    } else if (res.status === 400) {
      window.alert(data.message);
      console.log(data.message);
    }
    else {
      window.alert("Unable to made Request successfully");
      console.log("Unable to made Request successfully");
    }
  };

  return (
    <div className="container-fluid outer-body">
      <ul style={{ zIndex: "0" }} className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <section className="join-our-community shadow">
        <h2 className="font-bold title text-center">
          JOIN OUR COMMUNITY - SCHOLAR'S SHELF
        </h2>
        <div className="container">
          <form method="POST">
            <div className="details-form row">
              <div className="form-field col-lg-6">
                <input
                  type="text"
                  className="input-text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  value={community.fname}
                  onChange={handleInputs}
                />
                <label htmlFor="fname" className="label">
                  First Name
                </label>
              </div>
              <div className="form-field col-lg-6">
                <input
                  type="text"
                  className="input-text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  value={community.lname}
                  onChange={handleInputs}
                />
                <label htmlFor="lname" className="label">
                  Last Name
                </label>
              </div>
              <div className="form-field col-lg-6">
                <input
                  type="email"
                  className="input-text"
                  id="email"
                  name="email"
                  placeholder="sunderpichai@gmail.com"
                  value={community.email}
                  onChange={handleInputs}
                />
                <label htmlFor="email" className="label">
                  Email
                </label>
              </div>
              <div className="form-field col-lg-6">
                <input
                  type="text"
                  className="input-text"
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="20DCS001"
                  value={community.rollNumber}
                  onChange={handleInputs}
                />
                <label htmlFor="email" className="label">
                  Roll Number
                </label>
              </div>
              <div className="form-field col-lg-4 py-2">
                <select
                  className="input-text"
                  id="collegSelect"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                >
                  {colleges.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label htmlFor="college" className="label my-3">
                  College
                </label>
              </div>
              <div className="form-field col-lg-4 py-2">

                <select
                  className="input-text"
                  id="selectDepartment"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>


                <label htmlFor="fname" className="label my-3">
                  Department
                </label>
              </div>
              <div className="form-field col-lg-4 py-2">
                <select
                  className="input-text"
                  id="selectSemester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  {semesters.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label htmlFor="year" className="label my-3">
                  College Semester
                </label>
              </div>
              <div className="form-field col-lg-12">
                <input
                  type="url"
                  className="input-text"
                  id="github"
                  name="github"
                  placeholder="https://github.com/your-profile"
                  value={community.github}
                  onChange={handleInputs}
                />
                <label htmlFor="github" className="label">
                  GitHub Profile
                </label>
              </div>
              <div className="form-field col-lg-12">

                <input
                  type="url"
                  className="input-text"
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/your-profile"
                  value={community.linkedin}
                  onChange={handleInputs}
                />
                <label htmlFor="linkedin" className="label">
                  LinkedIn Profile
                </label>
              </div>
              <div className="form-field col-lg-12">
                <button
                  type="submit"
                  onClick={PostData}
                  className="login-button"
                >
                  Make Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default JoinCommunity;
