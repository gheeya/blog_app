import React, { useId } from "react";

function Select({ options = [], name, className, label, ...props }) {
  const id = useId();
  return (
    <div className="flex flex-row justify-between items-center w-full">
      {label && (
        <label className="mr-2 text-md font-[500] ml-5" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        className={`border-1 border-gray-400 min-w-24 h-9 py-2 pl-2 w-80 mr-5 ${className}`}
        name={name}
        {...props}
      >
        {options.map((option) => {
          return (
            <option name={option} key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
