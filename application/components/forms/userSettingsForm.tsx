"use client";

// UseActionState og createAccount skal ændres
import { useActionState, useState } from "react";
import { createAccount } from "@/lib/actions/createAccount";

import { FormInput } from "@/components/forms/formComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

    const [images, setImages] = useState<ImageListType>([AvatarFallback]);

    const onImageChange = (imageList: ImageListType) => {
        setImages(imageList);
        console.log(images);
    };

    return (
        <form /*action={dispatch}*/>
            <div className={"flex flex-col gap-4 mt-4"}>

                <ReactImageUploading
                    multiple
                    value={images}
                    onChange={onImageChange}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI

                        <div className="upload__image-wrapper">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <Avatar className={"w-20 h-20 mt-4 mb-4 mx-3"}>
                                        <AvatarImage src={image['data_url']} alt={"User"} />
                                        <AvatarFallback><img src="example_pfp.jpg" alt="" /></AvatarFallback>
                                    </Avatar>
                                    <div className="image-item__btn-wrapper">
                                        <Button
                                            variant={"ghost"}
                                            onClick={() => onImageUpdate(index)}
                                            type={"button"}
                                            {...dragProps}
                                        >
                                            <ImagePlus /> Change profile picture
                                        </Button>
                                        <Button
                                            variant={"delete"}
                                            type={"button"}
                                            onClick={onImageRemoveAll}
                                        >
                                            <SquareX /> Delete profile picture
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ReactImageUploading>
                <FormInput
                    formState={formState}
                    fieldName={"nickname"}
                    label={"Nickname"}
                    placeholder={"Nickname"}
                    inputType={"text"}
                    required
                />
                <div className="text-lg font-bold text-white">Change password</div>
                <FormInput
                    formState={formState}
                    fieldName={"oldPassword"}
                    label={"Old password"}
                    placeholder={"old password"}
                    inputType={"password"}
                    required
                />
                <FormInput
                    formState={formState}
                    fieldName={"newPassword"}
                    label={"New password"}
                    placeholder={"password"}
                    inputType={"password"}
                    required
                />
                <FormInput
                    formState={formState}
                    fieldName={"confirmPassword"}
                    label={"Confirm Password"}
                    placeholder={"password"}
                    inputType={"password"}
                    required
                />

                <div className={"flex flex-col justify-center gap-8 mt-2"}>
                    {/*<button*/}
                    {/*    className="px-4 py-2 bg-black border-2 text-purple-300 rounded-2xl border-primary hover:text-black hover:bg-purple-300 transition-all duration-300">*/}
                    {/*    Register*/}
                    {/*</button>*/}
                    <Button
                        variant={"outline"}
                        size={"lg"}
                        className={`${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md`}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form >

    );
}