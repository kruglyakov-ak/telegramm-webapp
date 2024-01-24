import React from "react";
import Button from "../Button/Button";
import Link from "../Link/Link";
import Input from "../Input/Input";
import { AppRouterPath } from "../../constants";
import "./CreateAccountForm.css";
const CreateAccountForm = () => {
  return (
    <form className="create-account-form">
      <Input
        title={"Название аккаунта:"}
        type="text"
        placeholder="Название аккаунта"
      />
      <Input title={"Выбор биржи:"} type="text" placeholder="Выбор биржи" />
      <Input title={"Main API KEY:"} type="text" placeholder="Main API KEY" />
      <Input
        title={"SECOND API KEY:"}
        type="text"
        placeholder="SECOND API KEY"
      />

      <Button>Сохранить</Button>

      <Button>
        <Link to={AppRouterPath.Main}>Отмена</Link>
      </Button>
    </form>
  );
};

export default CreateAccountForm;
