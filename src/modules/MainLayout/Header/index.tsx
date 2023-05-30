/* eslint-disable @next/next/no-img-element */
"use client";
import UserActions from "@/modules/UserActions";
import Link from "next/link";
import React, { useMemo } from "react";

type Props = {};

const pathRoute = [
  {
    path: "/payment",
    render: () => <label>Buy Crypto</label>,
  },
  {
    path: "/market",
    render: () => <label>Market</label>,
  },
];

const MainLayoutHeader = (props: Props) => {
  const renderPathRoute = useMemo(() => {
    return pathRoute.map((item, index) => {
      return (
        <Link href={item.path} key={index}>
          {item.render()}
        </Link>
      );
    });
  }, []);

  return (
    <section>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <div className="flex items-center">
              <Link href="/">
                <img
                  className="h-8 w-full mr-2"
                  src="https://extobe.com/img/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="text-white text-lg flex gap-5">
              {renderPathRoute}
            </div>
          </div>

          <div>
            <UserActions />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default MainLayoutHeader;
