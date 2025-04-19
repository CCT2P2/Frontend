import {cn} from "@/lib/utils";

interface Props {
    absolute?: boolean;
}

export default function LoadingSpinner({absolute = true}: Props) {
    return (
        <span className={cn(
            "inset-[50%] loading loading-spinner loading-lg",
            absolute ? "absolute" : "m-4 align-middle",)
        }></span>
    )
}