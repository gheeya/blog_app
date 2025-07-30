import React from "react";
import { useId } from "react";

function Input({ label, ref, className, type = "text", ...props }) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        ref={ref}
        className={`${className}`}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
