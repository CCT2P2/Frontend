"use client";

import UserPostList from "@/components/userPage/userPostList";
import HomeForumList from "@/components/homePage/homeForumList";
import {
  HomeForumName,
  HomeForumTagsPanel,
} from "@/components/homePage/homeForum3rdPanel";
import { useUISettings } from "../../store/useUISettings";

export default function Home() {
  const { blur, padding } = useUISettings();
  let bg_col: string = "bg-black";
  if (blur == true) {
    console.log("Blur is true");
    bg_col = "bg-stone-800/10";
  }

  return (
    <div className={`ml-auto px-${padding} py-${padding} w-full`}>
      <div className="flex justify-center gap-6">
        {/* Sidebar */}
        <div className="shrink-0 sticky top-20 h-full max-w-80 w-[15%]">
          <HomeForumList backgroundColor={bg_col} />
        </div>

        {/* Main Content */}
        <div className="shrink-1 max-w-350 w-[60%] mt-5">
          <UserPostList backgroundColor={bg_col} />
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
