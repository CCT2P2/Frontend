import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUISettings } from "@/app/store/useUISettings";
import {
	ChevronUp,
	ChevronDown,
	Ellipsis,
	Share,
	MessageSquareText,
} from "lucide-react";

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
}: Props) {
	const { padding } = useUISettings();

	return (
		<Card className={`border-secondary/50 flex flex-col ${padding}`}>
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
						<p className={"line-clamp-5"}>{postContent}</p>
					</CardContent>
				</div>
				<div className={"flex flex-col gap-2 mr-6 content-center"}>
					<Button variant={"ghost"}>
						<ChevronUp className={"size-6"} />
					</Button>
					<span className={"text-center"}>{votes}</span>
					<Button variant={"ghost"}>
						<ChevronDown className={"size-6"} />
					</Button>
				</div>
			</div>
			<CardFooter className={"justify-between"}>
				<Button variant={"ghost"}>
					<MessageSquareText className={"size-6"} />
					<span className={"text-center text-white"}>{comments}</span>
				</Button>
			</CardFooter>
		</Card>
	);
}
