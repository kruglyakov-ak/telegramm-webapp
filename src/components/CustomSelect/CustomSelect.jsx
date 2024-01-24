import { useEffect, useRef, useState } from "react";
import { OptionEl } from "./components/Option/OptionEl";
import "./CustomSelect.css";

const CustomSelect = ({
  selected,
  options,
  placeholder,
  onChange,
  onClose,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value) => {
    setIsOpen(false);
    onChange?.(value);
  };

  const selectClikHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`selectWrapper ${className})`}
      ref={rootRef}
      data-is-active={isOpen}
    >
      <div className="selectValueWrapper" onClick={selectClikHandler}>
        <div
          className="placeholder"
          data-selected={!!selected?.value}
          role="button"
          tabIndex={0}
          ref={placeholderRef}
        >
          {selected?.label || placeholder}
        </div>

        <div className="arrow" onClick={selectClikHandler}>
          <svg
            onClick={selectClikHandler}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-ember-extension="1"
          >
            <path
              d="M7 18L15 12L23 18"
              stroke="var(--color-text)"
              stroke-width="3"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="select">
          {options.map((option, index) => (
            <OptionEl
              key={option.value + index}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
