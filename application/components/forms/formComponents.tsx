"use client";

import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";
import {HTMLInputTypeAttribute, useState} from "react";
import {useUISettings} from "@/app/store/useUISettings";

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
}

interface FeedbackFormInputProps {
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
                          }: RegisterFormInputProps) {

    return (
        <div className={"grid gap-2"}>
            <Label htmlFor={fieldName} className={"ml-2"}>
                {label}
            </Label>
            <div className={"relative"}>
                <Input
                    type={inputType}
                    className="bg-black/10 z-20 rounded-2xl w-full outline-none focus:border-primary focus:faint-glow-secondary"
                    placeholder={placeholder}
                    name={fieldName}
                    id={fieldName}
                    defaultValue={formState.fieldsState?.[fieldName]}
                    required
                />
            </div>
            <div id={`${fieldName}-error`}>
                {formState.errors?.[fieldName] &&
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
    const {padding, paddingButton} = useUISettings();
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
