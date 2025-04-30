import VoteAction from "@/lib/actions/voteAction";
import {Dispatch, SetStateAction} from "react";

export async function interactLike(
    voteState: string,
    setVoteState: Dispatch<SetStateAction<"like" | "none" | "dislike">>,
    postId: number
): Promise<void> {
    if (voteState === "like") {
        setVoteState("none");
        await VoteAction(postId, "none");
        return;
    }
    setVoteState("like");
    await VoteAction(postId, "like");
}

export async function interactDislike(
    voteState: string,
    setVoteState: Dispatch<SetStateAction<"like" | "none" | "dislike">>,
    postId: number
): Promise<void> {
    if (voteState === "dislike") {
        setVoteState("none");
        await VoteAction(postId, "none");
        return;
    }
    setVoteState("dislike");
    await VoteAction(postId, "dislike");
}