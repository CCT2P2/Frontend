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
    ChevronUpIcon,
    ChevronDownIcon,
    ShareIcon,
    ChatBubbleBottomCenterTextIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline"

interface Props {
    postTitle: string;
    postImagePath?: string;
    postContent: string;
    community: string;
    author: string;
    votes: number;
    comments: number;
}

export default function PostThumbnail({
                                          postContent,
                                          postImagePath,
                                          postTitle,
                                          community,
                                          author,
                                          votes,
                                          comments,
                                          backgroundColor,
                                      }: Props & {
    backgroundColor: string;
}) {
    const {padding, paddingButton} = useUISettings();

    return (
        <Card
            className={`border-secondary/50 flex flex-col ${backgroundColor} ${padding}`}
        >
            <div className={"flex flex-row gap-6 justify-between"}>
                <div className={"flex flex-col gap-6"}>
                    <CardHeader>
                        <CardTitle>{postTitle}</CardTitle>
                        <CardDescription>
                            Posted in <span className={"text-secondary/75"}>{community}</span>
                        </CardDescription>
                        <CardDescription>
                            By <span className={"text-secondary/75"}>{author}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"flex flex-col gap-6"}>
                        {postImagePath && (
                            <div className={""}>
                                <Image
                                    src={postImagePath}
                                    alt={"post Image"}
                                    width={1000}
                                    height={1000}
                                    className={"rounded-xl"}
                                />
                            </div>
                        )}
                        <p>{postContent}</p>
                    </CardContent>
                </div>
                <div className={"flex flex-col gap-2 mr-6 content-center"}>
                    <Button variant={"ghost"} className={paddingButton}>
                        <ChevronUpIcon className={"size-6"}/>
                    </Button>
                    <span className={"text-center"}>{votes}</span>
                    <Button variant={"ghost"} className={paddingButton}>
                        <ChevronDownIcon className={"size-6"}/>
                    </Button>
                </div>
            </div>
            <CardFooter className={"justify-between"}>
                <Button variant={"ghost"} className={paddingButton}>
                    <ChatBubbleBottomCenterTextIcon className={"size-6"}/>
                    <span className={"text-center text-white"}>{comments}</span>
                </Button>
                <div className={"flex gap-6"}>
                    <Button variant={"ghost"} className={paddingButton}>
                        <ShareIcon className={"size-5"}/>
                    </Button>
                    <Button variant={"ghost"} className={paddingButton}>
                        <EllipsisHorizontalIcon className={"size-6"}/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
