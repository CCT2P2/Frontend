import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Frown} from "lucide-react";

export default function NotFound() {
    return (
        <div className={"flex flex-col gap-4 items-center justify-center h-[calc(100vh-12rem)]"}>
            <Frown className={"size-16 text-gray-400"}/>
            <h2 className={"text-xl font-semibold"}>404 Not Found</h2>
            <p>A post with this ID doesn&apos;t exist</p>
            <Link
                href={'/forum/0'}
            >
                <Button variant={"outline"} size={"lg"}>Return home</Button>
            </Link>
        </div>
    )
}