import React, { useState, useEffect } from "react";
import Signup from "./Signup.js";
// import Home from "./Home.js";
import { Link } from "react-router-dom";
import Login from "./Login.js";
import Alert from "./Alert";
import { useHistory} from 'react-router-dom'

const Navbar = () => {

  const [alert, setAlert] = useState(null);
  const [email_id, setEmail_id] = useState("");
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },4000);
  }
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };
  const [showModalLogin, setShowModalLogin] = useState(false);
  const toggleModalLogin = (mail) => {
    if (showModalLogin) {
      // setEmail_id(mail);
      localStorage.setItem('mail', mail);
      let ml = localStorage.getItem("mail");
      if(ml)
        setEmail_id(ml);
      setShowModalLogin(false);
    } else {
      setShowModalLogin(true);
    }
  };
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main1").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main1").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  };
  const mystyle = {
    marginLeft: "20px",
    font: "40px",
    cursor: "pointer",
    width: "360px",
  };
  let history = useHistory();
  const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('mail');
    setEmail_id("");
    history.push("/");
    toggleModalLogin();
  }
  useEffect(() => {
    let ml = localStorage.getItem("mail");
    if(ml)
       setEmail_id(ml);
    history.push("/");
  }, [])
  return (
    <>
      <div id="main1">
        <nav className="nav nav-pills nav-fill justify-content-center">
          <div id="mySidenav" className="sidenav">
            <Link
              to="javascript:void(0)"
              className="closebtn"
              onClick={closeNav}
            >
              &times;
            </Link>
            <Link to="/">About</Link>
            <Link to="/">Services</Link>
            <Link to="/">Clients</Link>
            <Link to="/">Contact</Link>
          </div>
          <div>
            <span style={mystyle} onClick={openNav}>
              &#9776; Menu
            </span>
          </div>
          <Link id="c1" className="nav-link" to="/navbar">
            CricketTrainy
          </Link>
          <Link id="c1" className="nav-link" to="/team">
            MakeTeam
          </Link>
          {email_id.length===0 ?
          (
          <p className="nav-link">
            are you member ?
            <button className="btn btn-primary" onClick={toggleModal}>
              Register
            </button>
            <Signup isOpen={showModal} toggle={toggleModal} showAlert={showAlert} /> /
            <button className="btn btn-primary" onClick={toggleModalLogin}>
              Login
            </button>
            <Login isOpen={showModalLogin} toggle={toggleModalLogin} showAlert={showAlert}/>
          </p>):
          ( 
            <>
            <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
          </>)}
          {
            <div style={{"backgroundColor": "yellow","border-radius": "10px","fontFamily": "bold"}} className="card mx-3 text-center">
            <p className="my-2">{email_id}</p>
          </div>
          }
        </nav>
        <Alert alert={alert}/>
        <div className="container1">
          <img
            id="im"
            src="/img/1.png"
            alt="Person"
            width="100%"
            height="100%"
          />
          <div className="centered container-fluid">
            <h5 className="p2">Chat with Players</h5>
            <p className="p2">You can share problem with others</p>
            <Link to="/" className="p1 mx-2">
              <i className="fa fa-dribbble"></i>
            </Link>
            <Link to="/" className="p1 mx-2">
              <i className="fa fa-twitter"></i>
            </Link>
            <Link to="/" className="p1 mx-2">
              <i className="fa fa-linkedin"></i>
            </Link>
            <Link to="/" className="p1 mx-2">
              <i className="fa fa-facebook"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
