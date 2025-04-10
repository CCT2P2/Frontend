"use client";
import { Card } from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import { PostSortButton } from "@/components/forms/formComponents";
import { Postpone } from "next/dist/server/app-render/dynamic-rendering";
import { Poly } from "next/font/google";

function hexToAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const green = "#00ff00";

export default function HomePostList() {
  return (
    <Card className={"w-10/14 py-3"}>
      <div className="flex gap-6 mx-10">
        <PostSortButton label="Personal" />
        <PostSortButton label="Popular" />
        <PostSortButton label="New" />
        <PostSortButton label="Rising" />
        <div className="py-3 ml-auto">
          <Card
            style={{
              borderColor: green,
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hexToAlpha(green, 0.2);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            className="py-3 border-[${green}] transition-colors duration-200"
          >
            <button>+ New Post</button>
          </Card>
        </div>
      </div>
      <div className={"w-full flex flex-col gap-8 px-10"}>
        <PostThumbnail
          postTitle={"Epic"}
          postContent={
            "Why am i making this post you might ask. I didnt, its just a figment of your imagination"
          }
          community={"Whyy"}
          author={"literally_a_cat"}
          votes={20}
          comments={3}
        />
        <PostThumbnail
          postTitle={"Another post"}
          postContent={"Why are posts... posted?"}
          community={"BigQuestions"}
          author={"literally_a_cat"}
          votes={16}
          comments={12}
        />
        <PostThumbnail
          postTitle={"Another post???"}
          postContent={"Why are posts?"}
          postImagePath={"/example_post_img.jpg"}
          community={"wowsers"}
          author={"literally_a_cat"}
          votes={78}
          comments={15}
        />
      </div>
    </Card>
  );
}
