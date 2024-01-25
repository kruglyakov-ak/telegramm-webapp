import React from "react";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
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
    </div>
  );
};

export default DerebitAccount;
