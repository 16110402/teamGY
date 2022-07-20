import React from "react";
import { useState,useEffect } from "react";
import Alert from "./Alert";

const Chatting = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },4000);
  }
  const [credentials, setCredentials] = useState({comment: ""})
  const [thread, setThread] = useState([])
  const [detail, setDetail] = useState({})
  // let history = useHistory();
  const fetchthread = async () => {
    const tok1 = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/chatCard/fetchallthread`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'auth-token': tok1,
        },
      }
    );
    const json = await response.json();
    const data = json.thread;
    console.log(data);
    setThread(data);
    setDetail(json.obj)
    // getData(data);
    if (data) {
      console.log("thread fetch succesfully");
    } else {
      console.log("thread fetch Failed");
    }
  };
  const handleSubmit = async (e) =>{  
      e.preventDefault();
         const tok1 = localStorage.getItem("token");
          const response = await fetch(`http://localhost:5000/api/chatCard/addthreads`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': tok1,
            },
            body: JSON.stringify({comment: credentials.comment}) 
          });
          const json = await response.json();
          if(json){
              // save the auth and redirect
              showAlert("Message Submitted Successfully","success");
              // console.log(json.comment);
              // history.push("/");
          }
          else
          {
            showAlert("Invalid Message","danger")
            // console.log("Invalid Detail");
          }
  }
  const onChange = (e)=>
  {
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
    const mystyle = {
        borderRadius: "25px",
        background: "#73AD21",
        padding: "20px",
        width: "20%",
        height: "110px",
        position: "relative",
        animationName: "example",
        animationDuration: "4s",
        animationIterationCount: "infinite",
        alignItem: "center",
    };
    useEffect(() => {
      const toke = localStorage.getItem("token");
      if(toke)
        fetchthread();
    },[]);
  return (
    <>
    <div className="container">
    <hr className="my-4" />
    <div style={mystyle} id="uh" className="text-center">
            <h6 className="display-6"><b>Batting</b></h6>
            <p className="lead"><b>desc</b></p>
          </div>
          <hr className="my-4" />
    <marquee width="60%" direction="up" height="150px">
        <div className="jumbotron text-danger">
          <div className="clean">
            <ul type="disc">
              <li>
                This is perr to peer forum for sharing knowledge with each
                other.
              </li>
              <li>No Spam / Advertising / Self-promote in the forums. ...</li>
              <li>Do not post copyright-infringing material. ...</li>
              <li>Do not post “offensive” posts, links or images. ...</li>
              <li>Do not cross post questions. ...</li>
              <li>Do not PM users asking for help. ...</li>
              <li>Remain respectful of other members at all times</li>
            </ul>
          </div>
        </div>
</marquee>
</div>
      {/* form to ask question to any player */}
      {Object.keys(thread).length!=0 ?
      (
      <form onSubmit={handleSubmit}>
        <div className="mb-3 container">
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
    <input type="text" className="form-control" id="comment" onChange={onChange} name="comment"/>
          </div>
          <button type="submit" className="btn btn-success">
            Post Comment
          </button>
        </div>
      </form>):
      (
        <h4>Login for chat</h4>
      )
      }
      <Alert alert={alert}/>
      <div style={{"backgroundColor":"#F7CAC9"}} className="my-5">
      {Object.keys(thread).length!=0 ?
      (
        thread.map((item, i) => (
          <div style={{"backgroundColor":"blue","marginLeft": "100px"}} className="col-md-2">
          <div className="card mx-5 my-5 text-center">
            <h3 style={{"color":"red"}}>{detail.name}</h3>
            <h5>{item.comment}</h5>
            <p>{detail.date}</p>
          </div>
          </div>
        ))):
        (
          <h3>Login Please</h3>
        )
      }
        </div>
    </>
  );
};

export default Chatting;
