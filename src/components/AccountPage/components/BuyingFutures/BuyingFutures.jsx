import React from "react";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import "./BuyingFutures.css";

const BuyingFutures = ({ currencyOptions = [] }) => {
  const [selectedOption, setSelectionOption] = React.useState(null);
  const [amount, setAmount] = React.useState("");

  const currencySelectChangeHandler = (value) => {
    setSelectionOption(
      currencyOptions.find((option) => option.value === value) || null
    );
  };
  return (
    <div className="actions-block">
      <CustomSelect
        placeholder={"Выбор фьючерса"}
        options={currencyOptions}
        selected={selectedOption}
        onChange={currencySelectChangeHandler}
      />
      <Input
        title={"Сумма в USDT:"}
        type="text"
        placeholder="Сумма в USDT"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="all-amount-wrapper">
        <Button></Button>

        <Button>На всю сумму USDT</Button>
      </div>
      <Button>Потвердить</Button>
    </div>
  );
};

export default BuyingFutures;
