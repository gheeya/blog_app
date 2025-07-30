import React from "react";

function Button({ children = "Button", className, type, ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-1 min-w-24 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
