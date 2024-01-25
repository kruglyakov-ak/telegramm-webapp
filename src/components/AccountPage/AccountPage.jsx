import React from "react";
import { useLoaderData } from "react-router-dom";
import BinanceAccount from "./components/BinanceAccountPage/BinanceAccount";
import DerebitAccount from "./components/DerebitAccount/DerebitAccount";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";
import "./AccountPage.css";

const AccountPage = () => {
  let { id } = useLoaderData();
  const isBinance = true;
  return (
    <div className="account-page">
      <h1 className="account-page-title">Account {id}</h1>

      {isBinance ? <BinanceAccount /> : <DerebitAccount />}

      <Link to={AppRouterPath.Main}>
        <Button className="back-button">К списку аккаунтов</Button>
      </Link>
    </div>
  );
};

export default AccountPage;
