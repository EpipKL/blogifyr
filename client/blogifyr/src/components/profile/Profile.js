import React from "react";
import "tailwindcss/tailwind.css";
import Sidepanel from "./Sidepanel";
import Account from "./Account";
import Blogs from "./Blogs";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

import Auth from "../../utils/auth";

const Profile = () => {
  const { username } = useParams();



  return (
    <div className="flex">
      <Sidepanel username={username}/>
      <Account username={username}/>
    </div>
  );
};

export default Profile;
