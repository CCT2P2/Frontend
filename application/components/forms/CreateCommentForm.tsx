import { FormInput, FormTextArea } from "@/components/forms/formComponents";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { createComment } from "@/lib/actions/createComment";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useRef } from "react";

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
	return (
		<form action={dispatch}>
			<FormTextArea
				formState={formState}
				fieldName={"text"}
				placeholder={"Write comment..."}
				label={"Add comment"}
				className={"rounded-xl"}
			/>
			<input hidden value={postId} name={"parentPostId"} readOnly />
			<input hidden value={communityId} name={"communityId"} readOnly />
			<div className={"flex justify-end mt-2"}>
				<CommentButton
					setCommentReloadKey={setCommentReloadKey}
					commentReloadKey={commentReloadKeyRef.current}
				/>
			</div>
		</form>
	);
}

function CommentButton({
	setCommentReloadKey,
	commentReloadKey,
}: {
	setCommentReloadKey: Dispatch<SetStateAction<number>>;
	commentReloadKey: number;
}) {
	const status = useFormStatus();
	useEffect(() => {
		setCommentReloadKey((commentReloadKey += 1));
	}, [status.pending]);
	return (
		<Button variant={"outline"} onClick={() => {}}>
			Comment
		</Button>
	);
}
