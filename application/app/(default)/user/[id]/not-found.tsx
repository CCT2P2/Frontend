import {FaceFrownIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className={"flex flex-col gap-4 items-center justify-center gap-2 h-[calc(100vh-12rem)]"}>
            <FaceFrownIcon className={"w-10 text-gray-400"}/>
            <h2 className={"text-xl font-semibold"}>404 Not Found</h2>
            <p>A user with this ID doesn&apos;t exist</p>
            <Link
                href={'/home'}
            >
                <Button variant={"outline"} size={"lg"}>Return home</Button>
            </Link>
        </div>
    )
}