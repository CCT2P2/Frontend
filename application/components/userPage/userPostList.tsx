import {Card} from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";

export default function UserPostList() {
    return (
        <Card className={"grow"}>
            <div className={"flex flex-col gap-8 p-10"}>
                <PostThumbnail
                    postTitle={"Epic"}
                    postContent={"Why am i making this post you might ask. I didnt, its just a figment of your imagination"}
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
    )
}