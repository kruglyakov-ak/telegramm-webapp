import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  const exchangeSelectChangeHandler = (value) => {
    setSelectionOption(
      options.find((option) => option.value === value) || null
    );
    setValue("exchange", value);
    setError("exchange", undefined);
  };

  const onSubmit = ({ accountName, exchange, mainApiKey, secondApiKey }) => {
    console.log({
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
  register("mainApiKey", { required: "Enter main api key" });
  register("secondApiKey", {
    required: "Enter second api key",
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name === "accountName" &&
        value.accountName !== "" &&
        value.accountName.length > 2 &&
        value.accountName.length < 32
      ) {
        setError("accountName", undefined);
      }

      if (name === "mainApiKey" && value.mainApiKey !== "") {
        setError("mainApiKey", undefined);
      }

      if (name === "secondApiKey" && value.secondApiKey !== "") {
        setError("secondApiKey", undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [setError, watch]);

  React.useEffect(() => {
    setError("ф", {
      types: {
        required: "Задайте имя аккаунта",
        minLength: "Минимальная длина имени 2",
        maxLength: "Максимальная длина имени 32",
      },
    })
  }, [setError])

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
        rules={{ required: "Choose exchange" }}
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
          title={"Main API KEY:"}
          type="text"
          placeholder="Main API KEY"
          onChange={(e) => setValue("mainApiKey", e.target.value)}
          value={watch("mainApiKey")}
        />
        {errors.mainApiKey && (
          <span className={"error"}>{errors.mainApiKey.message}</span>
        )}
      </div>
      <div className="input-wrapper">
        <Input
          title={"SECOND API KEY:"}
          type="text"
          placeholder="SECOND API KEY"
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
