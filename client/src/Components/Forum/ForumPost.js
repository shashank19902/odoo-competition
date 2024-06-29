import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, useParams } from "react-router";

function ForumPost() {
  const [forumList, setForumList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/forums/" + forumId).then((response) => {
      setForumList(response.data);
    });
    Axios.get("http://localhost:3001/forumPost").then((response) => {
      setCommentList(response.data);
    });
  }, []);

  // console.log(forumList);
  // console.log(commentList);
  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const forumId = data.forumId;

  const filterData = forumList.filter((item) => item._id === data.forumId);
  console.log(filterData);

  const filterComment = commentList.filter((item) => item.forumId === forumId);
  console.log(filterComment);

  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState("");
  const [disabled, setDisabled] = useState(false);

  const addComment = () => {
    setCommenting(true);
    setDisabled(true);
  };

  const cancelComment = () => {
    setCommenting(false);
    setDisabled(false);
  };

  const handleInput = (e) => {
    let value = e.target.value;
    setComments(value);
  };

  const PostData = async (e) => {
    e.preventDefault();

    const comment = comments;
    console.log(comment);

    const res = await fetch("/forumPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        forumId,
      }),
    });
    console.log(res);

    const data = await res.json();
    console.log(data);

    if (res.status === 200 && data) {
      window.alert("Comment added Successfully");
      console.log("Comment added Successfully");
      cancelComment();
    } else {
      window.alert("Error Occured in adding your Comment");
      console.log("Error Occured in adding your Comment");
    }
  };

  return (
    <div>
      <div>
      <h2 className="text-center my-3">
              <b>Reply this Forum</b>
            </h2>
        {/* {filterData.map((val, key) => { */}
          {/* return ( */}
            <div className="container">
              <div className="details-form card shadow px-2 py-4 row">
                <div className="form-field col-lg-12">
                  <input
                    type="text"
                    disabled
                    className="input-text"
                    id="title"
                    name="title"
                    value={forumList.title}
                  />
                  <label htmlFor="title" className="label">
                    Problem Title
                  </label>
                </div>
                <div className="form-field col-lg-12">
                  <input
                    type="text"
                    disabled
                    className="input-text"
                    id="description"
                    name="description"
                    value={forumList.description}
                  />
                  <label htmlFor="description" disabled className="label">
                    Problem Description
                  </label>
                </div>
                <div className="row">
                  <div className="form-field col-lg-6">
                    <input
                      type="text"
                      disabled
                      className="input-text"
                      id="uploadedby"
                      name="uploadedby"
                      value={forumList.uploadedBy}
                    />
                    <label htmlFor="uploadedby" disabled className="label">
                      Uploaded By
                    </label>
                  </div>
                  <div className="form-field col-lg-6">
                    <input
                      type="text"
                      disabled
                      className="input-text"
                      id="uploadDate"
                      name="uploadDate"
                      // value={forumList.created.split("T")[0]}
                      value={forumList.created}
                    />
                    <label htmlFor="uploadDate" disabled className="label">
                      Uploaded Date
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={addComment}
                className="login-button col-lg-3"
                disabled={disabled}
              >
                Add Comments
              </button>
            </div>
          {/* ); */}
        {/* })} */}

        {commenting ? (
          <>
            <hr />
            <h2 className="text-center my-3">
              <b>Add comment</b>
            </h2>
            <div className="container">
              <div className="card shadow">
                <div className="card-body">
                  <form method="POST">
                    <div className="mb-3">
                      <input
                        type="textarea"
                        className="comment-input"
                        id="comment"
                        style={{
                          width: "100%",
                          outline: "none",
                          border: "none",
                          borderBottom: "2px solid #001972",
                          padding: "10px 0",
                        }}
                        aria-describedby="comment"
                        placeholder="Enter your comment"
                        value={comments}
                        onChange={handleInput}
                      />
                    </div>

                    <button
                      type="submit"
                      className="login-button"
                      onClick={PostData}
                    >
                      Add
                    </button>
                    <button
                      type="submit"
                      className="login-button float-end"
                      onClick={cancelComment}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <hr />
        <h2 className="text-center">
          <b>Comments</b>
        </h2>
        <br />
        <div className="container">
          <div className="card shadow">
            <div className="card-body">
              {filterComment.map((val, key) => {
                return (
                  <>
                    <div
                      className="comments px-2 "
                      style={{
                        background: "#fff",
                      }}
                    >
                      <div key={key}>
                        <div
                          style={{
                            margin: "5px 0",
                            fontSize: "17px",
                            color: "#787878",
                            fontWeight: "900",
                          }}
                        >
                          <i
                            className="fas fa-user p-2"
                            style={{
                              background: "#001972",
                              marginRight: "10px",
                              color: "white",
                              borderRadius: "50%",
                            }}
                          ></i>
                          {val.commentedBy}
                        </div>
                        <p style={{ fontSize: "20px", fontWeight: "400" }}>
                          {val.comment}
                        </p>
                        <div
                          style={{
                            fontSize: "15px",
                            color: "#787878",
                            fontWeight: "400",
                          }}
                        >
                          {val.commentedOn.split("T")[0]}
                        </div>
                      </div>
                      <hr className="form-horizontal" />
                    </div>
                    <br />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPost;
