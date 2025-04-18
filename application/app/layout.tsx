import type {Metadata} from "next";
import "./globals.css";
import "./extra.css";
import LayoutClient from "./components/LayoutClient";
import {SessionProvider} from "next-auth/react";
import {AuthProvider} from "@/components/root/AuthProvider";

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
        <LayoutClient>
            <SessionProvider>
                <AuthProvider>{children}</AuthProvider>
            </SessionProvider>
        </LayoutClient>
        </html>
    );
}
