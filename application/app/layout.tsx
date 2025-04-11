import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./extra.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Gnuf",
  description: "Its literally Gnuf holy shit this is crazy",
};

let bg_image: string;
if (bg == 1) {
  bg_image = "url('/bg1.svg')";
} else if (bg == 0) {
  bg_image = "";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"dark"}>
      <body
        className={`${inter.className} antialiased bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: bg_image }}
      >
        {children}
      </body>
    </html>
  );
}
