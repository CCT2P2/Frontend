"use client";

import { use, useEffect, useState } from "react";
import ForumList from "@/components/forumPage/ForumList";
import {
  ForumName,
  ForumTagsPanel,
} from "@/components/forumPage/Forum3rdPanel";
import { useUISettings } from "@/app/store/useUISettings";
import PostList from "@/components/forumPage/PostList";
import { getForumData } from "@/lib/data/getForumData";
import { GetCommunityResponse } from "@/lib/apiTypes"; // make sure this is correct

interface Props {
  params: { id: string };
}

export default function Home({ params }: Props) {
  const forumId = params.id;

  const [forumData, setForumData] = useState<GetCommunityResponse | null>(null);

  const { padding } = useUISettings();

  useEffect(() => {
    async function fetchData() {
      const data = await getForumData(forumId);
      setForumData(data);
    }
    fetchData();
  }, [forumId]);

  if (!forumData) {
    return <p className="text-white p-10">Loading...</p>;
  }

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
          <ForumName
            name={forumData.name}
            description={forumData.description}
          />
          <ForumTagsPanel />
        </div>
      </div>
    </div>
  );
}
