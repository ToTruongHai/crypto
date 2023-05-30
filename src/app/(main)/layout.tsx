import MainLayoutHeader from "@/modules/MainLayout/Header";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import MainLayoutFooter from "@/modules/MainLayout/Footer";
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto",
  description: "Crypto market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-color text-white`}>
        <ApolloWrapper>
          <MainLayoutHeader />
          <div className="max-w-screen-xl w-full mx-auto">{children}</div>
          <MainLayoutFooter />
        </ApolloWrapper>
      </body>
    </html>
  );
}
