import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";

const Logout = () => {

  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  const navigate = useNavigate();
  // promises

  useEffect((req, res) => {
    fetch('/logout', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => {

      if (res.status === 200) {
        dispatch({ type: "USER", payload: false });
        window.localStorage.setItem("isLoggedIn", false);
        navigate('/login', { replace: true });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch((err) => {
      console.log(err);
    })
  });


  return (
    <div>Logging you out...</div>
  )
}

export default Logout