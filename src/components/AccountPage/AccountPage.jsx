import React, { useEffect, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import BinanceAccount from "./components/BinanceAccountPage/BinanceAccount";
import DerebitAccount from "./components/DerebitAccount/DerebitAccount";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import { AppRouterPath } from "../../constants";
import "./AccountPage.css";

const AccountPage = () => {
  const { tg } = useTelegram();
  const { id } = useLoaderData();
  const [isLoading, setIsLoading] = React.useState(true);
  const [account, setAccount] = React.useState(null);
  const [isBinance, setIsBinance] = React.useState(true);

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

        setAccount(resData.data);
        setIsBinance(resData.data.market === "binance");
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
      <h1>Загрузка...</h1>

      <Link to={AppRouterPath.Main}>
        <Button className="back-button">К списку аккаунтов</Button>
      </Link>
    </div>
  ) : (
    <div className="account-page">
      <h1 className="account-page-title">{account?.title}</h1>

      {isBinance ? <BinanceAccount /> : <DerebitAccount />}

      <Link to={AppRouterPath.Main}>
        <Button className="back-button">К списку аккаунтов</Button>
      </Link>
    </div>
    // ) : (
    //   <div className="account-page">
    //     <h1>Аккаунт не найден</h1>
    //     <Link to={AppRouterPath.Main}>
    //       <Button className="back-button">К списку аккаунтов</Button>
    //     </Link>
    //   </div>
  );
};

export default AccountPage;
