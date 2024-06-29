import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Projectpage from "./Components/Projects/Projectpage";
import Forum from "./Components/Forum/Forum";
import AboutUs from "./Components/AboutUs/AboutUs";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProjectUploader from "./Components/Projects/ProjectUploader";
import Logout from "./Components/Logout/Logout";
import UserProfile from "./Components/UserProfile/UserProfile";
import VerifyOtp from "./Components/Register/VerifyOtp";
import ContactUs from "./Components/ContactUs/ContactUs";
import JoinCommunity from "./Components/JoinCommunity/JoinCommunity";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import SubjectDisplay from "./Components/Materials/SubjectDisplay";
import SubjectMaterials from "./Components/Materials/SubjectMaterials";
import MaterialCards from "./Components/Materials/MaterialCards";
import MaterialUpload from "./Components/Materials/MaterialUpload";
import ForumPost from "./Components/Forum/ForumPost";
import Pagenf from "./Components/Page_not_found/Pagenf";
import MyForums from "./Components/loginUserForum/MyForums";
import AddFaculty from "./Components/Faculties/AddFaculty";
import DashBoard from "./Components/Faculties/DashBoard";
import FacultyLoginPanel from "./Components/Faculties/FacultyLoginPanel";
import FacultyNavbar from "./Components/Faculties/FacultyNavbar";
// import Footer from "./Components/Footer/Footer";
// import Home from "./Components/home/Home";
// import Footer from "./Components/Footer/Footer";

export const UserContext = createContext();

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let isFaculty = false;
  let faculty = window.localStorage.getItem('facultyrole');
  let isLoggedIn = window.localStorage.getItem('isLoggedIn') === 'true';
  if (faculty === 'Faculty' || faculty === 'HOD' || faculty === 'Principal'){
    isFaculty = true;
  }
  if(isLoggedIn === false)
  {
    isFaculty = false;
  }
  let navbar = (isFaculty) ? <FacultyNavbar/> : <Navbar/>;
  // if(isLoggedIn === false)
  // {
  //   navbar = <Navbar/>;
  // }
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        {/* React Router Fix */}
        <Router>
          <Navbar />

          {/* This line is the main navbar but temporary commenting it  */}
          {/* {navbar} */}
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            {/* needs to change below line just temporary added  */}
            <Route path="/ḥome" element={<Homepage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/join" element={<JoinCommunity />} />
            <Route path="/Projects" element={<Projectpage />} />
            <Route path="/Materials" element={<SubjectDisplay />} />
            <Route path="/SubjectMaterials" element={<SubjectMaterials />} />
            <Route path="/MaterialCards" element={<MaterialCards />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyOtp" element={<VerifyOtp />} />
            <Route path="/5bwghty" element={<ProjectUploader />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/mat4pl" element={<MaterialUpload />} />
            <Route exact path="/forum/:id" element={<ForumPost />} />
            <Route path="/myProfile" element={<UserProfile />} />{" "}
            {/* temporary added after remove it */}
            <Route path="/myForums" element={<MyForums />} />{" "}
            {/* temporary added after remove it */}
            <Route path="/*" element={<Pagenf />} />
            <Route path="/addFaculty" element={<AddFaculty />} />{" "}
            {/* temporary added after remove it */}
            <Route path="/adminlogin" element={<FacultyLoginPanel />} />{" "}
            {/* temporary added after remove it */}
            <Route path="/dashboard" element={<DashBoard />} />{" "}
            {/* temporary added after remove it */}
            {/* <Route path="/home" element={<Home />} /> */}
          </Routes>
        </Router>

        {/* Temporarily commented footer but need to include in the pages individually */}
        {/* <Footer />   */}
      </UserContext.Provider>
    </>
  );
}
export default App;
