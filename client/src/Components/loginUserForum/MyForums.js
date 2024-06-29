import React, { useState, useEffect } from "react";
import Forums from "../Forum/Forums";
import { useNavigate } from "react-router";

export default function MyForums() {
  const [myForums, setMyForums] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const callMyForumsPage = async () => {
    try {
      const res = await fetch("/myForums", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setMyForums(data);

      setLoading(true);

      if (!res.status === 200 || !data) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  console.log(myForums);

  useEffect(() => {
    callMyForumsPage();
  }, []);

  return (
    <div>
      <br />
      <h2 className="text-center">
        <b>Your Uploaded Forums</b>
      </h2>
      <hr />
      {loading ? (
        <div className="container">
          <div className="row ">
            {myForums.map((val, key) => {
              return (
                <>
                  <Forums
                    title={val.title}
                    description={val.description}
                    id1={val._id}
                  />
                  <hr />
                </>
              );
            })}
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
