import React from "react";
import "./Input.css";

const Input = ({ title, wrapperClassName = "", ...props }) => {
  return (
    <fieldset className={`input-fieldset ${wrapperClassName}`}>
      <legend>{title}</legend>
      <input className="input" {...props} />
    </fieldset>
  );
};

export default Input;
