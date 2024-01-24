import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";

import "./AccountList.css";

const accounts = [0, 1, 2, 3, 4, 5, 6, 7];
function AccountList(props) {
  return (
    <div className="account-list">
      <Link to={AppRouterPath.CreateAccountForm}>
        <Button className={"account-button"}>Добавить аккаунт</Button>
      </Link>

      {accounts.map((account) => (
        <Button className={"account-button"} key={account}>
          Аккаунт {account}
        </Button>
      ))}
    </div>
  );
}

export default AccountList;
