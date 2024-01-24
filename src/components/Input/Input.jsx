import React from "react";
import "./Input.css";

const Input = ({ title, wrapperClassName = "", placeholder = "", value = "", ...props }) => {

    return (
    <div className={`input-wrapper ${wrapperClassName}`}>
      <input className={`input ${value !== "" ? "non-empty" : ""}`} {...props} />
      <div className="input-placeholder">{placeholder}</div>
    </div>
  );
};

export default Input;
