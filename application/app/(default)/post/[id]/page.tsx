"use client"

import {use} from "react";
import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import {GetCommunityResponse, GetPostResponse} from "@/lib/apiTypes";
import LoadingSpinner from "@/components/general/loadingSpinner";
import UserInfo from "@/components/userPage/userInfo";
import ForumList from "@/components/forumPage/ForumList";
import UserPostList from "@/components/userPage/userPostList";
import PostContent from "@/components/postPage/PostContent";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {notFound} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, Ellipsis, MessageSquareText, Share} from "lucide-react";
import CreateCommentForm from "@/components/forms/CreateCommentForm";
import Comments from "@/components/postPage/comments";

interface Props {
    params: Promise<{ id: string }>
}

export default function PostPage({params}: Props) {
    const postId = use(params).id;

    const {data: postData, isLoading, status, error} = useAuthFetch<GetPostResponse>(`/api/post/view/${postId}`);

    if (isLoading) return <PostPageSkeleton/>

    if (status === 404) return notFound();

    if (error || !postData) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Failed to load post :c</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    console.log(postData);
    return <PostPageLayout postData={postData}/>
};

function PostPageLayout({postData}: { postData: GetPostResponse }) {
    return (
        <div className={`grid grid-cols-4 gap-12 container mx-auto px-6 my-10`}>
            <ForumList/>
            <Card className={`grow relative light-glow-primary col-span-3 p-10`}>
                <PostContent postData={postData}/>
                <CreateCommentForm postId={postData.id} communityId={postData.community.com_id}/>
                <Comments postId={postData.id}/>
            </Card>
        </div>
    )
}

function PostPageSkeleton() {
    return (
        <div className={`grid grid-cols-4 gap-12 container mx-auto px-6 my-10`}>
            <div className="h-screen flex flex-col gap-3">
                <Card
                    className={`border-secondary gap-3 overflow-y-auto max-h-[80%] p-5`}
                >
                    <CardTitle>Forums</CardTitle>
                </Card>
            </div>
            <Card className={`grow relative light-glow-primary col-span-3 p-10`}>
                <Card className={`border-secondary/50 flex flex-col`}>
                    <div className={"flex flex-row gap-6 justify-between"}>
                        <div className={"flex flex-col gap-6 w-full"}>
                            <CardHeader className={"gap-4"}>
                                <CardTitle><Skeleton className={"h-8 w-full"}/></CardTitle>
                                <CardDescription>
                                    <Skeleton className={"h-3 w-32"}/>
                                </CardDescription>
                                <CardDescription>
                                    <Skeleton className={"h-3 w-20"}/>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className={"flex flex-col gap-6"}>
                                <Skeleton className={"h-96 w-full"}/>
                                <div className={"flex flex-col gap-2 w-full"}>
                                    <Skeleton className={"h-4 w-96"}/>
                                    <Skeleton className={"h-4 w-96"}/>
                                </div>
                            </CardContent>
                        </div>
                        <div className={"flex flex-col gap-2 mr-6 content-center"}>
                            <Button variant={"ghost"}>
                                <ChevronUp className={"size-6"}/>
                            </Button>
                            <span className={"text-center"}>0</span>
                            <Button variant={"ghost"}>
                                <ChevronDown className={"size-6"}/>
                            </Button>
                        </div>
                    </div>
                    <CardFooter className={"justify-between"}>
                        <Button variant={"ghost"}>
                            <MessageSquareText className={"size-6"}/>
                            {/*<span className={"text-center text-white"}>comments</span>*/}
                        </Button>
                        <div className={"flex gap-6"}>
                            <Button variant={"ghost"}>
                                <Share className={"size-5"}/>
                            </Button>
                            <Button variant={"ghost"}>
                                <Ellipsis className={"size-6"}/>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Card>
        </div>
    )
}