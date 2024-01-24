import React from "react";
import { useLoaderData } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  let { id } =  useLoaderData();

  return (
    <div>
      <h1>AccountPage {id}</h1>
    </div>
  );
};

export default AccountPage;
