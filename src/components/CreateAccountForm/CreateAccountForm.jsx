import React from "react";
import Button from "../Button/Button";
import Link from "../Link/Link";
import Input from "../Input/Input";
import { AppRouterPath } from "../../constants";
import "./CreateAccountForm.css";
const CreateAccountForm = () => {
  const [accountName, setAccountName] = React.useState("");
  const [exchange, setExchange] = React.useState("");
  const [mainApiKey, setMainApiKey] = React.useState("");
  const [secondApiKey, setSecondApiKey] = React.useState("");

  return (
    <form className="create-account-form">
      <Input
        title={"Название аккаунта:"}
        type="text"
        placeholder="Название аккаунта"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
      <Input
        title={"Выбор биржи:"}
        type="text"
        placeholder="Выбор биржи"
        value={exchange}
        onChange={(e) => setExchange(e.target.value)}
      />
      <Input
        title={"Main API KEY:"}
        value={mainApiKey}
        onChange={(e) => setMainApiKey(e.target.value)}
        type="text"
        placeholder="Main API KEY"
      />
      <Input
        title={"SECOND API KEY:"}
        type="text"
        placeholder="SECOND API KEY"
        value={secondApiKey}
        onChange={(e) => setSecondApiKey(e.target.value)}
      />

      <Button>Сохранить</Button>

      <Link to={AppRouterPath.Main}>
        <Button>Отмена</Button>
      </Link>
    </form>
  );
};

export default CreateAccountForm;
