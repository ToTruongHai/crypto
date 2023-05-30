"use client";
import Button from "@/components/Button";
import CoinBox from "@/components/CoinBox";
import { getParamsURL } from "@/ultis/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  coinDetail?: any;
};

const CointDetail = ({ coinDetail }: Props) => {
  const { CN_Id } = coinDetail ?? {};
  const router = useRouter();

  const handleBuyCoin = () => {
    const param = getParamsURL({ coinId: CN_Id });
    router.push("/payment" + param);
  };

  return (
    <div className="py-5">
      <div className="flex gap-5">
        <div className="w-4/6">
          <Button type="button" onClick={handleBuyCoin}>
            Buy This Coin
          </Button>
        </div>

        <CoinBox coinDetail={coinDetail} />
      </div>
    </div>
  );
};

export default CointDetail;
