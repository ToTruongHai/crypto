"use client";
import { isEmpty } from "@/ultis/helpers";
import React, { useEffect, useRef } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  value?: any;
  type?: string;
  valid?: {
    required: { value: boolean };
    min: { value: boolean };
    max: { value: boolean };
    from: { value: boolean };
    to: { value: boolean };
  };
  validation?: (e: any) => void;
  onBlur?: (e: any) => void;
  pattern?: string;
  inputmode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  defaultValue?: any;
  onChange?: (e: any) => {} | void;
};

const Input = ({
  name,
  placeholder,
  valid,
  validation = () => {},
  value,
  defaultValue,
  type,
  onBlur = () => {},
  pattern,
  inputmode,
  onChange = () => {},
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { required, min, max, from, to } = valid ?? {};

  const flag =
    required?.value || min?.value || max?.value || from?.value || to?.value;

  const handleOnBlur = (e: any) => {
    validation(e);
    return onBlur(e.target.value);
  };

  useEffect(() => {
    if (!isEmpty(defaultValue))
      if (inputRef.current !== null) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  return (
    <input
      ref={inputRef}
      className={`appearance-none block w-full bg-gray-200 text-gray-700
       ${flag ? "border  border-red-500 isHaveError" : ""} 
        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
      type={type}
      name={name}
      placeholder={placeholder}
      onBlur={(e: any) => handleOnBlur(e)}
      value={value}
      pattern={pattern}
      inputMode={inputmode}
      onChange={onChange}
    />
  );
};

export default Input;
