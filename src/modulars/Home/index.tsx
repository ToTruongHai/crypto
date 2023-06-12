/* eslint-disable @next/next/no-img-element */
"use client";
import Table from "@/components/Table";
import Tabs from "@/components/Tabs";
import WelcomeSection from "@/modules/WelcomeSection";
import { useRouter } from "next/navigation";
import React, { SetStateAction } from "react";

type Props = {
  data: any;
};

type Item = {
  label: string;
  tabId: number | SetStateAction<number>;
  customLabel?: () => {} | void;
  content: () => {} | void;
  defaultOpen?: boolean;
};

const columns = [
  {
    title: "Name",
    dataIndex: "CN_Name",
    customThCss: "px-2",
    render: (text: any, record: any) => (
      <div className="px-2 flex items-center justify-start gap-3">
        <img
          src={record?.CN_Image}
          alt="coin icon"
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
          }}
        />
        <span className={`${text}`} style={{ height: "fit-content" }}>{text}</span>
      </div>
    ),
  },
  {
    title: "Last Price",
    dataIndex: "CN_Price",
  },
  {
    title: "Total Supply",
    dataIndex: "CN_Total_Supply",
  },

  {
    title: "Markets",
    dataIndex: "CN_Num_Market_Pairs",
  },
];

const tabList = ({
  tableProps = {} as any,
  handleRowClick = (data: any) => {},
}) =>
  [
    {
      label: "Trending Coin",
      tabId: 0,
      content: () => {
        const { columns, data } = tableProps ?? {};
        return (
          <Table
            headerClass="bg-dark-color text-left h-16"
            rowClass="h-16 hover:bg-gray-500 rounded"
            columns={columns}
            dataSource={data}
            rowClick={handleRowClick}
          />
        );
      },
      defaultOpen: true,
    },
    {
      label: "New Coin",
      tabId: 1,
      content: () => {
        return <div>TEMP</div>;
      },
    },
    {
      label: "Top Gainers",
      tabId: 2,
      content: () => {
        return <div>TEMP 2</div>;
      },
    },
  ] satisfies Item[];

const Home = (props: Props) => {
  const router = useRouter();
  const coinList = props.data.coins ?? [];
  const tableProps = { columns, data: coinList };

  const handleRowClick = (data: any) => router.push(`/coin/${data.CN_Id}`);

  return (
    <div>
      <WelcomeSection />
      <Tabs tabItems={tabList({ tableProps, handleRowClick })} />
    </div>
  );
};

export default Home;
