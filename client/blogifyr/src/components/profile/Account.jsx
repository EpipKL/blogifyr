import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Spinner from "../shared/Spinner";

import Auth from "../../utils/auth";
import NotFound from "../NotFound";

const Account = ({ username }) => {
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.user || null;

  if (!user) {
    return document.location.assign('/error/not-found');
  }

  const getSiteValue = (name) => {
    const index = user.profile.sites.findIndex(
      (element) => element.name === name
    );

    if (index === -1) {
      return "";
    } else {
      return user.profile.sites[index].url;
    }
  };

  return (
    <div className="bg-white h-screen w-screen">
      <div className="flex justify-between items-center">
        <div className="flex flex-col m-5 items-center">
          <div className="p-20 rounded-full bg-gray"></div>
          <h1 className="text-dark text-4xl font-bold">
            {user.profile.fullName ? user.profile.fullName : user.username}
          </h1>
        </div>

        <div className="flex flex-col m-5 text-center">
          <div>
            <label
              htmlFor="twitter"
              className="block text-sm font-medium leading-6 text-dark"
            >
              <i className="fa-brands fa-twitter"></i> Twitter / X
            </label>
            <label
              type="text"
              name="TWITTER_X"
              htmlFor="twitter"
              className="block w-full border-primary border-solid border-2 rounded-full p-1"
              placeholder="@username"
            >
              {getSiteValue("TWITTER_X")}
            </label>
          </div>
          <div>
            <label
              htmlFor="facebook"
              className="block text-sm font-medium leading-6 text-dark"
            >
              <i className="fa-brands fa-facebook"></i> Facebook
            </label>
            <label
              type="text"
              name="FACEBOOK"
              htmlFor="facebook"
              className="block w-full border-primary border-solid border-2 rounded-full p-1"
              placeholder="@username"
            >
              {getSiteValue("FACEBOOK")}
            </label>
          </div>
          <div>
            <label
              htmlFor="instagram"
              className="block text-sm font-medium leading-6 text-dark"
            >
              <i className="fa-brands fa-instagram"></i> Instagram
            </label>
            <label
              type="text"
              name="INSTAGRAM"
              htmlFor="instagram"
              className="block w-full border-primary border-solid border-2 rounded-full p-1"
              placeholder="@username"
            >
              {getSiteValue("INSTAGRAM")}
            </label>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col justify-center items-center">
        <h1 className="text-dark text-4xl font-bold underline">About Me</h1>
        <div className="container">
          <label
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-primary border-2 mt-2 "
          >
            {user.profile.aboutMe}
          </label>
        </div>
      </div>

      <div className="flex justify-end mr-5 mt-5">
        <button
          className=" text-white text-md bg-dark py-5 px-10 font-bold rounded-full"
          onClick={() => Auth.logout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Account;
