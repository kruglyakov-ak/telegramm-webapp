/* eslint-disable no-unused-vars */
import React from "react";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import Button from "../../../Button/Button";
import "./ChangeFutures.css";

const ChangeFutures = ({ buyingOptions = [], sellingOptions = [] }) => {
  const [availableForSellFuteresOptions, setAvailableForSellFuteresOptions] =
    React.useState([]);
  const [availableForBuyFuteresOptions, setAvailableForBuyFuteresOptions] =
    React.useState([]);
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

  React.useEffect(() => {
    setAvailableForSellFuteresOptions(sellingOptions);
    setAvailableForBuyFuteresOptions(buyingOptions);
  }, [buyingOptions, sellingOptions]);

  React.useEffect(() => {
    if (selectedSellOption) {
      setSelectedBuyOption(
        availableForBuyFuteresOptions.filter(
          (option) =>
            option.value.slice(0, 3) !== selectedSellOption.value.slice(0, 3)
        ) || null
      );
    }
  }, [selectedSellOption, availableForBuyFuteresOptions]);

  React.useEffect(() => {
    if (selectedBuyOption) {
      setSelectedSellOption(
        availableForSellFuteresOptions.filter(
          (option) =>
            option.value.slice(0, 3) !== selectedBuyOption.value.slice(0, 3)
        ) || null
      );
    }
  }, [selectedBuyOption, availableForSellFuteresOptions]);

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
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 29.77 29.77"
            style={{ fill: "var(--tg-theme-accent-text-color)" }}
          >
            <g>
              <path d="M26.633,15.988c-1.171,1.172-3.071,1.172-4.243,0l-4.505-4.505V26.77c0,1.658-1.343,3-3,3s-3-1.342-3-3V11.487   l-4.506,4.505c-0.585,0.586-1.354,0.879-2.121,0.879s-1.536-0.293-2.121-0.879c-1.172-1.172-1.172-3.07,0-4.242L14.887,0   l11.747,11.747C27.805,12.917,27.805,14.816,26.633,15.988z" />
            </g>
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
