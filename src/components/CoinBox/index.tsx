import React from "react";

type Props = {
  coinDetail: any;
  className?: string;
};

const CoinBox = ({ coinDetail, className }: Props) => {
  const {
    CN_Name,
    CN_Slug,
    CN_Symbol,
    CN_Total_Supply,
    CN_Rank,
    CN_Price,
    CN_Num_Market_Pairs,
    CN_Circulating_Supply,
    CN_Image,
  } = coinDetail ?? {};

  return (
    <div className={`w-2/6 border border-secondary-color p-4 ${className}`}>
      <div className="mb-12">
        <img
          src={CN_Image}
          alt="welcome"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div>
        <span className="inline-block w-32">Name: </span>
        <span> {CN_Name}</span>
      </div>
      <div>
        <span className="inline-block w-32">Slug: </span>
        <span> {CN_Slug}</span>
      </div>
      <div>
        <span className="inline-block w-32">Symbol: </span>
        <span> {CN_Symbol}</span>
      </div>

      <div>
        <span className="inline-block w-32">Total Supply: </span>
        <span> {CN_Total_Supply}</span>
      </div>
      <div>
        <span className="inline-block w-32">Rank: </span>
        <span> {CN_Rank}</span>
      </div>
      <div>
        <span className="inline-block w-32">Price: </span>
        <span> {CN_Price.toLocaleString()} $</span>
      </div>
      <div>
        <span className="inline-block w-32">Market Pairs: </span>
        <span> {CN_Num_Market_Pairs}</span>
      </div>
      <div>
        <span className="inline-block w-32">Circulating: </span>
        <span> {CN_Circulating_Supply}</span>
      </div>
    </div>
  );
};

export default CoinBox;
