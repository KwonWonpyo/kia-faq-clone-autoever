import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

export const metadata: Metadata = {
  title: "서비스 도입 FAQ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
