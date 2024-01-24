import React from "react";
import { useParams } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  let { id } = useParams();
  return (
    <div>
      <h1>AccountPage {id}</h1>
    </div>
  );
};

export default AccountPage;
