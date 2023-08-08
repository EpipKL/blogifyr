import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Logo from "../../img/png/logo-no-background.png";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Signup = ({ setForm }) => {
    const signupError = `There's been an issue creating your account please try again.`

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({ variables: { ...formState } });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="bg-white h-screen justify-center items-center flex flex-col">
      <img src={Logo} className="mb-10" alt="Blogifyr Logo" />
      <div className="bg-dark m-10 p-24 rounded-xl shadow-2xl">
        <h1 className="text-white text-4xl mb-5">Sign Up</h1>
        <form className="" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-white text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              className="text-sm rounded-lg block w-full p-2.5 "
              placeholder="Username"
              required
              value={formState.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-white text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="text-sm rounded-lg block w-full p-2.5"
              placeholder="Password"
              required
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <p className="text-white">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-accent underline"
                  onClick={() => setForm("login")}
                >
                  Log In
                </a>
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="text-white text-xl bg-primary rounded-xl w-full text-center p-5"
          >
            Sign Up
          </button>
        </form>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{signupError}</span>
        </div>
      )}
    </div>
  );
};

export default Signup;