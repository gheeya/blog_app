import React from "react";

function Select({ options = [], name, className, ...props }) {
  return (
    <select className={`${className}`} name={name} {...props}>
      {options.map((option) => {
        return (
          <option name={option} key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
