import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Login.css";

export default function Login() {

  
  // eslint-disable-next-line
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const callLoginPage = async () => { 
    try {
      const res = await fetch("/login", {
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
    callLoginPage();
  }, []);


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

    const res = await fetch("/login", {
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
    console.log(data);

    if (res.status === 200 && data) {
      dispatch({ type: "USER", payload: true });
      window.localStorage.setItem("isLoggedIn", "true");
      window.localStorage.setItem("role", data.role);
      window.alert("Login completed");
      console.log("Login completed");
      navigate("/");
    }
    else if(res.status === 202){
      window.alert("Account not verified, verify to login by otp sent to your email id");
      navigate('/verifyOtp', {
        state:{
          userId: data.userData.userId,
          email: data.userData.email,
          role: "Student"
        }
      })
    }else if(res.status === 422){
      window.alert("Unknown Error Occured");
      navigate('/')
    }
    else {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    }
  };

  return (
    <div className="outer-login-container">
      <div className="container login-container">
        <div className="card login-card">
          <div className="card-body">
            <div className="circle">circle</div>
            <header className="my-header text-center">
              <i className="fas fa-user"></i>
              <p>LOGIN</p>
            </header>
            <form method="POST" className="login-form text-center">
              <div className="form-group my-0">
                <input
                  type="email"
                  className="myInput"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group my-0">
                <input
                  type="password"
                  className="myInput"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="form-group my-0">
                <label>
                  <button
                    className="login-button"
                    type="button"
                    onClick={PostData}
                  >
                    LOGIN
                  </button>
                </label>
              </div>
              <Link to="/adminlogin" className="visit-link">
                <i className="fas fa-angle-right"></i> Faculty ?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
