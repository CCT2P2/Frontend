"use client";

import {Card} from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SortingMenu from "@/components/general/sortingMenu";

export default function UserPostList({
                                         backgroundColor,
                                     }: {
    backgroundColor: string;
}) {
    return (
        <Card
            className={`grow relative light-glow-primary col-span-3 ${backgroundColor} backdrop-blur-md`}
        >
            <Tabs defaultValue="posts" className={`px-10 py-6 gap-4`}>
                <TabsList className={`w-full bg-black/50`}>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="liked">Liked</TabsTrigger>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                </TabsList>
                <div className="flex items-center justify-between">
                    <SortingMenu/>
                </div>
                <TabsContent value={"posts"}>
                    <div className={"flex flex-col gap-8"}>
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
                </TabsContent>
            </Tabs>
        </Card>
    );
}