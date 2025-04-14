"use client";

import HomeForumList from "@/components/homePage/homeForumList";
import {
    HomeForumName,
    HomeForumTagsPanel,
} from "@/components/homePage/homeForum3rdPanel";
import {useUISettings} from "../../store/useUISettings";
import HomePostList from "@/components/homePage/homePostList";

export default function Home() {
    const {padding} = useUISettings();

    return (
        <div className={`ml-auto px-${padding} py-${padding} w-full`}>
            <div className="flex justify-center gap-6">
                {/* Sidebar */}
                <div className="shrink-0 sticky top-20 h-full max-w-80 w-[15%]">
                    <HomeForumList/>
                </div>

                {/* Main Content */}
                <div className="shrink-1 max-w-350 w-[60%] mt-5">
                    <HomePostList/>
                </div>

                {/* Extra panel or content */}
                <div className="shrink-0 max-w-80 sticky top-20 h-full w-[15%]">
                    <HomeForumName/>
                    <HomeForumTagsPanel/>
                </div>
            </div>
        </div>
    );
}
