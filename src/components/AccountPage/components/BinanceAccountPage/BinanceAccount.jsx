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

  const getNearestFutures = async () => {
    try {
      if (tg?.initData) {
        const res = await fetch(
          `https://transfer.meraquant.com/instruments/futures/nearest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: tg?.initData,
            },
          }
        );
        const resData = await res.json();

        setBuyingOptions(
          buyingPerpOptions.push(
            resData?.data?.map(({ instrument_title }) => ({
              value: instrument_title,
              label: instrument_title,
            }))
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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

        setBuyingPerpOptions(
          resData?.data?.binance?.buy.map(({ instrument_to }) => ({
            value: instrument_to,
            label: instrument_to,
          }))
        );

        await getNearestFutures();
      }
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tg]);


  React.useEffect(() => {
    setSellingOptions(
      assets
        .filter((asset) => asset.instrument_title.includes("_"))
        .map((asset) => ({
          value: asset.instrument_title,
          label: asset.instrument_title,
        }))
    );
  }, [assets]);

  React.useEffect(() => {
    getPossiblePairs();
  }, [getPossiblePairs, tg]);

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
