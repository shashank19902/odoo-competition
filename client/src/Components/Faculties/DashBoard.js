import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import FacultyNavbar from './FacultyNavbar'


export default function DashBoard() {

    const navigate = useNavigate();

    const callDashBoard = async () => {
        try {
            const res = await fetch("/dashboard", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 401) {
                console.log(data.message);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callDashBoard();
    }, []);

    return (
        <>
            <div>DashBoard</div>
        </>
    )
}
