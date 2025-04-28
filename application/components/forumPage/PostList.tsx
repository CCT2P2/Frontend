"use client";

import {useEffect, useState} from "react";
import {Card} from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SortingMenu from "@/components/general/sortingMenu";
import CreatePost from "@/components/general/createPost";
import {getSession} from "next-auth/react";
import Link from "next/link";
import {GetMultiplePostsResponse} from "@/lib/apiTypes";
import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import LoadingSpinner from "@/components/general/loadingSpinner";

interface PostListProps {
    postCsv: string; // Either CSV string (e.g. "1,2,3") or "latest"
    limit?: number; // Optional limit
    forumId: string;
}

export default function PostList({postCsv, limit, forumId}: PostListProps) {
    if (limit === undefined) {
        limit = 20;
    }

    const params = new URLSearchParams();
    params.append("Limit", limit.toString())

    if (Number(forumId) > 0) {
        params.append("CommunityId", forumId);
    }

    const {
        data: postsData,
        isLoading,
        status,
        error
    } = useAuthFetch<GetMultiplePostsResponse>(`/api/post/posts?${params.toString()}`);

    if (isLoading) return <LoadingSpinner absolute={false}/>

    if (error || !postsData) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Failed to load posts :c</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <Card className={`grow relative light-glow-primary col-span-3`}>
            <Tabs defaultValue="home" className={`px-10 py-6 gap-4`}>
                <TabsList className={`w-full bg-black/50`}>
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="discover">Discover</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>

                <div className="flex items-center justify-between">
                    <SortingMenu/>
                    <CreatePost forumId={forumId}/>
                </div>

                <TabsContent value="home">
                    <div className="flex flex-col gap-8">
                        {postsData.posts.map((post) => (
                            <PostThumbnail
                                postData={post}
                                key={post.post_id}
                            />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="discover" className="relative">
                    {/* Coming soon overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
						<span className="text-red-500 font-bold text-2xl text-center">
							COMING SOON
						</span>
                        <span className="text-red-400 font-semibold text-xs mt-2 text-center">
							(Lol, no it won't)
						</span>
                    </div>
                </TabsContent>
                <TabsContent value="popular" className="relative">
                    {/* Coming soon overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
						<span className="text-red-500 font-bold text-2xl text-center">
							COMING SOON
						</span>
                        <span className="text-red-400 font-semibold text-xs mt-2 text-center">
							(Lol, no it won't)
						</span>
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    );
}
