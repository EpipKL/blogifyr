import React from "react";
import "tailwindcss/tailwind.css";
import Sidepanel from "./Sidepanel";
import Account from "./Account";
import Blogs from "./Blogs";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

import Auth from "../../utils/auth";
import Navbar from "./Navbar";
import UserProfile from './UserProfile';

const Profile = () => {
  const { username } = useParams();



  return (
    <div className="">
      {/* <Sidepanel username={username}/> */}
      <Navbar username={username} />

      <div className="">
      <UserProfile username={username} />
      </div>

    </div>
  );
};

export default Profile;
