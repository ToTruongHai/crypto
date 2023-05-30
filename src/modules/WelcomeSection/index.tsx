"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const WelcomeSection = (props: Props) => {
  const { push } = useRouter();
  return (
    <section className="h-96">
      <div className="flex h-full w-full py-8">
        <div className="w-4/6 flex flex-col justify-center item-center gap-5">
          <h1 className="text-5xl font-bold text-white">
            Welcome to Extobe Exchange!
          </h1>
          <span className="font-bold text-1xl">
            Trade cryptocurrencies safely, quickly, and easily
          </span>
          <div>
            <button
              className="w-4/12 h-12 rounded bg-secondary-color"
              onClick={() => push("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="w-2/6">
          <Image
            src="https://extobe.com/svg//home/image-banner-light.svg"
            alt="welcome"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
