import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, getData] = useState([]);
  const fetchtop = async () => {
    const response = await fetch(
      `http://localhost:5000/api/chatCard/fetchalltopic`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    getData(data);
    if (data) {
      console.log("Topic fetch succesfully");
    } else {
      console.log("Topic fetch Failed");
    }
  };
  useEffect(() => {
    fetchtop();
  }, []);
  const mystyle = {
    marginLeft: "20px",
    font: "40px",
    cursor: "pointer",
    width: "360px",
  };
  return (
    <>
      {/* <tbody>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                    </tr>
                ))}
            </tbody> */}
      <div className="row my-3 text-center mx-auto d-flex justify-content-center">
        {data.map((item, i) => (
          <div className="col-md-5">
          <div id="t1" className="card mx-5 my-5" style={mystyle}>
            <button id="t2" className="btn1">
              {item.title}
            </button>
            <button id="t3" className="btn2">
              Message
            </button>
            <i id="t4" className="fa">
              &#xf1e0;
            </i>
            <video controls width="360">
              <source
                src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4#t=0.1"
                type="video/mp4"
              />
            </video>
            <div className="card-body">
              <Link id="t5" to="/chatting" className="">
                {item.description}
              </Link>
            </div>
          </div>
          </div>
        ))}
      </div>
      {/* <div id="t1" className="card mx-5 my-5" style={mystyle}>
          <button id="t2" className="btn1">
            Message
          </button>
          <button id="t3" className="btn2">
            Batting
          </button>
          <i id="t4" className="fa">
            &#xf1e0;
          </i>
          <video controls width="360">
            <source
              src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4#t=0.1"
              type="video/mp4"
            />
          </video>
          <div className="card-body">
            <Link id="t5" to="/chatting" className="">
              Best Batting Discussion Forum
            </Link>
          </div>
        </div> */}
    </>
  );
};

export default Home;
