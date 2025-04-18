'use client';

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from 'react';
import {signOut} from "next-auth/react";

export function AuthProvider({children}: {
    children: ReactNode;
}) {
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.error === "RefreshTokenError") {
            signOut();
        }
    }, [session, router]);

    return <>{children}</>;
}
