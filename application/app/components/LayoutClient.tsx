"use client";

import {useUISettings} from "../store/useUISettings";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function LayoutClient({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const {bg} = useUISettings();

    const bgImage = bg === 1 ? "url('/bg1.svg')" : "";

    return (
        <body className={`${inter.className}`}>
        <div
            className={`h-screen w-screen fixed -z-10 antialiased bg-cover bg-center bg-no-repeat brightness-50`}
            style={{backgroundImage: bgImage}}
        ></div>
        {children}
        </body>
    );
}
