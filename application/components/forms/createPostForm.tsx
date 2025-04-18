"use client";

import {FormInput, FormTextArea} from "@/components/forms/formComponents";
import {useActionState, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Check, ChevronsUpDown, ImagePlus, XIcon} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {Label} from "@radix-ui/react-label";
import {DialogClose} from "@/components/ui/dialog";
import {PopoverClose} from "@radix-ui/react-popover";
import ReactImageUploading, {ImageListType} from "react-images-uploading";
import Image from "next/image";
import {createPost} from "@/lib/actions/createPost";
import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import {GetAllCommunitiesResponse} from "@/lib/apiTypes";
import LoadingSpinner from "@/components/general/loadingSpinner";

type FormState = Record<string, unknown>;
// const communities = [
//     {
//         value: "whyy",
//         label: "Whyy",
//     },
//     {
//         value: "bigQuestions",
//         label: "BigQuestions",
//     },
//     {
//         value: "wowsers",
//         label: "wowsers",
//     },
//     {
//         value: "javaHate",
//         label: "JavaHate",
//     },
//     {
//         value: "goLang",
//         label: "GoLang",
//     },
// ];

export default function CreatePostForm() {
    const [formState, dispatch] = useActionState(createPost, {});

    const [images, setImages] = useState<ImageListType>([]);

    const onImageChange = (imageList: ImageListType) => {
        setImages(imageList);
    };

    return (
        <form action={dispatch} className={"flex flex-col gap-6"}>
            {formState.message && (
                <div className="text-red-500">{formState.message}</div>
            )}
            <div className={"flex flex-col gap-4 mt-4"}>
                <div className={"flex flex-col gap-2"}>
                    <Label className={"ml-2"}>Community</Label>
                    <CommunitySelect/>
                    <div id={`$community-error`}>
                        {formState.errors?.communityId &&
                            formState.errors?.communityId.map((error: string) => (
                                <p key={error} className={"ml-2 text-sm text-red-500"}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <FormInput
                    formState={formState}
                    fieldName={"title"}
                    placeholder={"Title"}
                    label={"Title (required)"}
                    inputType={"text"}
                    required
                />
                <input hidden={true} value={images[0]?.dataURL || ""} name={"image"} readOnly/>
                <ReactImageUploading value={images} onChange={onImageChange}>
                    {({onImageRemoveAll}) => (
                        <div className={"upload__image-wrapper"}>
                            {images[0]?.dataURL && (
                                <div className={"relative w-[150px] group"}>
                                    <Image
                                        src={images[0]?.dataURL}
                                        alt={"Attached Image"}
                                        width={150}
                                        height={150}
                                        className={"rounded-xl relative"}
                                    />
                                    <Button
                                        variant={"ghost"}
                                        size={"sm"}
                                        className={
                                            "absolute top-1 right-1 group-hover:bg-accent/50 rounded-full" +
                                            " text-transparent group-hover:text-white px-0"
                                        }
                                        onClick={onImageRemoveAll}
                                    >
                                        <XIcon size={12}/>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </ReactImageUploading>
                <div>
                    <FormTextArea
                        formState={formState}
                        fieldName={"mainText"}
                        placeholder={"Write content..."}
                        label={"Content"}
                        className={"max-h-96 h-40"}
                    />
                    <ReactImageUploading value={images} onChange={onImageChange}>
                        {({onImageUpload, dragProps}) => (
                            <div className={"upload__image-wrapper"}>
                                <Button
                                    variant={"ghost"}
                                    onClick={onImageUpload}
                                    type={"button"}
                                    {...dragProps}
                                >
                                    <ImagePlus/>
                                </Button>
                            </div>
                        )}
                    </ReactImageUploading>
                </div>
            </div>
            <div className={"flex justify-between gap-4"}>
                <DiscardButton/>
                <Button variant={"outline"} className={"w-24"}>
                    Post
                </Button>
            </div>
        </form>
    );
}

function CommunitySelect() {
    const [open, setOpen] = useState(false);
    const [selectedCommunityName, setSelectedCommunityName] = useState("");
    const [selectedCommunityId, setSelectedCommunityId] = useState<number>(-1);
    const {data: communities, isLoading, status, error} = useAuthFetch<GetAllCommunitiesResponse>(`/api/community/all`);

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Failed to load user profile</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <input type="hidden" name="communityId" value={selectedCommunityId}/>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-[200px] justify-between border-1 border-input text-muted-foreground dark:hover:bg-black" +
                        " group",
                        open && "border-secondary faint-glow-secondary",
                        selectedCommunityName && "text-foreground",
                    )}
                >
                    {selectedCommunityName && !isLoading && communities
                        ? communities.find((community) => community.names === selectedCommunityName)?.names
                        : "Select community..."}
                    <ChevronsUpDown
                        className={cn(
                            "opacity-50 text-muted-foreground group-hover:text-foreground duration-200",
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-secondary/30">
                <Command className={"bg-black"}>
                    <CommandInput placeholder="Search community..."/>
                    {isLoading || !communities
                        ? <LoadingSpinner absolute={false}/>
                        : <CommandList>
                            <CommandEmpty>No community found.</CommandEmpty>
                            <CommandGroup>
                                {communities.map((community) => {
                                    if (community.communityID < 1) {
                                        return
                                    }

                                    return (
                                        <CommandItem
                                            key={community.names}
                                            value={community.names}
                                            onSelect={(currentValue) => {
                                                setSelectedCommunityName(currentValue === selectedCommunityName ? "" : currentValue);
                                                const selectedCommunity = communities.find(
                                                    (community) => community.names === currentValue
                                                );

                                                setSelectedCommunityId(currentValue === selectedCommunityName ? -1 : selectedCommunity?.communityID || -1);
                                                setOpen(false);
                                            }}
                                        >
                                            {community.names}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    selectedCommunityName === community.names ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>}
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function DiscardButton() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={"dark:bg-black text-destructive dark:hover:bg-destructive"}
                    type={"button"}
                >
                    Discard
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"bg-black border-secondary/50"}>
                <div>
                    <div className={"mb-6"}>
                        <h4>Discard Post?</h4>
                        <p className={"text-sm text-muted-foreground"}>
                            Are you sure you want to discard this post?
                        </p>
                    </div>
                    <div className={"flex justify-end gap-4"}>
                        <PopoverClose asChild>
                            <Button variant={"outline"} type={"button"}>
                                Cancel
                            </Button>
                        </PopoverClose>
                        <DialogClose asChild>
                            <Button
                                variant={"outline"}
                                className={
                                    "text-destructive border-destructive dark:hover:bg-destructive"
                                }
                                type={"button"}
                            >
                                Discard
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
