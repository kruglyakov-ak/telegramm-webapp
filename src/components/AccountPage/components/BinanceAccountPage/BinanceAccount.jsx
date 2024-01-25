import React from "react";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
import "./BinanceAccount.css";
import Button from "../../../Button/Button";

const options = [
  { value: "ETH", label: "ETH" },
  { value: "BTC", label: "BTC" },
  { value: "ADA", label: "ADA" },
];

const BinanceAccount = () => {
  const [actionMode, setActionMode] = React.useState("buy");

  const getActionElement = (mode) => {
    switch (mode) {
      case "buy":
        return <BuyingFutures currencyOptions={options} />;
      case "change":
        return <div>change</div>;
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="account-info"></div>

      <div className="actions-button">
        <Button
          className={actionMode !== "buy" && "back-button"}
          onClick={() => setActionMode("buy")}
        >
          Покупка фьючерса
        </Button>
        <Button
          className={actionMode !== "channge" && "back-button"}
          onClick={() => setActionMode("change")}
        >
          Обмен фьючерсов
        </Button>
      </div>
      {getActionElement(actionMode)}
    </div>
  );
};

export default BinanceAccount;
