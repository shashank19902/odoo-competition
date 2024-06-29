import React, { useState, useEffect } from "react";
import "./UserProfile.css";

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    const res = await fetch("/myProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

    const data = await res.json();
    console.log(data); // user data here
    setUserData(data);

    setLoading(true);

    if (res.status === 200 && data) {
      console.log("User data fetched Successfully");
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userData);
  console.log(userData.email);
  return (
    <div>
      {loading ? (
        <div className="outer-body">
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
          <div className="container my-profile-container">
            <div className="card shadow">
              <div className="card-body">
                <div className="details-form row">
                  <div className="form-field col-lg-12">
                    <input
                      type="text"
                      className="input-text"
                      id="uname"
                      name="uname"
                      disabled
                      value={userData.fullName}
                    />
                    <label htmlFor="fname" className="label">
                      Full Name
                    </label>
                  </div>
                  <div className="form-field col-lg-6">
                    <input
                      type="email"
                      className="input-text"
                      id="email"
                      name="email"
                      disabled
                      value={userData.email}
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
                      disabled
                      value={userData.email.split("@")[0]}
                    />
                    <label htmlFor="email" className="label">
                      Roll Number
                    </label>
                  </div>
                  <div className="form-field col-lg-4">
                    <input
                      type="text"
                      className="input-text"
                      id="college"
                      name="college"
                      disabled
                      value={userData.college}
                    />
                    <label htmlFor="college" className="label">
                      College
                    </label>
                  </div>
                  <div className="form-field col-lg-4">
                    <input
                      type="text"
                      className="input-text"
                      id="department"
                      name="department"
                      disabled
                      value={userData.department}
                    />
                    <label htmlFor="fname" className="label">
                      Department
                    </label>
                  </div>
                  <div className="form-field col-lg-4">
                    <input
                      type="number"
                      className="input-text"
                      id="semester"
                      name="semester"
                      disabled
                      value={userData.semester}
                    />
                    <label htmlFor="year" className="label">
                      College Semester
                    </label>
                  </div>
                  <div className="form-field col-lg-12">
                    <input
                      type="number"
                      className="input-text"
                      id="mobile"
                      name="mobile"
                      disabled
                      value={userData.mobileNumber}
                    />
                    <label htmlFor="github" className="label">
                      Mobile Number
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
