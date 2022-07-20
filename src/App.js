import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Team from "./components/Team";
import Footer from "./components/Footer.js";
import Home from "./components/Home";
import Chatting from "./components/Chatting";
// import Map from "./components/Map";

const App = () => {

  return (
    <>
         <Router>
          <Navbar />
          {/* <Map /> */}
            <Switch>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/navbar">
              <Home />
              </Route>
              <Route exact path="/chatting">
              <Chatting />
              </Route>
              <Route exact path="/team">
              <Team />
              </Route>
            </Switch>
            <Footer />
        </Router>
    </>
  );
}

export default App;
