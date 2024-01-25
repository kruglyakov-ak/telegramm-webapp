import React from "react";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import Button from "../../../Button/Button";
import "./ChangeFutures.css";

const ChangeFutures = () => {
  const [availableForSellFuteresOptions, setAvailableForSellFuteresOptions] =
    React.useState([]);
  const [availableForBuyFuteresOptions, setAvailableForBuyFuteresOptions] =
    React.useState([]);
  const [selectedSellOption, setSelectedSellOption] = React.useState(null);
  const [selectedBuyOption, setSelectedBuyOption] = React.useState(null);

  const sellFuturesSelectChangeHandler = (value) => {
    availableForSellFuteresOptions(
      selectedSellOption.find((option) => option.value === value) || null
    );
  };

  const buyFuturesSelectChangeHandler = (value) => {
    availableForBuyFuteresOptions(
      selectedBuyOption.find((option) => option.value === value) || null
    );
  };

  return (
    <div className="actions-block">
      <CustomSelect
        placeholder={"Продоваемый фьючерс"}
        options={availableForSellFuteresOptions}
        selected={selectedSellOption}
        onChange={sellFuturesSelectChangeHandler}
      />

      <CustomSelect
        placeholder={"Покупаемый фьючерс"}
        options={availableForBuyFuteresOptions}
        selected={selectedBuyOption}
        onChange={buyFuturesSelectChangeHandler}
      />

      <Button>Потвердить</Button>
    </div>
  );
};

export default ChangeFutures;
