import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Forum.css";
import Axios from "axios";
import Forums from "./Forums";

export default function Forum() {
  const navigate = useNavigate();

  const callForumPage = async () => {
    try {
      const res = await fetch("/forum", {
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

      if (res.status !== 200 || !data) {
        console.log(data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callForumPage();
  }, []);

  // getting PostList

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    // Axios.get("https://scholarshelf-backend.herokuapp.com/forums").then((response) => {
    Axios.get("http://localhost:3001/forums").then((response) => {
      setPostList(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  console.log(postList);

  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setPost({ ...post, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { title, description } = post;
    console.log(title);
    console.log(description);
    console.log(post);

    const res = await fetch("/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    console.log(res);

    const data = await res.json();
    console.log(data);

    if (res.status === 200 && data) {
      window.alert("Forum added Successfully");
      console.log("Forum added Successfully");
      setPost({
        title: "",
        description: "",
      })
    } else {
      window.alert("Error Occured in Forum");
      console.log("Error Occured in Forum");
    }
  };

  return (
    <div className="container my-3 text-center">
      <h3>Forum</h3>
      <div className="container">
        <div className="card shadow mx-0">
          <div className="card-body">
            <form className="container" method="POST">
              <div className="input-group forum-inputs">
                <input
                  type="text"
                  placeholder="Problem Title"
                  className="form-control  problem-title"
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleInputs}
                />
              </div>
              <div className="input-group forum-inputs">
                <textarea
                  placeholder="Problem Description"
                  aria-label="With textarea"
                  className="form-control problem-description"
                  id="description"
                  name="description"
                  value={post.description}
                  onChange={handleInputs}
                ></textarea>
              </div>
              <button type="submit" className="login-button" onClick={PostData}>
                Start Discussion
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
      <hr />

      <div className="home">
        <div className="container my-3">
          <h2 style={{fontWeight: "bold"}}>Ongoing Discussions</h2>
          <div className="row ">
            {postList.map((val, key) => {
              return (
                <Forums
                  key={key}
                  title={val.title}
                  description={val.description}
                  id1={val._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
