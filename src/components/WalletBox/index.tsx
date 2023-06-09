/* eslint-disable @next/next/no-img-element */
import { isEmpty } from "@/ultis/helpers";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../Button";

type Wallet = {
  WL_Amount: string | number;
  WL_Name: string;
  className?: string;
  WL_Currency: string;
  WL_Id: any;
  WL_Image: any;
};

type Props = {
  onRadioSelect?: (value: any) => {} | void;
  walletOptions: Wallet[];
  defaultWallet?: string | number;
  selectable?: boolean;
  className?: string;
  handleAddFund?: (value: any) => {} | void;
  displayAddFund?: boolean;
};

const WalletBox = ({
  walletOptions,
  onRadioSelect = () => {},
  defaultWallet,
  selectable = false,
  className,
  handleAddFund = () => {},
  displayAddFund = false,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>("");

  useEffect(() => {
    if (!isEmpty(defaultWallet)) setSelectedOption(defaultWallet?.toString());
  }, [defaultWallet]);

  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
    return onRadioSelect(value);
  };

  const renderBox = useMemo(() => {
    return walletOptions?.map((item, index) => {
      return (
        <div
          key={index}
          className="flex items-center py-5 px-3 rounded border-secondary-color border justify-between"
          onClick={() => handleOptionChange(item.WL_Id.toString())}
        >
          <div className="flex items-center gap-3">
            <div
              className="mr-5"
              style={{ borderRadius: "50%", overflow: "hidden" }}
            >
              <img
                className="scale-150"
                src={item.WL_Image}
                alt="..."
                width={50}
                height={50}
              />
            </div>
            <label className="mr-2 flex justify-content items-center ">
              {selectable ? (
                <input
                  type="radio"
                  value={item.WL_Id.toString()}
                  checked={selectedOption === item.WL_Id.toString()}
                  className={`${item.className} w-5 h-5 mr-2`}
                  onChange={() => {}}
                />
              ) : (
                <></>
              )}
              {item.WL_Name}
            </label>
            <span>
              {item.WL_Amount.toLocaleString()} {item.WL_Currency}
            </span>
          </div>
          {displayAddFund ? (
            <div>
              <Button type="button" onClick={() => handleAddFund(item.WL_Id)}>
                Deposite
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    });
  }, [selectedOption, handleOptionChange]);

  return (
    <div className={` rounded ${className}`}>
      <div className="flex gap-5 flex-col">{renderBox}</div>

      {/* <div className="mt-4">
        {selectedOption && (
          <div className="p-2 ">
            Current Selected Wallet:{" "}
            {
              walletOptions.find((item: any) => item.value === selectedOption)
                ?.label
            }
          </div>
        )}
      </div> */}
    </div>
  );
};

export default WalletBox;
