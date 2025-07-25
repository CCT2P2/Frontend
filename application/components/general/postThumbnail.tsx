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
import {useUISettings} from "@/app/store/useUISettings";
import {
    ChevronUp,
    ChevronDown,
    Ellipsis,
    Share,
    MessageSquareText,
} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import {interactDislike, interactLike} from "@/lib/actions/vote";
import {cn} from "@/lib/utils";
import {formatDistanceToNow} from "date-fns";

interface PostData {
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
    img: string;
    comment_count: number;
    voteState: "like" | "dislike" | "none";
    author: {
        username: string;
        imagePath: string;
        isAdmin?: number;
    };
    community: {
        name: string;
        com_id: number;
    }
}

export default function PostThumbnail({
                                          postData
                                      }: { postData: PostData }) {
    const {padding} = useUISettings();
    const [voteState, setVoteState] = useState<"like" | "dislike" | "none">(
        postData.voteState,
    );
    const initialVoteState = postData.voteState;
    const date = new Date(Date.parse(postData.timestamp));

    return (
        <Card
            className={`border-secondary/50 flex flex-col ${padding} has-[.postLink:hover]:border-secondary duration-200 has-[#postLink:hover]:faint-glow-secondary`}>
            <Link href={`/post/${postData.post_id}`} className={"absolute w-full h-full right-0" +
                " top-0 postLink"}></Link>
            <div className={"flex flex-row gap-6 justify-between"}>
                <div className={"flex flex-col gap-6 w-full"}>
                    <CardHeader>
                        <CardTitle>{postData.title}</CardTitle>
                        <CardDescription className={"z-10 w-fit"}>
                            Posted in <Link href={`/forum/${postData.community.com_id}`}
                                            className={"text-secondary/75 hover:underline"}>{postData.community.name}</Link>
                            {` · ${formatDistanceToNow(date)} ago`}
                        </CardDescription>
                        <CardDescription className={"z-10 w-fit"}>
                            By <Link href={`/user/${postData.auth_id}`}
                                     className={"text-secondary/75 hover:underline"}>{postData.author.username}</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href={`/post/${postData.post_id}`} className={"flex flex-col gap-6"}>
                            {postData.img && (
                                <div className={"flex justify-center relative overflow-hidden rounded-xl postLink" +
                                    " cursor-pointer"}>

                                    <div
                                        className={"absolute w-full h-full blur-3xl bg-cover bg-no-repeat" +
                                            " rounded-xl brightness-30"}
                                        style={{backgroundImage: `url('${postData.img}')`}}
                                    >
                                    </div>
                                    <div className="w-fit max-w-full z-10">
                                        <Image
                                            src={postData.img}
                                            alt={"post Image"}
                                            width={1000}
                                            height={300}
                                            style={{
                                                maxHeight: "52rem",
                                                height: "auto",
                                                width: "auto"
                                            }}
                                            className={"object-contain"}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={"line-clamp-5 full wrap-anywhere"}>{
                                postData.main_text
                                    .split("\n")
                                    .map((line, i) => {
                                        if (line.length === 0) return <br key={i}/>;
                                        return <p key={i}>{line}</p>
                                    })
                            }</div>
                        </Link>
                    </CardContent>
                </div>
                <div className={"flex flex-col gap-2 mr-6 content-center"}>
                    <Button
                        variant={"ghost"}
                        onClick={() => interactLike(voteState, setVoteState, postData.post_id)}
                        className={cn(
                            "z-10",
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
                        onClick={() => interactDislike(voteState, setVoteState, postData.post_id)}
                        className={cn(
                            "z-10",
                            voteState === "dislike" &&
                            "dark:bg-secondary/70 hover:dark:bg-secondary/90" +
                            " dark:text-black",
                        )}
                    >
                        <ChevronDown className={"size-6"}/>
                    </Button>
                </div>
            </div>
            <CardFooter className={"justify-between px-3"}>
                <Link href={`/post/${postData.post_id}`} className={"z-10"}>
                    <Button variant={"ghost"} className={""}>
                        <MessageSquareText className={"size-6"}/>
                        <span className={"text-center text-white"}>{postData.comment_count}</span>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
