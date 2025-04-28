import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import CreatePostForm from "@/components/forms/createPostForm";

export default function CreatePost({forumId}: { forumId: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild><Button variant={"outline"}>New Post</Button></DialogTrigger>
            <DialogContent
                includeClose={false}
                onEscapeKeyDown={(event) => event.preventDefault()}
                onInteractOutside={(event) => event.preventDefault()}
                className={"faint-glow-secondary border-secondary/50"}
            >
                <DialogHeader>
                    <DialogTitle className={"text-2xl"}>New Post</DialogTitle>
                </DialogHeader>
                <div>
                    <CreatePostForm forumId={forumId}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}