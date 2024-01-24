import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { AppRouterPath } from "../../constants";

const CreateAccountForm = () => {
  return (
    <div>
      create account from
      <Link to={AppRouterPath.Main}>
        <Button>Back</Button>
      </Link>
    </div>
  );
};

export default CreateAccountForm;
