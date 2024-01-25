import React from "react";
import Link from "../../../Link/Link";
import Button from "../../../Button/Button";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
import { AppRouterPath } from "../../../../constants";
import "./DerebitAccount.css";

const options = [
  { value: "ETH", label: "ETH" },
  { value: "BTC", label: "BTC" },
];

const DerebitAccount = () => {
  return (
    <div className="derebit-account">
      <div className="account-info"></div>

      <div className="actions-title">Покупка фьючерса</div>
      <BuyingFutures currencyOptions={options} />

      <Link to={AppRouterPath.Main}>
        <Button>К списку аккаунтов</Button>
      </Link>
    </div>
  );
};

export default DerebitAccount;
