import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import {GetMultiplePostsResponse, GetPostResponse} from "@/lib/apiTypes";
import {notFound} from "next/navigation";
import LoadingSpinner from "@/components/general/loadingSpinner";
import Link from "next/link";
import {formatDistanceToNow} from 'date-fns';
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {interactDislike, interactLike} from "@/lib/actions/vote";
import {cn} from "@/lib/utils";
import {ChevronDown, ChevronUp} from "lucide-react";

interface CommentData {
    post_id: number;
    title: string;
    main_text: string;
    auth_id: number;
    com_id: number;
    timestamp: string;
    likes: number;
    dislikes: number;
    post_id_ref: number;
    comment_flag: boolean;
    comment_count: number;
    img: string;
    voteState: "like" | "dislike" | "none";
    author: {
        username: string;
        imagePath: string;
        isAdmin?: number;
    };
}

export default function Comments({postId}: { postId: number }) {
    const params = new URLSearchParams();
    params.append("limit", "100");
    params.append("getComments", "true");
    params.append("getPosts", "false");
    params.append("sortOrder", "asc");
    params.append("parentPostId", postId.toString());

    const {
        data: commentsData,
        isLoading,
        status,
        error
    } = useAuthFetch<GetMultiplePostsResponse>(`/api/post/posts?${params.toString()}`);

    if (isLoading) return <LoadingSpinner absolute={false}/>

    if (error || !commentsData) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Failed to load comments :c</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className={"flex flex-col gap-6"}>
            {commentsData.posts.map((commendData) => (
                <Comment commentData={commendData} key={commendData.post_id}/>
            ))}
        </div>
    )
}

export function Comment({commentData}: { commentData: CommentData }) {
    const [voteState, setVoteState] = useState<"like" | "dislike" | "none">(
        commentData.voteState,
    );
    const initialVoteState = commentData.voteState;
    const date = new Date(Date.parse(commentData.timestamp));

    return (
        <div className={"flex items-center"}>
            <div className={"flex flex-col gap-1 mr-6 content-center self-center h-full"}>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => interactLike(voteState, setVoteState, commentData.post_id)}
                    className={cn(
                        voteState === "like" &&
                        "dark:bg-secondary/70 hover:dark:bg-secondary/90" +
                        " dark:text-black",
                    )}
                >
                    <ChevronUp className={"size-4"}/>
                </Button>
                {(() => {
                    let votes = commentData.likes - commentData.dislikes;
                    if (initialVoteState === "dislike") votes++;
                    if (initialVoteState === "like") votes--;
                    if (voteState === "dislike") votes--;
                    else if (voteState === "like") votes++;

                    return <span className={"text-center text-sm"}>{votes}</span>;
                })()}
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => interactDislike(voteState, setVoteState, commentData.post_id)}
                    className={cn(
                        voteState === "dislike" &&
                        "dark:bg-secondary/70 hover:dark:bg-secondary/90" +
                        " dark:text-black",
                    )}
                >
                    <ChevronDown className={"size-4"}/>
                </Button>
            </div>
            <div className={"flex flex-col gap-2"}>
                <p className={"text-white/70"}>
                    By
                    <Link href={`/user/${commentData.auth_id}`} className={"text-secondary/70 hover:underline"}>
                        {" " + commentData.author.username + " "}
                    </Link>
                    · {formatDistanceToNow(date)} ago
                </p>
                <p>{commentData.main_text}</p>
            </div>
        </div>
    )
}