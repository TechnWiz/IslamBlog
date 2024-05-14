import React, { useState } from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
} from "../Config/FireBaseConfig";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      if (localStorage) {
        localStorage.setItem("isAuth", true);
      }
      setIsAuth(true);
      navigate("/");
    });
  };

  const signInWithFaceBook = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
      if (localStorage) {
        localStorage.setItem("isAuth", true);
      }
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Authentication</h2>
      <div className="social_auth text-center">
        <div className="socials">
          <i className="ri-google-fill" onClick={signInWithGoogle}></i>
          <i className="ri-facebook-fill" onClick={signInWithFaceBook}></i>
        </div>
      </div>
    </div>
  );
};

export default Login;