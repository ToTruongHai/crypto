/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import "@/styles/global.css";
import Link from "next/link";
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto",
  description: "Crypto market",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <div className="flex w-full h-screen">
            <div className="w-2/5 bg-red flex relative justify-center items-center">
              <img
                className="w-full h-full object-center absolute top-0 left-0 z-[-1]"
                src="https://extobe.com/img/auth/image-login.png"
                alt="..."
              />
              <div className="">
                <h1 className="text-4xl font-bold text-primary-color">
                  Extobe Account Login
                </h1>
                <span>
                  Welcome back! Log In with your Email, Phone number or QR code
                </span>
              </div>
            </div>
            <div className="w-3/5 bg-dark-color text-white relative flex justify-center items-center">
              <div className="absolute top-5 left-5">
                <Link href="/">&#8592; Back</Link>
              </div>

              {children}
            </div>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
