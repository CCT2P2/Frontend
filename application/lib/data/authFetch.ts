import {useCallback} from "react";
import {Session} from "next-auth";

export default async function fetchWithAuth(session: Session, url: string, options: RequestInit = {}) {
    if (!session?.accessToken) {
        throw new Error('No access token available');
    }

    const authOptions: RequestInit = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${session.accessToken}`,
        },
    };

    const response = await fetch(url, authOptions);

    if (!response.ok) {
        return {
            status: response.status,
        }
    }

    const responseData = await response.json();
    console.log("responseData", responseData);
    return {
        status: response.status,
        data: responseData,
    };
}