import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

import Auth from "../../utils/auth";
import MainContent from "../dashboard/MainContent";

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
