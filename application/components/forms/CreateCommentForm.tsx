import {FormInput, FormTextArea} from "@/components/forms/formComponents";
import {useActionState} from "react";
import {createComment} from "@/lib/actions/createComment";
import {Button} from "@/components/ui/button";

export default function CreateCommentForm({postId, communityId}: { postId: number, communityId: number }) {
    const [formState, dispatch] = useActionState(createComment, {})
    return (
        <form action={dispatch}>
            <FormTextArea
                formState={formState}
                fieldName={"text"}
                placeholder={"Write comment..."}
                label={"Add comment"}
                className={"rounded-xl"}
            />
            <input hidden value={postId} name={"parentPostId"} readOnly/>
            <input hidden value={communityId} name={"communityId"} readOnly/>
            <div className={"flex justify-end mt-2"}>
                <Button variant={"outline"}>Comment</Button>
            </div>
        </form>
    )
}