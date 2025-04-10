import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "./extra.css";

const inter = Inter({subsets: ["latin"]});
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
        <body className={`${inter.className} antialiased`}>
        {children}
        </body>
        </html>
    );
}
