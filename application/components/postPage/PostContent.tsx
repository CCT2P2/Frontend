import {
    GetCommunityResponse,
    GetPostResponse,
    GetUserProfileResponse,
} from "@/lib/apiTypes";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
    ChevronDown,
    ChevronUp,
    Ellipsis,
    MessageSquareText,
    Share,
} from "lucide-react";
import {useState} from "react";
import VoteAction from "@/lib/actions/voteAction";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {interactDislike, interactLike} from "@/lib/actions/vote";

interface Props {
    postData: GetPostResponse;
}

export default function PostContent({postData}: Props) {
    const [voteState, setVoteState] = useState<"like" | "dislike" | "none">(
        postData.voteState,
    );
    const initialVoteState = postData.voteState;

    return (
        <Card className={`border-secondary/50 flex flex-col`}>
            <div className={"flex flex-row gap-6 justify-between"}>
                <div className={"flex flex-col gap-6 w-full"}>
                    <CardHeader>
                        <CardTitle>{postData.title}</CardTitle>
                        <CardDescription>
                            Posted in{" "}
                            <Link href={`/forum/${postData.community.com_id}`}
                                  className={"text-secondary/75 hover:underline"}>
                                {postData.community.name ?? "error getting community"}
                            </Link>
                        </CardDescription>
                        <CardDescription>
                            By{" "}
                            <Link href={`/user/${postData.author.auth_id}`}
                                  className={"text-secondary/75 hover:underline"}>
                                {postData.author.username ?? "error getting" + " author"}
                            </Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"flex flex-col gap-6"}>
                        {postData.Img && (
                            <div className={""}>
                                <Image
                                    src={postData.Img}
                                    alt={"post Image"}
                                    width={1000}
                                    height={1000}
                                    className={"rounded-xl"}
                                />
                            </div>
                        )}
                        <p>{postData.main_text}</p>
                    </CardContent>
                </div>
                <div className={"flex flex-col gap-2 mr-6 content-center"}>
                    <Button
                        variant={"ghost"}
                        onClick={() => interactLike(voteState, setVoteState, postData.id)}
                        className={cn(
                            voteState === "like" &&
                            "dark:bg-secondary/70 hover:dark:bg-secondary/90" +
                            " dark:text-black",
                        )}
                    >
                        <ChevronUp className={"size-6"}/>
                    </Button>
                    {(() => {
                        let votes = postData.likes - postData.dislikes;
                        if (initialVoteState === "dislike") votes++;
                        if (initialVoteState === "like") votes--;
                        if (voteState === "dislike") votes--;
                        else if (voteState === "like") votes++;

                        return <span className={"text-center"}>{votes}</span>;
                    })()}
                    <Button
                        variant={"ghost"}
                        onClick={() => interactDislike(voteState, setVoteState, postData.id)}
                        className={cn(
                            voteState === "dislike" &&
                            "dark:bg-secondary/70 hover:dark:bg-secondary/90" +
                            " dark:text-black",
                        )}
                    >
                        <ChevronDown className={"size-6"}/>
                    </Button>
                </div>
            </div>
            <CardFooter className={"justify-between"}>
                <Button variant={"ghost"}>
                    <MessageSquareText className={"size-6"}/>
                    <span className={"text-center text-white"}>
						{postData.comment_count}
					</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
