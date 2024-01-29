import React from "react";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useForm, Controller } from "react-hook-form";
import "./BuyingFutures.css";

const BuyingFutures = ({ account_id, currencyOptions = [] }) => {
  const { tg } = useTelegram();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedOption, setSelectionOption] = React.useState(null);
  // const [fetchError, setFetchError] = React.useState(null);
  register("amount", {
    required: "Введите сумму",
    validate: (val) => {
      if (!Number.isInteger(val) && val <= 0) {
        console.log(val);
        return "Введите правильную сумму";
      }
      console.log('PASSED', val);

    },
  });

  const currencySelectChangeHandler = (value) => {
    setSelectionOption(
      currencyOptions.find((option) => option.value === value) || null
    );
    setValue("instrument_title", value);
    setError("instrument_title", undefined);
  };

  const buyFutures = async (data) => {
    try {
      if (tg.initData && account_id) {
        await fetch(
          `https://transfer.meraquant.com/accounts/${account_id}/buy`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: tg.initData,
            },
            body: JSON.stringify({
              instrument_title: data.instrument_title,
              amount: data.amount,
            }),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = ({ amount, instrument_title }) => {
    buyFutures({
      amount,
      instrument_title,
    });
  };

  return (
    <form className="actions-block" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="instrument_title"
        control={control}
        rules={{ required: "Выберите фьючерс" }}
        render={() => (
          <div className="input-wrapper">
            <CustomSelect
              placeholder={"Выбор фьючерса"}
              options={currencyOptions}
              selected={selectedOption}
              onChange={currencySelectChangeHandler}
            />
            {errors.instrument_title && (
              <span className={"error"}>{errors.instrument_title.message}</span>
            )}
          </div>
        )}
      />
      <div className="amount-wrapper">
        <div className="input-wrapper">
          <Input
            title={"Сумма в USDT:"}
            type="text"
            placeholder="Сумма в USDT"
            className="amount-input"
            onChange={(e) => setValue("amount", e.target.value)}
            value={watch("amount")}
          />
          {errors.amount && (
            <span className={"error"}>{errors.amount.message}</span>
          )}
        </div>
        <Button type="button" className="all-amount-button">
          На всю сумму USDT
        </Button>
      </div>
      <Button type="submit">Потвердить</Button>
    </form>
  );
};

export default BuyingFutures;
