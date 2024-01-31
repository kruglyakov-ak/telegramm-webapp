import React from "react";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
import ChangeFutures from "../ChangeFutures/ChangeFutures";
import Button from "../../../Button/Button";
import { useTelegram } from "../../../../hooks/useTelegram";
import "./BinanceAccount.css";

const BinanceAccount = ({ id, maxUSDT, buyCallback, assets }) => {
  const { tg } = useTelegram();
  const [buyingOptions, setBuyingOptions] = React.useState([]);
  const [sellingOptions, setSellingOptions] = React.useState([]);
  const [actionMode, setActionMode] = React.useState("buy");

  const getPossiblePairs = React.useCallback(async () => {
    try {
      if (tg?.initData) {
        const res = await fetch(
          `https://transfer.meraquant.com/instruments/futures/pairs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: tg?.initData,
            },
          }
        );
        const resData = await res.json();

        if ("status" in resData && resData.status === "success") {
          setBuyingOptions(
            resData?.data?.binance?.buy.map(({ instrument_to }) => ({
              value: instrument_to,
              label: instrument_to,
            }))
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [tg]);

  React.useEffect(() => {
    getPossiblePairs();
  }, [getPossiblePairs, tg]);

  React.useEffect(() => {
    setSellingOptions(
      assets.filter(({instrument_title}) => instrument_title.includes('_')).map(({ instrument_title }) => ({
        value: instrument_title,
        label: instrument_title,
      }))
    );
  }, [assets]);

  const getActionElement = (mode) => {
    switch (mode) {
      case "buy":
        return (
          <BuyingFutures
            buyCallback={buyCallback}
            maxUSDT={maxUSDT}
            id={id}
            currencyOptions={buyingOptions}
          />
        );
      case "change":
        return (
          <ChangeFutures
            buyingOptions={buyingOptions}
            sellingOptions={sellingOptions}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="binance-account">
      <div className="actions-button">
        <Button
          className={actionMode !== "buy" && "back-button"}
          onClick={() => setActionMode("buy")}
        >
          Покупка фьючерса
        </Button>
        <Button
          className={actionMode !== "change" && "back-button"}
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
