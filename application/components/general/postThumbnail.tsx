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
  return (
    <Card className={`border-secondary/50 flex flex-col ${backgroundColor}`}>
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
          <Button variant={"ghost"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </Button>
          <span className={"text-center"}>{votes}</span>
          <Button variant={"ghost"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
      <CardFooter className={"justify-between"}>
        <Button variant={"ghost"} className={""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <span className={"text-center text-white"}>{comments}</span>
        </Button>
        <div className={"flex gap-6"}>
          <Button variant={"ghost"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </Button>
          <Button variant={"ghost"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
