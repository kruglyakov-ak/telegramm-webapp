import React from "react";
import { useLoaderData } from "react-router-dom";
import BinanceAccount from "./components/BinanceAccountPage/BinanceAccount";
import DerebitAccount from "./components/DerebitAccount/DerebitAccount";
import "./AccountPage.css";

const AccountPage = () => {
  let { id } = useLoaderData();
  const isBinance = false;
  return (
    <div>
      <h1 className="account-page-title">Account {id}</h1>

      {isBinance ? <BinanceAccount /> : <DerebitAccount />}
    </div>
  );
};

export default AccountPage;
