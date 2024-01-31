import React from "react";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
import ChangeFutures from "../ChangeFutures/ChangeFutures";
import Button from "../../../Button/Button";
import { useTelegram } from "../../../../hooks/useTelegram";
import "./BinanceAccount.css";

const BinanceAccount = ({ id, maxUSDT, buyCallback, assets }) => {
  const { tg } = useTelegram();
  const [buyingPerpOptions, setBuyingPerpOptions] = React.useState([]);
  const [buyingOptions, setBuyingOptions] = React.useState([]);
  const [sellingOptions, setSellingOptions] = React.useState([]);

  const [actionMode, setActionMode] = React.useState("buy");

  const getNearestFutures = React.useCallback(async () => {
    try {
      if (tg?.initData) {
        const res = await fetch(
          `https://transfer.meraquant.com/instruments/futures/nearest?exchange=binance`,
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
          return resData.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [tg?.initData]);

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
          setBuyingPerpOptions(
            resData?.data?.binance?.buy.map(({ instrument_to }) => ({
              value: instrument_to,
              label: instrument_to,
            }))
          );
        }

        await getNearestFutures();
      }
    } catch (error) {
      console.log(error);
    }
  }, [getNearestFutures, tg?.initData]);

  React.useEffect(() => {
    if (assets.lenth > 0) {
      setSellingOptions(
        assets
          .filter((asset) => asset.instrument_title.includes("_"))
          .map((asset) => ({
            value: asset.instrument_title,
            label: asset.instrument_title,
          }))
      );
    }
  }, [assets]);

  React.useEffect(() => {
    getPossiblePairs();
  }, [getPossiblePairs, tg]);

  React.useEffect(() => {
    const nearestFutures = getNearestFutures();
    setBuyingOptions([...buyingPerpOptions, ...nearestFutures]);
  }, [buyingPerpOptions, getNearestFutures]);

  const getActionElement = (mode) => {
    switch (mode) {
      case "buy":
        return (
          <BuyingFutures
            buyCallback={buyCallback}
            maxUSDT={maxUSDT}
            id={id}
            currencyOptions={buyingPerpOptions}
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
