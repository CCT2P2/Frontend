"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";
import { Link } from "lucide-react";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { GetAllCommunitiesResponse } from "@/lib/apiTypes";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/general/loadingSpinner";
export default function ForumList() {
  const {
    data: forums,
    isLoading,
    status,
    error,
  } = useAuthFetch<GetAllCommunitiesResponse>(`/api/community/all`);
  {
    /*TODO: Replace with User community ID lookup, and subsequent fetching of set IDs from community table */
  }

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // clean up if unmounted quickly
  }, []);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const { paddingButton, padding } = useUISettings();
  const filteredForums = forums?.slice(2);
  return (
    <div className="h-screen flex flex-col gap-3">
      <Card
        className={`p-${padding} border-secondary gap-3 overflow-y-auto max-h-[80%]`}
      >
        <CardTitle>Forums</CardTitle>
        {filteredForums ? (
          filteredForums.map((forum) => (
            <Card
              key={forum.communityID}
              className={`p-${paddingButton} transition-colors duration-200 hover:bg-secondary/15`}
              onClick={() =>
                (window.location.href = `/forum/${forum.communityID}`)
              }
            >
              <div>{forum.names}</div>
            </Card>
          ))
        ) : showLoading ? (
          <LoadingSpinner />
        ) : null}
      </Card>
    </div>
  );
}
