import React, { useState } from "react";
// import {  } from 'react-router-dom';
import Signup from "./Signup";
import Login from "./Login";

import Auth from "../../utils/auth";

const AuthPage = () => {
  const [formToggler, setFormToggler] = useState("login");

  if (Auth.loggedIn()) {
    window.location.assign("/me");
    return;
  }

  return (
    <>
      {formToggler === "login" ? (
        <Login setForm={setFormToggler} />
      ) : (
        <Signup setForm={setFormToggler} />
      )}
    </>
  );
};

export default AuthPage;
