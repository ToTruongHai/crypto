import { getCurrencyIcon } from "@/ultis/helpers";

/* eslint-disable @next/next/no-img-element */
export const columns = [
  {
    title: "Currency Buy With",
    dataIndex: "HSR_currency",
    customThCss: "px-2",
    render: (text: any) => {
      const currencyIcon = getCurrencyIcon(text);
      return (
        <div className="px-2 flex items-center justify-start gap-3">
          <img
            src={currencyIcon}
            alt="currency icon"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
            }}
          />
          <span style={{ height: "fit-content" }}>{text}</span>
        </div>
      );
    },
  },
  {
    title: "Symbol",
    dataIndex: "HSR_symbol",
  },
  {
    title: "Pay Price",
    dataIndex: "HSR_paid",
    render: (text: any) => <span>{text.toLocaleString()}</span>,
  },
  {
    title: "Quantity Buy",
    dataIndex: "HSR_quantity",
  },
];

export const columnsCoin = [
  {
    title: "Symbol",
    dataIndex: "htr_HSR_symbol",
  },
  {
    title: "Paid",
    dataIndex: "paid",
    render: (text: any) => <span>{text.toLocaleString()}</span>,
  },
  {
    title: "Quantity",
    dataIndex: "quantityBought",
  },
];
