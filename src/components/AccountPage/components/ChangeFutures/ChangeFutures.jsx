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
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-ember-extension="1"
          >
            <path
              d="M7 18L15 12L23 18"
              stroke={
                selectedSellOption
                  ? "var(--tg-theme-button-color)"
                  : "var(--tg-theme-text-color)"
              }
              stroke-width="3"
            />
          </svg>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-ember-extension="1"
          >
            <path
              d="M7 18L15 12L23 18"
              stroke={
                selectedBuyOption
                  ? "var(--tg-theme-button-color)"
                  : "var(--tg-theme-text-color)"
              }
              stroke-width="3"
            />
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
