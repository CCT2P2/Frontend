"use client";

import {useEffect, useState} from "react";
import {Card} from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SortingMenu from "@/components/general/sortingMenu";
import CreatePost from "@/components/general/createPost";
import {getSession} from "next-auth/react";
import Link from "next/link";

interface PostData {
    post_id: number;
    title: string;
    main_text: string;
    auth_id: number;
    com_id: number;
    timestamp: number;
    likes: number;
    dislikes: number;
    post_id_ref?: number;
    comment_flag: boolean;
    comment_count: number;
}

interface PostListProps {
    postCsv: string; // Either CSV string (e.g. "1,2,3") or "latest"
}

export default function PostList({postCsv}: PostListProps) {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Getting the session token
                const session = await getSession();

                if (!session?.accessToken) {
                    console.error("No access token found!");
                    return;
                }

                let response;

                // Fetching posts based on `postCsv`
                if (postCsv.toLowerCase() === "latest") {
                    response = await fetch("/api/post/posts?SortBy=timestamp&SortOrder=desc", {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.accessToken}`, // Add the token in the Authorization header
                            'Content-Type': 'application/json',
                        },
                    });
                } else {
                    const postIds = postCsv
                        .split(",")
                        .map((id) => parseInt(id.trim()))
                        .filter((id) => !isNaN(id));

                    if (postIds.length === 0) return;

                    response = await fetch(`/api/post/posts/by-ids?ids=${}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.accessToken}`,
                            'Content-Type': 'postIds.join(",")application/json',
                        },
                    });
                }

                if (!response.ok) throw new Error("Failed to fetch posts");

                const data = await response.json();
                setPosts(Array.isArray(data) ? data : data.posts); // Handle both API shapes
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, [postCsv]);

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
                    <CreatePost/>
                </div>

                <TabsContent value="home">
                    <div className="flex flex-col gap-8">
                        {posts.map((post) => (
                            <Link href={`/post/${post.post_id}`} key={post.post_id}>
                                <PostThumbnail
                                    postTitle={post.title}
                                    postContent={post.main_text}
                                    community={`Community #${post.com_id}`}
                                    author={`User #${post.auth_id}`}
                                    votes={post.likes - post.dislikes}
                                    comments={post.comment_count}
                                />
                            </Link>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    );
}
