import React, { useEffect } from "react";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";
import { useTelegram } from "../../hooks/useTelegram";

import "./AccountList.css";

const accounts = [0, 1, 2, 3, 4, 5, 6, 7];
function AccountList(props) {
  const { tg } = useTelegram();

  const fetchAccounts = async () => {
    try {
      const accounts = await fetch("http://192.168.88.27:8080/accounts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Web-App-Init-Data": tg.initData,
          mode: "no-cors",
        },
      });
      return accounts;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  });

  return (
    <div className="account-list">
      <Link to={AppRouterPath.CreateAccountForm}>
        <Button>Добавить аккаунт</Button>
      </Link>

      {accounts.map((account) => (
        <Link to={AppRouterPath.Account(account)}>
          <Button key={account}>Аккаунт {account}</Button>
        </Link>
      ))}
    </div>
  );
}

export default AccountList;
