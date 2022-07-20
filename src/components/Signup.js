import React, {useState} from 'react';
import Modal from 'react-modal';
// import { useHistory} from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"",signupEmail: "", district:"", place:"", nearground:"", distance:0 ,password:"",confirmpassword:""})
  // let history = useHistory()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name, signupEmail, district,place,nearground,distance, password, confirmpassword}=credentials;
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name, signupEmail, district, place, nearground, distance, password, confirmpassword}) 
            });
            const json = await response.json()
            console.log(json.success);
            if(json.success){
              // save the auth token and redirect
              localStorage.setItem('token', json.authtoken);
              props.toggle();
              // history.push("/")
              props.showAlert({name}, "Account created Successfully","success");
            }
            else
            {
              props.toggle();
              props.showAlert("Invalid Credentials","danger");
              // alert("Invalid credential");
            }
    }
    const onChange = (e)=>
    {
        // setCredentials({name:"e.target.name" , district:"e.target.email", place:"e.target.district", nearground:"e.target.nearground", distance:"e.target.distance" ,password:"e.target.password",confirmpassword:"e.target.confirmpassword"})
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <> 
    <div className="modal">
    
            <Modal
                isOpen={ props.isOpen }
                contentLabel="Example Modal" >
                  <div className="d-flex justify-content-center">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex">
                   <div className="d-inline-block">
                  <marquee width="80%" direction="left" height="60px">
                    <h4>Click here to know the distance to your ground from your house</h4>
                    </marquee>
                    </div>
                    <div className="d-inline-block">
                    <button type="submit" className="btn btn-success">Click Here</button>
                    </div>
                    </div>
                  <h1 className="text-center">Signup Form</h1>
                  <div className="text-center my-3">
                  <img src="/img/2.jpg" alt="Person" width="100" height="100"/>
                  </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" onChange={onChange} id="name" name="name"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signupEmail" className="form-label">Email address</label>
                      <input type="email" className="form-control" onChange={onChange} id="signupEmail" name="signupEmail"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="district" className="form-label">District</label>
                      <input type="text" className="form-control" id="district" onChange={onChange} name="district"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nearground" className="form-label">Near Ground</label>
                      <input type="text" className="form-control" id="nearground" onChange={onChange} name="nearground"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="place" className="form-label">Place</label>
                      <input type="text" className="form-control" id="place" onChange={onChange} name="place"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="distance" className="form-label">Distance</label>
                      <input type="number" className="form-control" id="distance" onChange={onChange} name="distance"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" onChange={onChange} name="password"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmpassword" onChange={onChange} name="confirmpassword"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                    </div>
      <button className="btn btn-danger text-center" onClick={props.toggle}>close</button>
            </Modal>  
        </div> 
    </>
  )
}

export default Signup