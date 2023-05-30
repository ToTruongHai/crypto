"use client";
import React, { SetStateAction, useMemo, useState } from "react";

type Item = {
  label: string;
  tabId: number | null;
  customLabel?: () => {} | void;
  content: () => {} | void;
  defaultOpen?: boolean;
};

type Props = {
  tabItems: Item[];
};

const Tabs = ({ tabItems }: Props) => {
  const [activeTab, setActiveTab] = useState<number | null>(
    tabItems?.[0]?.tabId
  );
  const renderTabsHeader = useMemo(() => {
    return tabItems?.map((item, index) => {
      if (typeof item.customLabel === "function") return item.customLabel();
      if (item?.defaultOpen && activeTab === null) setActiveTab(item?.tabId);
      return (
        <button
          key={index}
          className={`text-2xl ${
            activeTab === item.tabId ? "border-b border-white" : ""
          }`}
          onClick={() => setActiveTab(item.tabId)}
        >
          {item.label}
        </button>
      );
    });
  }, [tabItems, activeTab]);

  const renderTabsContent = useMemo(() => {
    const getActiveTab = tabItems.find((item) => item.tabId === activeTab);
    return (
      <div className="w-full h-auto">
        {getActiveTab?.content() as React.ReactNode}
      </div>
    );
  }, [activeTab, tabItems]);

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex gap-5">{renderTabsHeader as React.ReactNode}</div>
      <div className="">{renderTabsContent as React.ReactNode}</div>
    </div>
  );
};

export default Tabs;
