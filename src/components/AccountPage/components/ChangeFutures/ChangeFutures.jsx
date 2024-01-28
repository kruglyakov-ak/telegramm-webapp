/* eslint-disable no-unused-vars */
import React from "react";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import Button from "../../../Button/Button";
import "./ChangeFutures.css";

const ChangeFutures = () => {
  const [availableForSellFuteresOptions, setAvailableForSellFuteresOptions] =
    React.useState([
      { value: "ETH", label: "ETH" },
      { value: "BTC", label: "BTC" },
      { value: "ADA", label: "ADA" },
    ]);
  const [availableForBuyFuteresOptions, setAvailableForBuyFuteresOptions] =
    React.useState([
      { value: "ETH", label: "ETH" },
      { value: "BTC", label: "BTC" },
      { value: "ADA", label: "ADA" },
    ]);
  const [selectedSellOption, setSelectedSellOption] = React.useState(null);
  const [selectedBuyOption, setSelectedBuyOption] = React.useState(null);

  const sellFuturesSelectChangeHandler = (value) => {
    setSelectedSellOption(
      availableForSellFuteresOptions.find((option) => option.value === value) ||
        null
    );
  };

  const buyFuturesSelectChangeHandler = (value) => {
    setSelectedBuyOption(
      availableForBuyFuteresOptions.find((option) => option.value === value) ||
        null
    );
  };

  return (
    <div className="actions-block">
      <div className="select-wrapper">
        <CustomSelect
          placeholder={"Продаваемый фьючерс"}
          options={availableForSellFuteresOptions}
          selected={selectedSellOption}
          onChange={sellFuturesSelectChangeHandler}
        />

        <div className="change-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
            <polygon points="18.294 16.793 13.001 22.086 13.001 1 12.001 1 12.001 22.086 6.706 16.792 5.999 17.499 12.501 24 19.001 17.5 18.294 16.793" />
          </svg>
        </div>

        <CustomSelect
          placeholder={"Покупаемый фьючерс"}
          options={availableForBuyFuteresOptions}
          selected={selectedBuyOption}
          onChange={buyFuturesSelectChangeHandler}
        />
      </div>

      <Button>Потвердить</Button>
    </div>
  );
};

export default ChangeFutures;
