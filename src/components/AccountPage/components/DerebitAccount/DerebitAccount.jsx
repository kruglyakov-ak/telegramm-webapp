import React from "react";
import { useTelegram } from "../../../../hooks/useTelegram";
import BuyingFutures from "../BuyingFutures/BuyingFutures";
import "./DerebitAccount.css";

const DerebitAccount = () => {
  const { tg } = useTelegram();
  const [buyingOptions, setBuyingOptions] = React.useState([]);

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

        setBuyingOptions(
          resData?.data?.deribit?.buy.map(({ instrument_to }) => ({
            value: instrument_to,
            label: instrument_to,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [tg]);

  React.useEffect(() => {
    getPossiblePairs();
  }, [getPossiblePairs, tg]);

  return (
    <div className="derebit-account">
      <div className="account-info"></div>

      <div className="actions-title">Покупка фьючерса</div>
      <BuyingFutures currencyOptions={buyingOptions} />
    </div>
  );
};

export default DerebitAccount;
