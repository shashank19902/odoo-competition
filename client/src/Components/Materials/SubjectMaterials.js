import React, { useState, useEffect } from "react";
import "./SubjectMaterials.css";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import MaterialCards from "./MaterialCards";
// eslint-disable-next-line
import { NavLink, Link } from "react-router-dom";

function SubjectMaterials(props) {
  const [subjectList, setsubjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  const subFunction = async () => {
    try {
      // eslint-disable-next-line
      const data = await Axios.get(
        "http://localhost:3001/materials"
      ).then((response) => {
        setsubjectList(response.data);
      });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    subFunction();
  }, []);

  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const filterData = subjectList.filter(
    (item) => item.mSubject === data.subject_name,
  );

  const others = filterData.filter((item) => item.mType === "others");
  const cm = filterData.filter((item) => item.mType === "cm");
  const pf = filterData.filter((item) => item.mType === "pf");
  const em = filterData.filter((item) => item.mType === "em");

  return (
    <div>
      {/* <h1 className=" display-4 sname">{data.subject_name}</h1>
      <h6 className="text-center fname">Database Management System</h6> */}
      <div class="container nine mb-3">
        <h1>
          {data.subject_name}
          <div className="fname-part">
            <p className=" fullform text-center">{data.fname}</p>
          </div>
        </h1>
      </div>
      <div>
        <div className="container tabset">
          {/* Tab 1 */}
          <input
            className="active"
            type="radio"
            name="tabset"
            id="tab1"
            aria-controls="cm"
            defaultChecked="true"
          />
          <label htmlFor="tab1">Class Materials</label>
          {/* Tab 2 */}
          <input type="radio" name="tabset" id="tab2" aria-controls="pf" />
          <label htmlFor="tab2">Practical Files</label>
          {/* Tab 3 */}
          <input type="radio" name="tabset" id="tab3" aria-controls="em" />
          <label htmlFor="tab3">Exam Materials</label>
          {/* Tab 4 */}
          <input type="radio" name="tabset" id="tab4" aria-controls="others" />
          <label htmlFor="tab4">Others</label>

          {/*  */}
          {loading ? (
            <div className="tab-panels">
              <section id="cm" className="tab-panel">
                <div className="container">
                  {cm.length === 0 ? (
                    <div className="text-center materials-not-found">
                      <h4>
                        Sorry! Currently there are no materials available for
                        this section.
                      </h4>
                    </div>
                  ) : (
                    <table className="text-center headings" id="demotable">
                      <tr>
                        <td>Materials</td>
                        <td>Faculty</td>
                        <td>Department</td>
                      </tr>
                    </table>
                  )}
                </div>

                {cm.map((val, key) => {
                  return (
                    <div key={key}>
                      <MaterialCards
                        mName={val.mName}
                        mSubject={val.mSubject}
                        mType={val.mType}
                        mUrl={val.mUrl}
                        mAuthor={val.mAuthor}
                        Department={val.Department}
                        Semester={val.Semester}
                      />
                    </div>
                  );
                })}
              </section>
              <section id="pf" className="tab-panel">
                <div className="container">
                  {cm.length === 0 ? (
                    <div className="text-center materials-not-found">
                      <h4>
                        Sorry! Currently there are no materials available for
                        this section.
                      </h4>
                    </div>
                  ) : (
                    <table className="text-center headings" id="demotable">
                      <tr>
                        <td>Materials</td>
                        <td>Faculty</td>
                        <td>Department</td>
                      </tr>
                    </table>
                  )}
                </div>

                {pf.map((val, key) => {
                  return (
                    <div key={key}>
                      <MaterialCards
                        mName={val.mName}
                        mSubject={val.mSubject}
                        mType={val.mType}
                        mUrl={val.mUrl}
                        mAuthor={val.mAuthor}
                        Department={val.Department}
                        Semester={val.Semester}
                      />
                    </div>
                  );
                })}
              </section>
              <section id="em" className="tab-panel">
                <div className="container">
                  {em.length === 0 ? (
                    <div className="text-center materials-not-found">
                      <h4>
                        Sorry! Currently there are no materials available for
                        this section.
                      </h4>
                    </div>
                  ) : (
                    <table className="text-center headings" id="demotable">
                      <tr>
                        <td>Materials</td>
                        <td>Author</td>
                        <td>Department</td>
                      </tr>
                    </table>
                  )}
                </div>

                {em.map((val, key) => {
                  return (
                    <div key={key}>
                      <MaterialCards
                        mName={val.mName}
                        mSubject={val.mSubject}
                        mType={val.mType}
                        mUrl={val.mUrl}
                        mAuthor={val.mAuthor}
                        Department={val.Department}
                        Semester={val.Semester}
                      />
                    </div>
                  );
                })}
              </section>
              <section id="others" className="tab-panel">
                <div className="container">
                  {others.length === 0 ? (
                    <div className="text-center materials-not-found">
                      <h4>
                        Sorry! Currently there are no materials available for
                        this section.
                      </h4>
                    </div>
                  ) : (
                    <table className="text-center headings" id="demotable">
                      <tr>
                        <td>Materials</td>
                        <td>Author</td>
                        <td>Department</td>
                      </tr>
                    </table>
                  )}
                </div>

                {others.map((val, key) => {
                  return (
                    <div key={key}>
                      <MaterialCards
                        mName={val.mName}
                        mSubject={val.mSubject}
                        mType={val.mType}
                        mUrl={val.mUrl}
                        mAuthor={val.mAuthor}
                        Department={val.Department}
                        Semester={val.Semester}
                      />
                    </div>
                  );
                })}
              </section>
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
      </div>
    </div>
  );
}

export default SubjectMaterials;
