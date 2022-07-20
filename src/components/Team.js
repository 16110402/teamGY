import React from 'react'

const Team = () => {
  return (
    <>
    <div className="container-fluid my-3">
    <img src="./img/6.jpg" alt="Snow" className="w-100"/>
    <div style={{"marginTop":"300px"}} className="centered">
    <ul className="cont">
    <li className="con">WELCOME TO YOUR ACADEMY</li>
    <li className="con1">MAKE YOURSELF FOR YOUR COUNTRY</li>
    <a href="training.html"><li><button type="button" id="bt1" className="btn btn-light">Get Started</button></li></a>
    </ul>
    </div>
    </div>
    <div className="container" id="up-car1">
    <div className="card" id="up-car">
    <img src="./img/5.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
    <div className="container text-center my-5">
    <h3>Select Your District And Place </h3>
    <form action="" method="post">
  <div className="mb-3">
    <label for="district" className="form-label">District</label>
    <input type="text" className="form-control" id="disrict" name="district" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="nearground" className="form-label">Nearest Ground</label>
    <input type="text" className="form-control" id="nearground" name="nearground"/>
  </div>
  <div className="mb-3">
    <label for="distance" className="form-label">Nearest Ground</label>
    <input type="number" className="form-control" id="distance" name="distance"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className="alert alert-warning alert-dismissible fade show my-5" role="alert">
      <strong>Need Login!</strong> You are not logged in.Please login for discussion.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Team