import {FormInput, FormTextArea} from "@/components/forms/formComponents";
import {Dispatch, RefObject, SetStateAction, useActionState, useEffect, useState} from "react";
import {createComment} from "@/lib/actions/createComment";
import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {useRef} from "react";

export default function CreateCommentForm({
                                              postId,
                                              communityId,
                                              setCommentReloadKey,
                                              commentReloadKey,
                                          }: {
    postId: number;
    communityId: number;
    commentReloadKey: number;
    setCommentReloadKey: Dispatch<SetStateAction<number>>;
}) {
    const [formState, dispatch] = useActionState(createComment, {});
    const commentReloadKeyRef = useRef(commentReloadKey);
    const [pending, setPending] = useState(false)
    return (
        <form action={dispatch}>
            <FormTextArea
                formState={formState}
                fieldName={"text"}
                placeholder={"Write comment..."}
                label={"Add comment"}
                className={"rounded-xl"}
                isPending={pending}
            />
            <input hidden value={postId} name={"parentPostId"} readOnly/>
            <input hidden value={communityId} name={"communityId"} readOnly/>
            <div className={"flex justify-end mt-2"}>
                <CommentButton
                    setCommentReloadKey={setCommentReloadKey}
                    commentReloadKey={commentReloadKeyRef}
                    setPending={setPending}
                />
            </div>
        </form>
    );
}

function CommentButton({
                           setCommentReloadKey,
                           commentReloadKey,
                           setPending,
                       }: {
    setCommentReloadKey: Dispatch<SetStateAction<number>>;
    commentReloadKey: RefObject<number>;
    setPending: Dispatch<SetStateAction<boolean>>;
}) {
    const status = useFormStatus();
    useEffect(() => {
        setPending(status.pending)
        setCommentReloadKey((commentReloadKey.current += 1));
    }, [commentReloadKey, setCommentReloadKey, setPending, status.pending]);
    return (
        <Button variant={"outline"} disabled={status.pending} onClick={() => {
        }}>
            {status.pending ? "Loading..." : "Comment"}
        </Button>
    );
}
