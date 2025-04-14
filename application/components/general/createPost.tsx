import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export default function CreatePost() {
    return (
        <Dialog>
            <DialogTrigger asChild><Button variant={"outline"}>New Post</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Post</DialogTitle>
                    <DialogDescription>
                        Create a new post
                    </DialogDescription>
                </DialogHeader>
                <div>

                </div>
            </DialogContent>
        </Dialog>
    )
}