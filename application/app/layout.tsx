import type { Metadata } from "next";
import "./globals.css";
import "./extra.css";
import LayoutClient from "./components/LayoutClient";

export const metadata: Metadata = {
  title: "Gnuf",
  description: "Its literally Gnuf holy shit this is crazy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"dark"}>
      <LayoutClient>{children}</LayoutClient>
    </html>
  );
}
