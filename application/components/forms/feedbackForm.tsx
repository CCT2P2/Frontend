"use client";

import { FeedbackFormInput } from "./formComponents";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useActionState } from "react";
import { useUISettings } from "@/app/store/useUISettings";
import { feedback } from "@/lib/actions/feedback";

export default function FeedbackForm() {
	const [rating, setRating] = useState([1]);
	const { blur } = useUISettings();

	const [formState, dispatch] = useActionState(feedback, {});

	return (
		<Card
			className={`h-180 w-120 relative py-10 ${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md`}
		>
			<CardHeader>
				<div className={"flex justify-center mb-0"}>
					<Image
						src={"/GNUF.svg"}
						alt="Home"
						width={150}
						height={150}
						className={"p-2"}
					/>
				</div>
				<CardTitle>Feedback</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					action={async (formData) => {
						const result = dispatch(formData);
						setRating([0]);
						const form = document.querySelector("form");
						form?.reset();
					}}
				>
					<div className={"flex flex-col gap-4 mt-4"}>
						<FeedbackFormInput
							formState={formState}
							fieldName="worked"
							label="What worked well?"
							required
						/>
						<FeedbackFormInput
							formState={formState}
							fieldName="didnt"
							label="What didn't work well?"
							required
						/>
						<FeedbackFormInput
							formState={formState}
							fieldName="other"
							label="What else would you like to share?"
						/>
					</div>

					<div className="mt-4 mb-2">Rating: {rating[0]}</div>
					<Slider
						value={rating}
						onValueChange={setRating}
						defaultValue={[1]}
						max={5}
						min={1}
						step={1}
						className={`${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md `}
					/>
					<input type="hidden" name="rating" value={rating[0]} />

					<div
						className={`flex flex-col ${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md justify-center gap-10 mt-10`}
					>
						<Button
							type="submit"
							variant={"outline"}
							size={"lg"}
							className="bg-transparent"
						>
							Submit
						</Button>
					</div>

					{formState.message && (
						<p
							className={`${formState.status === 200 ? "text-green-500" : "text-red-500"} text-center mt-4`}
						>
							{formState.message}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
