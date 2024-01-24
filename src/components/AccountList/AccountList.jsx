import React from "react";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";

import "./AccountList.css";

const accounts = [0, 1, 2, 3, 4, 5, 6, 7];
function AccountList(props) {
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
