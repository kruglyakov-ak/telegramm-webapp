import React from "react";
import "./AccountList.css";
import { Button } from "../Button/Button";

const accounts = [0, 1, 2, 3, 4, 5, 6, 7];
function AccountList(props) {
  return (
    <div className="account-list">
      <Button>Добавить аккаунт</Button>

      {accounts.map((account) => (
        <Button key={account}>Аккаунт {account}</Button>
      ))}
    </div>
  );
}

export default AccountList;
