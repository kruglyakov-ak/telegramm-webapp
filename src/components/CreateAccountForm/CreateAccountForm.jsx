import React from "react";
import Button from "../Button/Button";
import Link from "../Link/Link";
import Input from "../Input/Input";
import CustomSelect from "../CustomSelect/CustomSelect";
import { AppRouterPath } from "../../constants";
import "./CreateAccountForm.css";

const options = [
  { value: "deribit", label: "Deribit" },
  { value: "binance", label: "Binance" },
];

const CreateAccountForm = () => {
  const [accountName, setAccountName] = React.useState("");
  const [selectedOption, setSelectionOption] = React.useState(null);
  const [mainApiKey, setMainApiKey] = React.useState("");
  const [secondApiKey, setSecondApiKey] = React.useState("");

  const exchangeSelectChangeHandler = (value) => {
    setSelectionOption(
      options.find((option) => option.value === value) || null
    );
  };

  return (
    <form className="create-account-form">
      <Input
        title={"Название аккаунта:"}
        type="text"
        placeholder="Название аккаунта"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />

      <CustomSelect
        placeholder={"Выбор биржи"}
        options={options}
        selected={selectedOption}
        onChange={exchangeSelectChangeHandler}
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
        <Button className="back-button">Отмена</Button>
      </Link>
    </form>
  );
};

export default CreateAccountForm;
