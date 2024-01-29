import React from "react";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
import "./DerebitAccount.css";

const options = [
  { value: "BTCUSD_PERP", label: "BTCUSD_PERP" },
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
