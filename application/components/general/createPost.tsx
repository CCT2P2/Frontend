import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import CreatePostForm from "@/components/forms/createPostForm";

export default function CreatePost() {
    return (
        <Dialog>
            <DialogTrigger asChild><Button variant={"outline"}>New Post</Button></DialogTrigger>
            <DialogContent
                includeClose={false}
                onEscapeKeyDown={(event) => event.preventDefault()}
                onInteractOutside={(event) => event.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className={"text-2xl"}>New Post</DialogTitle>
                </DialogHeader>
                <div>
                    <CreatePostForm/>
                </div>
            </DialogContent>
        </Dialog>
    )
}