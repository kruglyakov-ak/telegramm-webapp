import React from "react";
import "./Button.css";

const Button = ({ className = "", children, ...props }) => {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
