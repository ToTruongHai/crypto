import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => {} | void;
  children: any;
};

const Button = ({ type, className, onClick, children }: Props) => {
  return (
    <button
      type={type}
      className={`bg-secondary-color px-5 py-2 rounded hover:pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
