"use client";

import ForumList from "@/components/forumPage/ForumList";
import {
  ForumName,
  ForumTagsPanel,
} from "@/components/forumPage/Forum3rdPanel";
import { useUISettings } from "@/app/store/useUISettings";
import PostList from "@/components/forumPage/PostList";

export default function Home() {
  const { padding } = useUISettings();

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
          <ForumName />
          <ForumTagsPanel />
        </div>
      </div>
    </div>
  );
}
