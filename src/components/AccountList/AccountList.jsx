import React, { useEffect, useCallback, useState } from "react";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";
import { useTelegram } from "../../hooks/useTelegram";

import "./AccountList.css";

function AccountList(props) {
  const { tg } = useTelegram();
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = useCallback(async () => {
    try {
      if (tg.initData) {
        const res = await fetch("https://transfer.meraquant.com/accounts/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: tg.initData,
          },
        });
        const resData = await res.json();
        setAccounts(resData.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [tg]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="account-list">
      <Link to={AppRouterPath.CreateAccountForm}>
        <Button className="add-account-button">
          <span className="plus">+</span> Добавить аккаунт
        </Button>
      </Link>

      {accounts.length > 0 &&
        accounts.map((account) => (
          <Link key={account.id} to={AppRouterPath.Account(account.id)}>
            <Button key={account} className="account-button">
              {account.title}
              <div className="exchange-logo-wrapper">
                {account.market === "binance" ? (
                  <img
                    className="exchange-logo"
                    src="/images/binance-logo.svg"
                    alt="Binance"
                  />
                ) : (
                  <img
                    className="exchange-logo"
                    src="/images/deribit-logo.svg"
                    alt="Deribit"
                    style={{ marginLeft: "2px" }}
                  />
                )}
              </div>
            </Button>
          </Link>
        ))}
    </div>
  );
}

export default AccountList;
