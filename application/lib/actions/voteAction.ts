import {getSession} from "next-auth/react";
import {VotePostRequest} from "@/lib/apiTypes";

export default async function VoteAction(postId: number, voteType: "like" | "dislike" | "none"): Promise<Error | void> {
    const session = await getSession();

    if (!session?.user) {
        return new Error("Invalid session smh");
    }

    const requestData: VotePostRequest = {
        userId: Number(session.user.id),
        voteType: voteType,
    }

    const response = await fetch(`/api/post/vote/${postId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        return new Error("Unable to vote");
    }
}