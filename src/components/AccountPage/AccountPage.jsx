import React, { useEffect, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import BinanceAccount from "./components/BinanceAccountPage/BinanceAccount";
import DerebitAccount from "./components/DerebitAccount/DerebitAccount";
import BackButton from "./components/BackButton/BackButton";
import { useTelegram } from "../../hooks/useTelegram";
import "./AccountPage.css";

const AccountPage = () => {
  const { tg } = useTelegram();
  const { id } = useLoaderData();
  const [isLoading, setIsLoading] = React.useState(true);
  const [account, setAccount] = React.useState(null);
  const [isBinance, setIsBinance] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(null);
  const [maxUSDT] = React.useState(0);

  const getAccount = useCallback(async () => {
    try {
      if (tg?.initData) {
        const res = await fetch(
          `https://transfer.meraquant.com/accounts/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: tg?.initData,
            },
          }
        );
        const resData = await res.json();
        if ("data" in resData) {
          setAccount(resData.data);
          setIsBinance(resData.data.market === "binance");
        } else if ("status" in resData && resData.status === "error") {
          if (resData.message.includes("invalid_credentials")) {
            setFetchError("Ошибка API ключей");
          } else {
            setFetchError(resData.message);
          }
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [tg, id]);

  useEffect(() => {
    getAccount();
  }, [getAccount, tg]);

  return isLoading ? (
    <div className="account-page">
      <h1 className="account-page-loading">Загрузка...</h1>

      <BackButton />
    </div>
  ) : account ? (
    <div className="account-page">
      <h1 className="account-page-title">
        {account?.title} {account?.market}
      </h1>

      <div className="account-info">
        {account?.assets.map(
          ({ base_currency, instrument_title, equity }, index) => {
            return (
              <div key={index} className="account-info-row">
                <div>{instrument_title}</div>

                <div className="equity">
                  <div>{equity}</div>
                  <div>{base_currency}</div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {isBinance ? (
        <BinanceAccount id={id} maxUSDT={maxUSDT} />
      ) : (
        <DerebitAccount id={id} maxUSDT={maxUSDT} />
      )}

      <BackButton />
    </div>
  ) : (
    <div className="account-page">
      <h1 className="account-page-error">{fetchError}</h1>
      <BinanceAccount id={id} maxUSDT={maxUSDT} />
      <BackButton />
    </div>
  );
};

export default AccountPage;
