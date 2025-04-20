import {GetCommunityResponse, GetPostResponse, GetUserProfileResponse} from "@/lib/apiTypes";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, Ellipsis, MessageSquareText, Share} from "lucide-react";

interface Props {
    postData: GetPostResponse;
}

export default function PostContent({postData}: Props) {
    return (
        <Card className={`border-secondary/50 flex flex-col`}>
            <div className={"flex flex-row gap-6 justify-between"}>
                <div className={"flex flex-col gap-6 w-full"}>
                    <CardHeader>
                        <CardTitle>{postData.title}</CardTitle>
                        <CardDescription>
                            Posted in <span
                            className={"text-secondary/75"}>{postData.community.name ?? "error getting community"}</span>
                        </CardDescription>
                        <CardDescription>
                            By <span className={"text-secondary/75"}>{postData.author.username ?? "error getting" +
                            " author"}</span>
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
                    <Button variant={"ghost"}>
                        <ChevronUp className={"size-6"}/>
                    </Button>
                    <span className={"text-center"}>{postData.likes - postData.dislikes}</span>
                    <Button variant={"ghost"}>
                        <ChevronDown className={"size-6"}/>
                    </Button>
                </div>
            </div>
            <CardFooter className={"justify-between"}>
                <Button variant={"ghost"}>
                    <MessageSquareText className={"size-6"}/>
                    <span className={"text-center text-white"}>{postData.comment_count}</span>
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
    )
}