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
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 511.624 511.623"
          >
            <path
              style={{
                fill: selectedSellOption
                  ? "var(--tg-theme-accent-text-color)"
                  : "var(--tg-theme-hint-color)",
              }}
              d="M9.135,200.996h392.862v54.818c0,2.475,0.9,4.613,2.707,6.424c1.811,1.81,3.953,2.713,6.427,2.713    c2.666,0,4.856-0.855,6.563-2.569l91.365-91.362c1.707-1.713,2.563-3.903,2.563-6.565c0-2.667-0.856-4.858-2.57-6.567    l-91.07-91.078c-2.286-1.906-4.572-2.856-6.858-2.856c-2.662,0-4.853,0.856-6.563,2.568c-1.711,1.715-2.566,3.901-2.566,6.567    v54.818H9.135c-2.474,0-4.615,0.903-6.423,2.712S0,134.568,0,137.042v54.818c0,2.474,0.903,4.615,2.712,6.423    S6.661,200.996,9.135,200.996z"
            />
            <path
              style={{
                fill: selectedBuyOption
                  ? "var(--tg-theme-accent-text-color)"
                  : "var(--tg-theme-hint-color)",
              }}
              d="M502.49,310.637H109.632v-54.82c0-2.474-0.905-4.615-2.712-6.423c-1.809-1.809-3.951-2.712-6.424-2.712    c-2.667,0-4.854,0.856-6.567,2.568L2.568,340.607C0.859,342.325,0,344.509,0,347.179c0,2.471,0.855,4.568,2.568,6.275    l91.077,91.365c2.285,1.902,4.569,2.851,6.854,2.851c2.473,0,4.615-0.903,6.423-2.707c1.807-1.813,2.712-3.949,2.712-6.427V383.72    H502.49c2.478,0,4.613-0.899,6.427-2.71c1.807-1.811,2.707-3.949,2.707-6.427v-54.816c0-2.475-0.903-4.613-2.707-6.42    C507.103,311.54,504.967,310.637,502.49,310.637z"
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
