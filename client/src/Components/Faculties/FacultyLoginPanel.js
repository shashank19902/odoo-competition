import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";

export default function FacultyLoginPanel() {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
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

    const { email, password } = user;

    const res = await fetch("/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 200 && data) {
      window.alert("Admin Logged in");
      dispatch({ type: "USER", payload: true });
      window.localStorage.setItem("isLoggedIn", "true");
      console.log("Admin Logged In");
      window.localStorage.setItem("facultycode", data.token);
      window.localStorage.setItem("role", data.role);
      window.localStorage.setItem("facultyrole", data.role);
      console.log(data);

      navigate("/dashboard");

      
    } else if (res.status === 202) {
      window.alert(data.message);
        navigate("/verifyOtp",{
          state:{
            userId: data.userData.userId,
            email: data.userData.email
          }
        });
    }    
    else if (res.status === 402) {
      window.alert("Invalid Email Id, Please Use your Charusat Mail Id Only");
      console.log("Invalid Email Id");
      console.log(data);
    } else if (res.status === 422) {
      window.alert("Please Fill All details");
      console.log(data);
    } else {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
      console.log(data);
    }
  };

  return (
    <>
      <div className="outer-login-container">
        <div className="container login-container">
          <div className="card login-card">
            <div className="card-body">
              <div className="circle">circle</div>
              <header className="my-header text-center">
                <i className="fas fa-user"></i>
                <p>LOGIN AS FACULTY</p>
              </header>
              <form method="POST" className="login-form text-center">
                <div className="form-group my-0">
                  <input
                    type="email"
                    value={user.email}
                    onChange={handleInputs}
                    name="email"
                    placeholder="Email Address"
                    className="myInput"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <label htmlFor="" className="label-note">
                    We will never share your email with anyone
                  </label>
                </div>
                <div className="form-group my-0">
                  <input
                    type="password"
                    value={user.password}
                    onChange={handleInputs}
                    name="password"
                    placeholder="Password"
                    className="myInput"
                    id="exampleInputPassword1"
                  />
                </div>

                <button
                  type="submit"
                  onClick={PostData}
                  className="login-button"
                >
                  LOGIN
                </button>
                <div>
                  <Link to="/login" className="visit-link">
                    <i className="fas fa-angle-left"></i> Student ?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
