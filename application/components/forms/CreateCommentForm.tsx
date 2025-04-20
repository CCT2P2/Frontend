import {FormInput} from "@/components/forms/formComponents";
import {useActionState} from "react";
import {createComment} from "@/lib/actions/createComment";

export default function CreateCommentForm({postId}: { postId: number }) {
    const [formState, dispatch] = useActionState(createComment, {})
    return (
        <form>
            <FormInput
                formState={formState}
                fieldName={""}
                placeholder={"Write comment..."}
                label={"Add comment"}
                inputType={"text"}
            />
        </form>
    )
}