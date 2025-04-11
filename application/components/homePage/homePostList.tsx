"use client";
import { Card } from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import { PostSortButton } from "@/components/forms/formComponents";

function hexToAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HomePostList({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  const green = "#00ff88"; // Make sure `green` is defined

  return (
    <Card
      className={`border-primary w-full py-6 ${backgroundColor} backdrop-blur-md`}
    >
      <div className="flex gap-6 mx-10">
        <PostSortButton label="Personal" />
        <PostSortButton label="Popular" />
        <PostSortButton label="New" />
        <PostSortButton label="Rising" />
        <div className="py-3 ml-auto">
          <Card
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hexToAlpha(green, 0.2);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            className="py-3 border-green-500 transition-colors duration-200 bg-gray-500/20"
          >
            <button>+ New Post</button>
          </Card>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 px-10">
        <PostThumbnail
          postTitle={"Epic"}
          postContent={
            "Why am I making this post you might ask. I didn't, it's just a figment of your imagination"
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
