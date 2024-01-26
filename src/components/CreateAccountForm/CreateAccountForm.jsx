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

    formState: { errors },
  } = useForm();
  const [accountName, setAccountName] = React.useState("");
  const [selectedOption, setSelectionOption] = React.useState(null);
  const [mainApiKey, setMainApiKey] = React.useState("");
  const [secondApiKey, setSecondApiKey] = React.useState("");

  const exchangeSelectChangeHandler = (value) => {
    setSelectionOption(
      options.find((option) => option.value === value) || null
    );
    setValue("exchange", value);
  };

  const onSubmit = ({ accountName, exchange, mainApiKey, secondApiKey }) => {
    console.log({
      accountName,
      exchange,
      mainApiKey,
      secondApiKey,
    });
  };

  return (
    <form className="create-account-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <Input
          title={"Название аккаунта:"}
          type="text"
          placeholder="Название аккаунта"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          {...register("accountName", { required: "Enter account name" })}
        />
        {errors.exchange && (
          <span className={"error"}>{errors.exchange.message}</span>
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
          value={mainApiKey}
          onChange={(e) => setMainApiKey(e.target.value)}
          type="text"
          placeholder="Main API KEY"
          {...register("mainApiKey", { required: "Enter main api key" })}
        />
        {errors.exchange && (
          <span className={"error"}>{errors.mainApiKey.message}</span>
        )}
      </div>
      <div className="input-wrapper">
        <Input
          title={"SECOND API KEY:"}
          type="text"
          placeholder="SECOND API KEY"
          value={secondApiKey}
          onChange={(e) => setSecondApiKey(e.target.value)}
          {...register("secondApiKey", { required: "Enter second api key" })}
        />
        {errors.exchange && (
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
