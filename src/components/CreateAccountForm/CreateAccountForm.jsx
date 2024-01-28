import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Button from "../Button/Button";
import Link from "../Link/Link";
import Input from "../Input/Input";
import CustomSelect from "../CustomSelect/CustomSelect";
import { AppRouterPath } from "../../constants";
import { useTelegram } from "../../hooks/useTelegram";
import "./CreateAccountForm.css";

const options = [
  { value: "deribit", label: "Deribit" },
  { value: "binance", label: "Binance" },
];

const CreateAccountForm = () => {
  const { tg } = useTelegram();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const postNewAccount = async (data) => {
    try {
      if (tg.initData) {
        await fetch("https://transfer.meraquant.com/accounts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: tg.initData,
          },
          body: JSON.stringify({
            title: data.accountName,
            market: data.exchange,
            first_key: data.mainApiKey,
            second_key: data.secondApiKey,
          }),
        });

        tg.showAlert("Аккаунт успешно создан", navigate(AppRouterPath.Main));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedOption, setSelectionOption] = React.useState(null);
  const exchangeSelectChangeHandler = (value) => {
    setSelectionOption(
      options.find((option) => option.value === value) || null
    );
    setValue("exchange", value);
    setError("exchange", undefined);
  };

  const onSubmit = ({ accountName, exchange, mainApiKey, secondApiKey }) => {
    postNewAccount({
      accountName,
      exchange,
      mainApiKey,
      secondApiKey,
    });
  };

  register("accountName", {
    required: "Задайте имя аккаунта",
    minLength: {
      value: 2,
      message: "Минимальная длина имени 2",
    },
    maxLength: {
      value: 32,
      message: "Максимальная длина имени 32",
    },
  });
  register("mainApiKey", {
    required: "Enter main api key",
    validate: (val) => {
      if (
        getValues("exchange") === "binance"
          ? val?.length !== 64
          : val?.length !== 8
      ) {
        return "Проверьте правильность введенного ключа";
      }
    },
  });
  register("secondApiKey", {
    required: "Enter second api key",
    validate: (val) => {
      if (
        getValues("exchange") === "binance"
          ? val?.length !== 64
          : val?.length !== 43
      ) {
        return "Проверьте правильность введенного ключа";
      }
    },
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        value?.accountName &&
        name === "accountName" &&
        value?.accountName !== "" &&
        value?.accountName.length > 2 &&
        value?.accountName.length < 32
      ) {
        setError("accountName", undefined);
      }

      if (
        value?.mainApiKey &&
        name === "mainApiKey" &&
        value?.mainApiKey !== "" &&
        getValues("exchange") === "binance"
          ? value?.mainApiKey.length === 64
          : value?.mainApiKey.length === 8
      ) {
        setError("mainApiKey", undefined);
      }

      if (
        value?.secondApiKey &&
        name === "secondApiKey" &&
        value?.secondApiKey !== "" &&
        getValues("exchange") === "binance"
          ? value?.secondApiKey.length === 64
          : value?.secondApiKey.length === 43
      ) {
        setError("secondApiKey", undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [getValues, setError, watch]);

  return (
    <form className="create-account-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <Input
          title={"Название аккаунта:"}
          type="text"
          placeholder="Название аккаунта"
          onChange={(e) => setValue("accountName", e.target.value)}
          value={watch("accountName")}
        />
        {errors.accountName && (
          <span className={"error"}>{errors.accountName.message}</span>
        )}
      </div>

      <Controller
        name="exchange"
        control={control}
        rules={{ required: "Выберите биржу" }}
        render={() => (
          <div className="input-wrapper">
            <CustomSelect
              placeholder={"Выбор биржи"}
              options={options}
              selected={selectedOption}
              onChange={exchangeSelectChangeHandler}
            />
            {errors.exchange && (
              <span className={"error"}>{errors.exchange.message}</span>
            )}
          </div>
        )}
      />
      <div className="input-wrapper">
        <Input
          title={"First key:"}
          type="text"
          placeholder="First key"
          onChange={(e) => setValue("mainApiKey", e.target.value)}
          value={watch("mainApiKey")}
        />
        {errors.mainApiKey && (
          <span className={"error"}>{errors.mainApiKey.message}</span>
        )}
      </div>
      <div className="input-wrapper">
        <Input
          title={"Second key:"}
          type="text"
          placeholder="Second key"
          onChange={(e) => setValue("secondApiKey", e.target.value)}
          value={watch("secondApiKey")}
        />
        {errors.secondApiKey && (
          <span className={"error"}>{errors.secondApiKey.message}</span>
        )}
      </div>

      <Button type="submit">Сохранить</Button>

      <Link to={AppRouterPath.Main}>
        <Button className="back-button">Отмена</Button>
      </Link>
    </form>
  );
};

export default CreateAccountForm;
