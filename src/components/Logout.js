import React from 'react'

const Logout = (props) => {

    // let history = useHistory();
    // const logdata = async () => {
    //   const tok1 = localStorage.getItem("token");
    //     const response = await fetch(
    //       `http://localhost:5000/api/auth/logout`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           // Accept: "application/json",
    //           'auth-token': tok1,
    //         },
    //       }
    //     );
    //     const res = await response.json();
    //     console.log("In logout page");
    //     if(res.status!=200)
    //         {
    //             // save the auth and redirect          
    //             props.showAlert("Invalid Details","danger")   
    //         }
    //         else
    //         {
    //             props.showAlert("Logged in Successfully","success");
    //             history.push("/"); 
    //         }
    //   };
    //   useEffect(() => {
    //     logdata();
    //   }, []);
  return (
    <div>Logout</div>
  )
}

export default Logout