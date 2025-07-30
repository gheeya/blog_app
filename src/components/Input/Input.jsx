import React from "react";
import { useId } from "react";

function Input({ label, ref, className, type = "text", ...props }) {
  const id = useId();
  return (
    <div className="flex flex-row justify-between items-center w-full">
      {label && (
        <label className="mr-2 text-md font-[500] ml-5" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className={`border-1 border-gray-400 min-w-24 h-9 py-2 pl-2 w-80 mr-5 ${className}`}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
