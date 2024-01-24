import { useEffect, useRef } from "react";
import "./OptionEl.css";

export const OptionEl = ({ onClick, option }) => {
  const { label, value } = option;
  const optionRef = useRef(null);

  const handleClick = (clickedValue) => () => {
    onClick(clickedValue);
  };

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event) => {
      if (document.activeElement === option && event.key === "Enter") {
        onClick(value);
      }
    };

    option.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      option.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [value, onClick, optionRef]);

  return (
    <li className="option">
      <button
        className="option-button"
        type="button"
        value={value}
        ref={optionRef}
        onClick={handleClick(value)}
      >
        {label}
      </button>
    </li>
  );
};
