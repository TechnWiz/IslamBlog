import React, { useEffect, useState } from "react";
import "./NavBar.css";
import Logo from "../Images/Logo.svg";
import { Link } from "react-router-dom";
import { auth } from "../Config/FireBaseConfig";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link to="/">
          <img src={Logo} />
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <i className="ri-menu-line"></i>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isMenuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/write" className="nav-link">
                Write
              </Link>
            </li>
          </ul>
          {currentUser ? (
            <div className="navbar_author" style={{ marginTop: "10px" }}>
              <img src={currentUser.photoURL} alt="" />
            </div>
          ) : (
            <Link to="/auth">
              <button className="navbar_btn">LogIn</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;