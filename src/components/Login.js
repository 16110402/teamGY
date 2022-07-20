import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';

const Login = (props) => {
 
  const [credentials, setCredentials] = useState({signupEmail: "", password:""})
    let history = useHistory();
    const handleSubmit = async (e) =>{
        e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({signupEmail: credentials.signupEmail,password: credentials.password}) 
            });
            const json = await response.json();
            const mail = json.mail;
            // console.log(json.mail);
            if(json)
            {
                // save the auth and redirect
                localStorage.setItem('token', json.authtoken);
                props.toggle(mail);
                props.showAlert("Logged in Successfully","success");
                history.push("/");
            }
            else
            {
              props.toggle();
              props.showAlert("Invalid Details","danger")
            }
    }
    const onChange = (e)=>
    {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const close = () => {
      props.toggle("");
    }
  return (
    <> 
    <div className="modal">
            <Modal
                isOpen={ props.isOpen }
                contentLabel="Example Modal" >
                  <div className="d-flex justify-content-center">
                  <form onSubmit={handleSubmit}>
                  {/* <Alert alert={alert}/> */}
                  <h1 className="text-center">Login Form</h1>
                  <div className="text-center my-3">
                  <img src="/img/3.jpg" alt="Person" width="96" height="96"/>
                  </div>
  <div className="mb-3">
    <label htmlFor="signupEmail" className="form-label">Login Email</label>
    <input type="email" className="form-control" id="signupEmail" onChange={onChange} name="signupEmail" aria-describedby="signupEmailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} name="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
  </form>
  </div>
      <button className="btn btn-danger text-center" onClick={close}>close</button>
      
            </Modal>  
        </div> 
    </>
  )
}

export default Login