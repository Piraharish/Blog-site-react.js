import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import WriteLogo from "../img/write.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>HOME</h6>
          </Link>
          <div className="user-dropdown">
            <div className="username" onClick={toggleDropdown}>
              <h6>CATEGORY</h6>
            </div>
            {isDropdownOpen && (
            <div className="dropdown-menu">
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
            </div>
            )}
          </div>
          <Link className="link" to="/">
            <h6>ABOUT</h6>
          </Link>
          <Link className="link" to="/">
            <h6>CONTACT</h6>
          </Link>
          {currentUser ? (
            <>
            <div className="user-dropdown">
              <div className="username" onClick={toggleDropdown}>
                <h6>{currentUser.username}</h6>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <span>
                    <Link className="link" to="/profile">
                      <h6>Profile</h6>
                    </Link>
                  </span>
                  <span>
                    <Link className="link" to="/MyPosts">
                      <h6>Posts</h6>
                    </Link>
                  </span>
                  <span>
                    <Link className="link" to="/drafts">
                      <h6>Drafts</h6>
                    </Link>
                  </span>
                  <span onClick={logout}>
                    <h6>LOGOUT</h6>
                  </span>
                </div>
              )}
            </div>
              <span className="write">
                <Link className="logo" to="/write">
                  <img src={WriteLogo} alt="Write" />
                </Link>
              </span>
            </>
          ) : (
            <div className="links">
              <Link className="link" to="/login">
                <h6>LOGIN</h6>
              </Link>
              <Link className="link" to="/register">
                <h6>REGISTER</h6>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
