'use client'

import {FormInput, FormTextArea} from "@/components/forms/formComponents";
import {useActionState, useState} from "react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
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

const communities = [
    {
        value: "whyy",
        label: "Whyy",
    },
    {
        value: "bigQuestions",
        label: "BigQuestions",
    },
    {
        value: "wowsers",
        label: "wowsers",
    },
    {
        value: "javaHate",
        label: "JavaHate",
    },
    {
        value: "goLang",
        label: "GoLang",
    },
]

export default function CreatePostForm() {
    const [formState, dispatch] = useActionState(null, {})
    const [images, setImages] = useState<ImageListType>([])

    const onImageChange = (
        imageList: ImageListType,
    ) => {
        setImages(imageList);
        console.log(images);
    };

    return (
        <form action={dispatch} className={"flex flex-col gap-6"}>
            <div className={"flex flex-col gap-4 mt-4"}>
                <div className={"flex flex-col gap-2"}>
                    <Label className={"ml-2"}>
                        Community
                    </Label>
                    <CommunitySelect/>
                </div>
                <FormInput
                    formState={formState}
                    fieldName={"title"}
                    placeholder={"Title"}
                    label={"Title (required)"}
                    inputType={"text"}
                    required
                />
                <ReactImageUploading value={images} onChange={onImageChange}>
                    {({
                          onImageRemoveAll
                      }) => (
                        <div className={"upload__image-wrapper"}>
                            {images[0]?.dataURL &&
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
                                        className={"absolute top-1 right-1 group-hover:bg-accent/50 rounded-full" +
                                            " text-transparent group-hover:text-white px-0"}
                                        onClick={onImageRemoveAll}
                                    >
                                        <XIcon size={12}/>
                                    </Button>
                                </div>
                            }
                        </div>
                    )}
                </ReactImageUploading>
                <div>
                    <FormTextArea
                        formState={formState}
                        fieldName={"content"}
                        placeholder={"Write content..."}
                        label={"Content"}
                        className={"max-h-96 h-40"}
                    />
                    <ReactImageUploading value={images} onChange={onImageChange}>
                        {({
                              onImageUpload,
                              dragProps
                          }) => (
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
    )
}

function CommunitySelect() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-[200px] justify-between border-1 border-input text-muted-foreground dark:hover:bg-black" +
                        " group",
                        open && "border-secondary faint-glow-secondary",
                        value && "text-foreground"
                    )}
                >
                    {value
                        ? communities.find((community) => community.value === value)?.label
                        : "Select community..."}
                    <ChevronsUpDown className={cn(
                        "opacity-50 text-muted-foreground group-hover:text-foreground duration-200",
                    )}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-secondary/30">
                <Command className={"bg-black"}>
                    <CommandInput placeholder="Search community..."/>
                    <CommandList>
                        <CommandEmpty>No community found.</CommandEmpty>
                        <CommandGroup>
                            {communities.map((community) => (
                                <CommandItem
                                    key={community.value}
                                    value={community.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {community.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === community.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
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
            <PopoverContent className={"bg-black"}>
                <div>
                    <div className={"mb-6"}>
                        <h4>Discard Post?</h4>
                        <p className={"text-sm text-muted-foreground"}>Are you sure you want to discard this
                            post?</p>
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
                                className={"text-destructive border-destructive dark:hover:bg-destructive"}
                                type={"button"}
                            >
                                Discard
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}