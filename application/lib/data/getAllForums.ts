//TODO: Not in use anymore, remove later

import {useState, useEffect} from "react";
import {useCurrentSession} from "../hooks/useCurrentSession";
import {useAuthFetch} from "../hooks/useAuthFetch";

// Define type properly
interface Community {
    names: string;
    communityID: number;
    description: string;
}

export function useAllForums() {
    const [forums, setForums] = useState<
        | {
        status: number;
        data?: Community[];
    }
        | undefined
    >(undefined);

    const {status: sessionStatus, session} = useCurrentSession();
    const {fetchWithAuth} = useAuthFetch();

    useEffect(() => {
        async function fetchForums() {
            if (!session) {
                return;
            }

            const response = await fetchWithAuth(session, `/api/community/all`);
            setForums(response);
        }

        fetchForums();
    }, [sessionStatus, session, fetchWithAuth]);

    return forums;
}
