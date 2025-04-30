"use client";

// UseActionState og createAccount skal ændres
import { useActionState, useState } from "react";
import { createAccount } from "@/lib/actions/createAccount";

import { FormInput } from "@/components/forms/formComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUISettings } from "@/app/store/useUISettings";
import { ImagePlus, SquareX, XIcon } from "lucide-react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";

export default function RegisterForm() {
	// uses the useActionState hook to initialize form state and a dispatch function
	// formState is the current state of the form, stuff like validation errors and whats in the different input fields
	// dispatch is a function that allows triggering the createAccount action with the form data when its submitted
	// the data given to createAccount is based on the `name` of the inputs

	// skal ændres
	const [formState, dispatch] = useActionState(createAccount, {});

	const { blur } = useUISettings();

	const [images, setImages] = useState<ImageListType>([]);

	const onImageChange = (imageList: ImageListType) => {
		setImages(imageList);
		console.log(images);
	};

	return (
		<form /*action={dispatch}*/>
			<div>
				<div className="text-lg font-bold text-white">Change image</div>

				<Avatar className={"w-20 h-20 mt-4 mb-4 mx-3"}>
					<AvatarImage src={"/example_pfp.jpg"} alt={"User"} />
					<AvatarFallback>User</AvatarFallback>
				</Avatar>

				<ReactImageUploading value={images} onChange={onImageChange}>
					{({ onImageUpload, dragProps }) => (
						<div className={"upload__image-wrapper"}>
							<Button
								variant={"ghost"}
								onClick={onImageUpload}
								type={"button"}
								{...dragProps}
							>
								<ImagePlus /> Change profile picture
							</Button>
						</div>
					)}
				</ReactImageUploading>
				<Button variant={"outline"} type={"button"}>
					<SquareX /> Delete profile picture
				</Button>
			</div>

			<div className={"flex flex-col gap-4 mt-4"}>
				<FormInput
					formState={formState}
					fieldName={"nickname"}
					label={"Nickname"}
					placeholder={"Nickname"} //make this the actuall nickname
					inputType={"text"}
				/>
				<div className="text-lg font-bold text-white">Change password</div>
				<FormInput
					formState={formState}
					fieldName={"oldPassword"}
					label={"Old password"}
					placeholder={"old password"}
					inputType={"password"}
				/>
				<FormInput
					formState={formState}
					fieldName={"newPassword"}
					label={"New password"}
					placeholder={"password"}
					inputType={"password"}
				/>
				<FormInput
					formState={formState}
					fieldName={"confirmPassword"}
					label={"Confirm Password"}
					placeholder={"password"}
					inputType={"password"}
				/>

				<div className={"justify-center gap-8 mt-2"}>
					<Button
						variant={"outline"}
						size={"lg"}
						className={`w-full ${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md`}
					>
						Save
					</Button>
					<Button
						variant={"outline"}
						size={"lg"}
						className={`w-1/2 my-6 ${blur ? "bg-red-600/20" : "bg-red-600"} text-red-600 border-red-600/20 hover:bg-red-600 hover:text-white backdrop-blur-md`}
					>
						Delete Account
					</Button>
				</div>
			</div>
			{/* Overlay */}

			<div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
				<span className="text-red-500 font-bold text-2xl text-center">
					COMING SOON
				</span>
				<span className="text-red-400 font-semibold text-xs mt-2 text-center">
					(Lol, no it won&lsquo;t)
				</span>
			</div>
		</form>
	);
}
