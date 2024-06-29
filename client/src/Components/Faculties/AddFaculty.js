import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function AddFaculty() {

    const navigate = useNavigate();

    const callAddFacultyPage = async () => {
        try {
            const res = await fetch("/addFaculty", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);
            console.log(res.status);

            if (res.status === 300) {
                console.log(data.message);
                navigate('/dashboard')
            }
            if (res.status === 401) {
                console.log(data.message);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callAddFacultyPage();
    }, []);





    const colleges = ["CSPIT", "DEPSTAR", "OTHER"];
    const departments = ["CSE", "CE", "IT", "OTHER"];
    const roles = ["Faculty", "HOD", "Principal"];

    const [college, setCollege] = useState(colleges[0]);
    const [department, setDepartment] = useState(departments[0]);
    const [role, setRole] = useState(roles[0]);


    const [faculty, setFaculty] = useState({
        email: "",
        fname: "",
        lname: "",
        mobileNumber: "",
        shortName: "",
        password: "",
        cpassword: "",
        expertise: "",
        designation: "",
        linkedIn: "",
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setFaculty({ ...faculty, [name]: value });
    };


    const PostData = async (e) => {
        e.preventDefault();

        const {
            email,
            fname,
            lname,
            mobileNumber,
            shortName,
            password,
            cpassword,
            expertise,
            designation,
            linkedIn
        } = faculty;

        const res = await fetch("/addFaculty", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                fname,
                lname,
                mobileNumber,
                shortName,
                college,
                department,
                role,
                password,
                cpassword,
                expertise,
                designation,
                linkedIn
            }),
        });

        const data = await res.json();

        if (res.status === 200 && data) {
            window.alert("Faculty Added Successfully");
            console.log("Faculty added");
            console.log(data);
        } else if (res.status === 402) {
            window.alert("Invalid Email Id, Please Use Charusat Mail Id Only");
            console.log("Invalid Email Id");
            console.log(data);
        } else if (res.status === 422) {
            window.alert(data.message);
            console.log(data);
        } else if (res.status === 401) {
            window.alert("Mobile Number not valid");
            console.log(data);
        } else {
            window.alert("Invalid Registration");
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
                    Add Faculty to - SCHOLAR'S SHELF
                </h2>
                <div className="container">
                    <form method="POST">
                        <div className="details-form row">
                            <input
                                type="text"
                                id="fname"
                                className="form-control input-field"
                                placeholder="First Name"
                                name="fname"
                                value={faculty.fname}
                                onChange={handleInputs}
                            />
                            <input
                                type="text"
                                id="lname"
                                className="form-control input-field"
                                placeholder="Last Name"
                                name="lname"
                                value={faculty.lname}
                                onChange={handleInputs}
                            />
                            <input
                                type="email"
                                id="email"
                                className="form-control input-field"
                                placeholder="someone@charusat.ac.in"
                                name="email"
                                value={faculty.email}
                                onChange={handleInputs}
                            />
                            <input
                                type="text"
                                id="shortName"
                                className="form-control input-field"
                                placeholder="DJR - Dipak Ramoliya"
                                name="shortName"
                                value={faculty.shortName}
                                onChange={handleInputs}
                            />
                            <select
                                className="form-select input-field text-center col-lg-6"
                                id="collegSelect"
                                value={college}
                                onChange={e => setCollege(e.target.value)}>
                                {colleges.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="form-select input-field text-center col-lg-6"
                                id="selectDepartment"
                                value={department}
                                onChange={e => setDepartment(e.target.value)}>
                                {departments.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="form-select input-field text-center col-lg-6"
                                id="selectRole"
                                value={role}
                                onChange={e => setRole(e.target.value)}>
                                {roles.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                id="expertise"
                                className="form-control input-field"
                                placeholder="App development, web development etc..."
                                name="expertise"
                                value={faculty.expertise}
                                onChange={handleInputs}
                            />
                            <input
                                type="tel"
                                id="mobileNumber"
                                className="form-control input-field"
                                placeholder="Mobile Number"
                                name="mobileNumber"
                                value={faculty.mobileNumber}
                                onChange={handleInputs}
                            />
                            <input
                                type="text"
                                id="designation"
                                className="form-control input-field"
                                placeholder="Assitant Professor"
                                name="designation"
                                value={faculty.designation}
                                onChange={handleInputs}
                            />
                            <input
                                type="text"
                                id="linkedIn"
                                className="form-control input-field"
                                placeholder="https://linkedin.com/your_profile"
                                name="linkedIn"
                                value={faculty.linkedIn}
                                onChange={handleInputs}
                            />
                            <input
                                type="password"
                                id="password"
                                className="form-control input-field"
                                placeholder="Password"
                                name="password"
                                value={faculty.password}
                                onChange={handleInputs}
                            />

                            <input
                                type="password"
                                id="cpassword"
                                className="form-control input-field"
                                placeholder="Confirm Password"
                                name="cpassword"
                                value={faculty.cpassword}
                                onChange={handleInputs}
                            />
                            <div className="form-field col-lg-12">
                                <button
                                    type="submit"
                                    onClick={PostData}
                                    className="login-button"
                                >
                                    Add Faculty
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
