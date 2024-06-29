import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function VerifyOtp() {

    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const PostData = async (e) => {
        e.preventDefault();

        const userId = location.state.userId;
        const email = location.state.email;
        const role = location.state.role;
    
        const res = await fetch("/verifyOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId, otp, role
          }),
        });
    
        const data = await res.json();
    
        if (res.status === 200 && data) {
          window.alert("Account Verified Successfully");
          console.log("Account Verified Successfully");
          console.log(data);
    
          navigate("/login");
        } else if (res.status === 400) {
          window.alert(data.message);
          console.log(data);
        } else {
          window.alert("Invalid Registration");
          console.log("Invalid Registration");
          console.log(data);
        }
      };




    return (
        <div className='text-center'>
            <form action="POST">
                <div className="container">
                    <label htmlFor="inputPassword5" className="form-label">OTP</label>
                    <input type="password" id="otp" name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className="form-control" aria-describedby="passwordHelpBlock" />
                    <div id="otpTextMenu" className="form-text">
                        Enter your OTP
                    </div>
                    <button className="btn btn-primary" onClick={PostData}>Verify</button>
                </div>
            </form>
        </div>
    )
}
