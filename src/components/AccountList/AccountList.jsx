import React from "react";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";

import "./AccountList.css";

const accounts = [0, 1, 2, 3, 4, 5, 6, 7];
function AccountList(props) {
  return (
    <div className="account-list">
      <Button>
        <Link to={AppRouterPath.CreateAccountForm}>Добавить аккаунт</Link>
      </Button>

      {accounts.map((account) => (
        <Button key={account}>
          <Link to={AppRouterPath.Account(account)}>Аккаунт {account}</Link>
        </Button>
      ))}
    </div>
  );
}

export default AccountList;
