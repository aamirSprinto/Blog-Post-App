import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import { AuthContext } from "../context/authContext";
import useAuth from '/Users/aamiryaseen/blog-app/client/src/components/autth.js';

import Logo from "../imgs/logo.avif";
const Navbar = () => {
 // const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={Logo}></img></Link>
            
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {/* {useAuth() ? (
              <span >LOGOUT</span>
                 ) : (
           <Link className="link" to="/login">
                   LOGIN
            </Link>
          )} */}

          <span className="write">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
