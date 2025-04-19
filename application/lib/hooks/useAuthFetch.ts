'use client';

import {useCallback, useEffect, useState} from "react";
import {Session} from "next-auth";
import {useCurrentSession} from "@/lib/hooks/useCurrentSession";
import fetchWithAuth from "@/lib/data/authFetch";

export function useAuthFetch<T>(endpoint: string, dependencies: unknown[] = []) {
    const [result, setResult] = useState<{
        status: number;
        data?: T;
        isLoading: boolean;
        error?: string;
    }>({
        status: 0,
        isLoading: true
    });

    const {session, status} = useCurrentSession();

    useEffect(() => {
        async function fetchData() {
            if (!session) {
                return;
            }

            try {
                const response = await fetchWithAuth(session, endpoint);
                console.log(response);
                setResult({
                    status: response.status,
                    data: response.data,
                    isLoading: false
                });
            } catch (error) {
                setResult({
                    status: 0,
                    isLoading: false,
                    error: (error as Error).message
                });
            }
        }

        fetchData();
    }, [endpoint, session, ...dependencies]);

    return result;
}
