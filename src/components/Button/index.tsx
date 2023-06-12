import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => {} | void;
  children: any;
  style?: any
};

const Button = ({ type, className, onClick, children, style }: Props) => {
  return (
    <button
      type={type}
      className={`bg-secondary-color px-5 py-2 rounded hover:pointer ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
