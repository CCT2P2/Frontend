"use client";

import { use, useState, useEffect } from "react";
import ForumList from "@/components/forumPage/ForumList";
import {
  ForumName,
  ForumTagsPanel,
} from "@/components/forumPage/Forum3rdPanel";
import { useUISettings } from "@/app/store/useUISettings";
import PostList from "@/components/forumPage/PostList";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { GetCommunityResponse } from "@/lib/apiTypes";
import LoadingSpinner from "@/components/general/loadingSpinner";

interface Props {
  params: Promise<{ id: string }>;
}

interface Community {
  names: string;
  communityID: number;
  description: string;
}

export default function Home({ params }: Props) {
  const forumId = use(params).id;

  const { padding } = useUISettings();
  const {
    data: forum,
    isLoading,
    error,
  } = useAuthFetch<GetCommunityResponse>(`/api/community/details/${forumId}`);

  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (isLoading && showSpinner) return <LoadingSpinner />;
  if (isLoading) return null;

  if (error || !forum) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Failed to load user profile</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  console.log("FORUM", forum);

  return (
    <div className={`ml-auto px-${padding} py-${padding} w-full`}>
      <div className="flex justify-center gap-6">
        {/* Sidebar */}
        <div className="shrink-0 sticky top-20 h-full max-w-80 w-[15%]">
          <ForumList />
        </div>

        {/* Main Content */}
        <div className="shrink-1 max-w-350 w-[60%] mt-5">
          <PostList />
        </div>

        {/* Extra panel or content */}
        <div className="shrink-0 max-w-80 sticky top-20 h-full w-[15%]">
          <ForumName name={forum.name} description={forum.description} />
          <ForumTagsPanel />
        </div>
      </div>
    </div>
  );
}
