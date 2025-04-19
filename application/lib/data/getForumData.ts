import { useState, useEffect } from "react";
import { GetCommunityResponse } from "../apiTypes";
import { useCurrentSession } from "../hooks/useCurrentSession";
import { useAuthFetch } from "../hooks/useAuthFetch";

export function useForumData(forumId: string) {
  const [forumData, setForumData] = useState<
    | {
        status: number;
        data?: GetCommunityResponse;
      }
    | undefined
  >(undefined);

  const { status: sessionStatus, session } = useCurrentSession();
  const { fetchWithAuth } = useAuthFetch();

  useEffect(() => {
    async function fetchForumData() {
      if (!session) {
        return;
      }

      const response = await fetchWithAuth(
        session,
        `/api/community/details/${forumId}`,
      );
      setForumData(response);
    }

    fetchForumData();
  }, [forumId, sessionStatus, session, fetchWithAuth]);

  return forumData;
}
