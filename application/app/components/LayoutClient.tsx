"use client";

import { useUISettings } from "../store/useUISettings";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { bg } = useUISettings();

  const bgImage = bg === 1 ? "url('/bg1.svg')" : "";

  return (
    <body
      className={`${inter.className} antialiased bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: bgImage }}
    >
      {children}
    </body>
  );
}
