import React from 'react';
import './Input.css';

const Input = ({ title, wrapperClassName = '', ...props }) => {
    return (
        <label className={`input-label ${wrapperClassName}`}>
        <span>{title}</span>
            <input className="input" {...props} />
        </label>
    );
};

export default Input;