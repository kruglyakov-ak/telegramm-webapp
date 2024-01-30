import React from "react";
import Link from "../../../Link/Link";
import Button from "../../../Button/Button";
import { AppRouterPath } from "../../../../constants";
import "./BackButton.css";

const BackButton = () => {
  return (
    <Link to={AppRouterPath.Main}>
      <Button className="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 29.77 29.77"
          style={{ fill: "var(--tg-theme-subtitle-text-color)" }}
        >
          <g>
            <path d="M26.633,15.988c-1.171,1.172-3.071,1.172-4.243,0l-4.505-4.505V26.77c0,1.658-1.343,3-3,3s-3-1.342-3-3V11.487   l-4.506,4.505c-0.585,0.586-1.354,0.879-2.121,0.879s-1.536-0.293-2.121-0.879c-1.172-1.172-1.172-3.07,0-4.242L14.887,0   l11.747,11.747C27.805,12.917,27.805,14.816,26.633,15.988z" />
          </g>
        </svg>
        <span>К списку аккаунтов</span>
      </Button>
    </Link>
  );
};

export default BackButton;
