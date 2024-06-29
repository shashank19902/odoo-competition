import React from "react";
import "./Pagenf.css";

function Pagenf() {
  return (
    <section className="container-fluid error-page">
      <div className="container my-5 p-4 shadow text-center error-page-container" style={{background: "#1b9cfc", borderRadius: "40px"}}>
        <h1 className="display-1 py-2" style={{fontWeight: "bold", color: "white"}}>ERROR : 404</h1>
        <h3>OOPS! PAGE NOT FOUND</h3>
        <h5>The page you were looking for was not found</h5>
      </div>
    </section>
  );
}
export default Pagenf;
