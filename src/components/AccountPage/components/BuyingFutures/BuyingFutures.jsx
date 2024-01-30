import React from "react";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useForm, Controller } from "react-hook-form";
import "./BuyingFutures.css";

const BuyingFutures = ({ id, currencyOptions = [] }) => {
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
  const [fetchError, setFetchError] = React.useState(null);
  register("amount", {
    required: "Введите сумму",
    validate: (val) => {
      if (isNaN(Number(val))) {
        return "Введите правильную сумму";
      }
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
      if (tg.initData && id) {
        const res = await fetch(
          `https://transfer.meraquant.com/accounts/${id}/buy`,
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

        const response = await res.json();
        console.log(response);

        if (response.status === "error" && "status" in response) {
          setFetchError(response.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (error && "message" in error) {
        setFetchError(error.response.data.message || error.message);
      }
    }
  };

  const onSubmit = ({ amount, instrument_title }) => {
    console.log({ amount, instrument_title });
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
          <Button type="button" className="all-amount-button">
            На всю сумму USDT
          </Button>
          {errors.amount && (
            <span className={"error"}>{errors.amount.message}</span>
          )}
        </div>
      </div>
      <div className="input-wrapper">
        <Button type="submit">Потвердить</Button>
        <span className={"error"}>{fetchError}</span>
      </div>
    </form>
  );
};

export default BuyingFutures;
