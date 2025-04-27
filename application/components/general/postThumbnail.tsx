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

    return (
        <Card className={`border-secondary/50 flex flex-col ${padding}`}>
            <Link href={`/post/${postData.post_id}`} className={"absolute w-full h-full"}></Link>
            <div className={"flex flex-row gap-6 justify-between"}>
                <div className={"flex flex-col gap-6"}>
                    <CardHeader>
                        <CardTitle>{postData.title}</CardTitle>
                        <CardDescription className={"z-10"}>
                            Posted in <Link href={`/forum/${postData.community.com_id}`}
                                            className={"text-secondary/75 hover:underline"}>{postData.community.name}</Link>
                        </CardDescription>
                        <CardDescription className={"z-10"}>
                            By <Link href={`/user/${postData.auth_id}`}
                                     className={"text-secondary/75 hover:underline"}>{postData.author.username}</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"flex flex-col gap-6"}>
                        {postData.img && (
                            <div className={""}>
                                <Image
                                    src={postData.img}
                                    alt={"post Image"}
                                    width={1000}
                                    height={1000}
                                    className={"rounded-xl"}
                                />
                            </div>
                        )}
                        <p className={"line-clamp-5"}>{postData.main_text}</p>
                    </CardContent>
                </div>
                <div className={"flex flex-col gap-2 mr-6 content-center"}>
                    <Button variant={"ghost"} className={"z-10"}>
                        <ChevronUp className={"size-6"}/>
                    </Button>
                    <span className={"text-center"}>{postData.likes - postData.dislikes}</span>
                    <Button variant={"ghost"} className={"z-10"}>
                        <ChevronDown className={"size-6"}/>
                    </Button>
                </div>
            </div>
            <CardFooter className={"justify-between"}>
                <Button variant={"ghost"} className={"z-10"}>
                    <MessageSquareText className={"size-6"}/>
                    <span className={"text-center text-white"}>{postData.comment_count}</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
