import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UPDATE_PROFILE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Account = () => {
  const [formState, setFormState] = useState({
    aboutMe: "",
    sites: [],
  });

  const { loading, data } = useQuery(QUERY_ME);
  const [updateProfile, { error, profileData }] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    if (data && data.me) {
      const userSites = data.me.profile.sites.map((item) => {
        return { name: item.name, url: item.url };
      });
      setFormState({
        aboutMe: data.me.profile.aboutMe,
        sites: userSites,
      });
    }
  }, [data]);

  const getSiteValue = (name) => {
    const index = formState.sites.findIndex((element) => element.name === name);

    if (index === -1) {
      return "";
    } else {
      return formState.sites[index].url;
    }
  };

  const handleAboutMeChange = (event) => {
    const { value } = event.target;

    setFormState({
      ...formState,
      aboutMe: value,
    });
  };

  const handleSitesChange = (event) => {
    const { name, value } = event.target;

    let updatedSites = [];

    const index = formState.sites.findIndex((element) => element.name === name);

    if (index === -1) {
      let updatedSite = { name, url: value };
      updatedSites = [...formState.sites];
      updatedSites.push(updatedSite);
    } else {
      let updatedSite = { ...formState.sites[index], url: value };
      updatedSites = [...formState.sites];
      updatedSites[index] = updatedSite;
    }

    setFormState({
      ...formState,
      sites: [...updatedSites],
    });
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateProfile({
        variables: { aboutMe: formState.aboutMe },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSitesSave = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await updateProfile({
        variables: { sites: formState.sites },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white-50 min-h-screen w-screen">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col m-5 items-center">
          {/* Image Placeholder */}
          <div className="p-12 rounded-full bg-gray-500 mb-4 md:mb-0"></div>

          <button className="bg-gray-500 text-sm text-dark-500 mt-2 p-3 font-bold rounded-xl">
            Select Avatar
          </button>
        </div>

        <div className="flex flex-col m-5 text-center">
          <div>
            <label
              htmlFor="twitter"
              className="block text-sm font-medium leading-6 text-dark-500"
            >
              <i className="fa-brands fa-twitter"></i> Twitter / X
            </label>
            <input
              type="text"
              name="TWITTER_X"
              htmlFor="twitter"
              className="block w-full border-primary-500 border-2 rounded-xl p-1"
              placeholder="@username"
              value={getSiteValue("TWITTER_X")}
              onChange={handleSitesChange}
            />
          </div>
          <div>
            <label
              htmlFor="facebook"
              className="block text-sm font-medium leading-6 text-dark-500"
            >
              <i className="fa-brands fa-facebook"></i> Facebook
            </label>
            <input
              type="text"
              name="FACEBOOK"
              htmlFor="facebook"
              className="block w-full border-primary-500 border-2 rounded-xl p-1"
              placeholder="@username"
              value={getSiteValue("FACEBOOK")}
              onChange={handleSitesChange}
            />
          </div>
          <div>
            <label
              htmlFor="instagram"
              className="block text-sm font-medium leading-6 text-dark-500"
            >
              <i className="fa-brands fa-instagram"></i> Instagram
            </label>
            <input
              type="text"
              name="INSTAGRAM"
              htmlFor="instagram"
              className="block w-full border-primary-500 border-2 rounded-xl p-1"
              placeholder="@username"
              value={getSiteValue("INSTAGRAM")}
              onChange={handleSitesChange}
            />
          </div>
          <button
            className="text-sm text-dark-500 bg-gray-500 p-2 mt-2 font-bold rounded-xl"
            onClick={handleSitesSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-12 md:mt-20">
        <h1 className="text-dark-500 text-2xl md:text-4xl font-bold underline mb-4 text-center">About Me</h1>
        <div className="container-fluid md:mx-10">
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-primary-500 focus:ring-accent-500 focus:border-accent-500 border-2 mt-2"
            placeholder="Write about yourself here..."
            value={formState.aboutMe ? formState.aboutMe : ''}
            onChange={handleAboutMeChange}
          ></textarea>
          <div className="flex justify-end">

            <button
              className=" text-white-50 text-md bg-primary-500 py-2 md:py-4 px-3 md:px-6 m-2 font-bold rounded-xl"
              onClick={handleProfileSave}
              >
              Save
            </button>
        </div>
        </div>
      </div>

      <div className="flex flex-col justify-end items-end mt-5 md:mt-10 mr-2 md:mr-5">
        <button
          className=" text-white-50 text-md bg-dark-500 py-2 md:py-5 px-5 md:px-10 font-bold rounded-xl"
          onClick={() => Auth.logout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Account;
