"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";
import { Link } from "lucide-react";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { GetAllCommunitiesResponse } from "@/lib/apiTypes";
import { useState } from "react";

export default function ForumList() {
  const {
    data: forums,
    isLoading,
    status,
    error,
  } = useAuthFetch<GetAllCommunitiesResponse>(`/api/community/all`); //todo: replace with user's communities instead of all
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
        {forums ? (
          forums.map((forum) => (
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
        ) : (
          <p>Loading forums...</p>
        )}
      </Card>
    </div>
  );
}
