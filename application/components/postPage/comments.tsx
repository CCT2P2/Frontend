import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import {GetMultiplePostsResponse, GetPostResponse} from "@/lib/apiTypes";
import {notFound} from "next/navigation";
import LoadingSpinner from "@/components/general/loadingSpinner";
import Link from "next/link";
import {formatDistanceToNow} from 'date-fns';

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
        <div className={"flex flex-col gap-4"}>
            {commentsData.posts.map((commendData) => (
                <Comment commentData={commendData} key={commendData.post_id}/>
            ))}
        </div>
    )
}

export function Comment({commentData}: { commentData: CommentData }) {
    const date = new Date(Date.parse(commentData.timestamp));

    return (
        <div>
            <p className={"text-white/70"}>
                By
                <Link href={`/user/${commentData.auth_id}`} className={"text-secondary/70 hover:underline"}>
                    {" " + commentData.author.username + " "}
                </Link>
                · {formatDistanceToNow(date)} ago
            </p>
            <p>{commentData.main_text}</p>
        </div>
    )
}