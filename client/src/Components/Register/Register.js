import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const colleges = ["CSPIT", "DEPSTAR", "OTHER"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const departments = ["CSE", "CE", "IT", "OTHER"];

  const [college, setCollege] = useState(colleges[0]);
  const [semester, setSemester] = useState(semesters[0]);
  const [department, setDepartment] = useState(departments[0]);

  const navigate = useNavigate();


  const callRegisterPage = async () => { 
    try {
      const res = await fetch("/register", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
  
      const data = await res.json();
      console.log(data);
  
      if (res.status === 401) {
        navigate('/');
      }

   }catch (e) { 
    console.log(e);
   }
  }

  useEffect(() => {
    callRegisterPage();
  }, []);




  const [user, setUser] = useState({
    email: "",
    fullName: "",
    mobileNumber: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { email, fullName, mobileNumber, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullName,
        department,
        college,
        semester,
        mobileNumber,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (res.status === 202 && data) {
      window.alert("OTP has been sent successfully");
      console.log("OTP sent");
      console.log(data);

      navigate("/verifyOtp", {
        state: {
          userId: data.userData.userId,
          email: data.userData.email,
        },
      });
    } else if (res.status === 402) {
      window.alert(data.message);
      console.log("Invalid Email Id");
      console.log(data);
    } else if (res.status === 422) {
      window.alert(data.message);
      console.log(data);
    } else if (res.status === 401) {
      window.alert(data.message);
      console.log(data);
    } else {
      window.alert(data.message);
      console.log("Invalid Registration");
      console.log(data);
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
          REGISTER
        </h2>
        <div className="container">
          <form method="POST">
            <div className="details-form row">
              <div className="form-field col-lg-12">
                <input
                  type="email"
                  id="email"
                  className="input-text"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                />
                <label htmlFor="fname" className="label">
                  Email
                </label>
              </div>
              <div className="form-field col-lg-6">
                <input
                  type="text"
                  id="fullname"
                  className="input-text"
                  placeholder="Full Name"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputs}
                />
                <label htmlFor="lname" className="label">
                  Full Name
                </label>
              </div>
              <div className="form-field col-lg-6">
                <input
                  type="tel"
                  id="mobileNumber"
                  className="input-text"
                  placeholder="Mobile Number"
                  name="mobileNumber"
                  value={user.mobileNumber}
                  onChange={handleInputs}
                />
                <label htmlFor="fname" className="label">
                  Mobile Number
                </label>
              </div>
              <div className="form-field col-lg-4">
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
              </div>
              <div className="form-field col-lg-4">
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
              </div>
              <div className="form-field col-lg-4">
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
              </div>

              <div className="form-field col-lg-12">
                <input
                  type="password"
                  id="password"
                  className="input-text"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                />
                <label htmlFor="year" className="label">
                  Password
                </label>
              </div>
              <div className="form-field col-lg-12">
                <input
                  type="password"
                  id="cpassword"
                  className="input-text"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                />
                <label htmlFor="github" className="label">
                  Confirm Password
                </label>
              </div>

              <div className="form-field col-lg-12">
                <button
                  type="button"
                  className="signup-button"
                  onClick={PostData}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
