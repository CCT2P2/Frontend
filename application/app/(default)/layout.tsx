import React from "react";
import Header from "@/components/layouts/header";

export default function DefaultLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}