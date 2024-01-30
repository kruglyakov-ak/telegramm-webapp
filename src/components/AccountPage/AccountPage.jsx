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
      <h1 className="account-page-title">{account?.title}</h1>

      {isBinance ? <BinanceAccount id={id} /> : <DerebitAccount id={id} />}

      <BackButton />
    </div>
  ) : (
    <div className="account-page">
      <h1 className="account-page-error">{fetchError}</h1>
      <BinanceAccount id={id} />
      <BackButton />
    </div>
  );
};

export default AccountPage;
