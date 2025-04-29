"use client";

import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";
import {HTMLInputTypeAttribute, useState} from "react";
import {useUISettings} from "@/app/store/useUISettings";
import {cn} from "@/lib/utils";

interface GenericFormState {
    errors?: Record<string, string[]>;
    fieldsState?: Record<string, string>;
    message?: string | null;
}

interface RegisterFormInputProps {
    formState: GenericFormState;
    fieldName: string;
    placeholder: string;
    label: string;
    inputType: HTMLInputTypeAttribute;
    className?: string;
    required?: boolean;
    isPending?: boolean;
}

interface RegisterFormTextareaProps {
    formState: GenericFormState;
    fieldName: string;
    placeholder: string;
    label: string;
    className?: string;
    required?: boolean;
    isPending?: boolean;
}

type FeedbackField = "worked" | "didnt" | "other";

type GenericFormState2<T extends string = string> = {
    errors?: Partial<Record<T, string[]>>;
    fieldsState?: Partial<Record<T, string>>;
    message?: string | null;
};

interface FeedbackFormInputProps {
    formState: GenericFormState2<FeedbackField>;

    fieldName: "worked" | "didnt" | "other";
    label: string;
}

const feedbackPlaceholderMap = {
    worked: "What worked well?",
    didnt: "What didn't work well?",
    other: "What else would you like to share?",
};

export function FormInput({
                              formState,
                              fieldName,
                              label,
                              placeholder,
                              inputType,
                              className,
                              required = false,
                              isPending = false,
                          }: RegisterFormInputProps) {
    return (
        <div className={"grid gap-2"}>
            <Label htmlFor={fieldName} className={"ml-2"}>
                {label}
            </Label>
            <div className={"relative"}>
                <Input
                    type={inputType}
                    className={cn(
                        "bg-black/10 rounded-2xl w-full outline-none focus:border-primary" +
                        " focus:faint-glow-secondary",
                        className,
                    )}
                    placeholder={placeholder}
                    name={fieldName}
                    id={fieldName}
                    defaultValue={formState.fieldsState?.[fieldName]}
                    required={required}
                />
            </div>
            <div id={`${fieldName}-error`}>
                {formState.errors?.[fieldName] &&
                    !isPending &&
                    formState.errors[fieldName].map((error: string) => (
                        <p key={error} className={"ml-2 text-sm text-red-500"}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export function FormTextArea({
                                 formState,
                                 fieldName,
                                 label,
                                 placeholder,
                                 className,
                                 required = false,
                                 isPending = false,
                             }: RegisterFormTextareaProps) {
    return (
        <div className={cn("grid gap-2")}>
            <Label htmlFor={fieldName} className={"ml-2"}>
                {label}
            </Label>
            <div className={"relative"}>
                <Textarea
                    className={cn(
                        "bg-black/10 z-20 w-full outline-none focus:border-primary" +
                        " focus:faint-glow-secondary",
                        className,
                    )}
                    placeholder={placeholder}
                    name={fieldName}
                    id={fieldName}
                    defaultValue={formState.fieldsState?.[fieldName]}
                    required={required}
                />
            </div>
            <div id={`${fieldName}-error`}>
                {formState.errors?.[fieldName] &&
                    !isPending &&
                    formState.errors[fieldName].map((error: string) => (
                        <p key={error} className={"ml-2 text-sm text-red-500"}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export function FeedbackFormInput({
                                      formState,
                                      fieldName,
                                      label,
                                      required = false,
                                  }: FeedbackFormInputProps & { required?: boolean }) {
    const placeholder = feedbackPlaceholderMap[fieldName];

    return (
        <div className={"grid gap-2"}>
            <Label htmlFor={fieldName} className={"ml-2"}>
                {label}
            </Label>
            <div className={"relative"}>
                <Textarea
                    placeholder={placeholder}
                    className="relative peer bg-gray-300/10 backdrop-blur-md z-20 rounded-2xl w-full min-w-[300px] outline-none focus:border-primary"
                    name={fieldName}
                    id={fieldName}
                    defaultValue={formState?.fieldsState?.[fieldName]}
                    required={required}
                />
            </div>
            <div id={`${fieldName}-error`}>
                {formState?.errors?.[fieldName] &&
                    formState?.errors[fieldName].map((error: string) => (
                        <p key={error} className={"ml-2 text-sm text-red-500"}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export function PostSortButton({
                                   label,
                                   backgroundColor,
                               }: {
    label: string;
    backgroundColor: string;
}) {
    const {paddingButton} = useUISettings();
    const [active, setActive] = useState(false);
    return (
        <div className={`w-40 p-${paddingButton}`}>
            <Card
                onClick={() => setActive(!active)}
                className={`p-${paddingButton} border-[#2c0d61] transition-all duration-200 cursor-pointer hover:scale-105
              ${active ? "bg-[#2c0d61]/50" : backgroundColor}`}
            >
                <button>{label}</button>
            </Card>
        </div>
    );
}
