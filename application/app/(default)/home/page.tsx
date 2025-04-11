"use client";

import HomePostList from "@/components/homePage/homePostList";
import HomeForumList from "@/components/homePage/homeForumList";
import {
  HomeForumName,
  HomeForumTagsPanel,
} from "@/components/homePage/homeForum3rdPanel";

export default function Home() {
  let bg_col;
  if (blur == 1) {
    bg_col = "bg-gray-800/10";
  } else if (blur == 0) {
    bg_col = "bg-black";
  }

  return (
    <div className="ml-auto px-4 py-5 w-full">
      <div className="flex justify-center gap-6">
        {/* Sidebar */}
        <div className="shrink-0 sticky top-20 h-full max-w-80 w-[15%]">
          <HomeForumList backgroundColor={bg_col} />
        </div>

        {/* Main Content */}
        <div className="shrink-1 max-w-350 w-[60%]">
          <HomePostList backgroundColor={bg_col} />
        </div>

        {/* Extra panel or content */}
        <div className="shrink-0 max-w-80 sticky top-20 h-full w-[15%]">
          <HomeForumName backgroundColor={bg_col} />
          <HomeForumTagsPanel backgroundColor={bg_col} />
        </div>
      </div>
    </div>
  );
}
