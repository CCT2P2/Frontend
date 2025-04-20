import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";

interface Props {
    absolute?: boolean;
    delay?: number;
}

export default function LoadingSpinner({absolute = true, delay = 0}: Props) {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timeout: NodeJS.Timeout = setTimeout(() => {
            setShowSpinner(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    if (!showSpinner) return null;

    return (
        <span className={cn(
            "inset-[50%] loading loading-spinner loading-lg",
            absolute ? "absolute" : "m-4 align-middle",)
        }></span>
    )
}