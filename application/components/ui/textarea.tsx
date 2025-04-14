import * as React from "react"

import {cn} from "@/lib/utils"

function Textarea({className, ...props}: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20" +
                " dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-black flex" +
                " field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs" +
                " transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" +
                " duration-200 scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thin",
                className
            )}
            {...props}
        />
    )
}

export {Textarea}
