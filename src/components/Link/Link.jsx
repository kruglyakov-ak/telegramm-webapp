import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Link.css";

const Link = ({ path, children, className = "", ...props }) => {
  return (
    <RouterLink to={path} className={`link ${className}`} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
