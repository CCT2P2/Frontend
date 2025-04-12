"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateAccountState } from "@/lib/actions/createAccount";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useUISettings } from "@/app/store/useUISettings";

interface RegisterFormInputProps {
  formState: CreateAccountState;
  fieldName: "username" | "email" | "password" | "confirmPassword";
  label: string;
}

interface FeedbackFormInputProps {
  fieldName: "worked" | "didnt" | "other";
  label: string;
}

const inputTypeMap = {
  username: "text",
  email: "email",
  password: "password",
  confirmPassword: "password",
};

const registerPlaceholderMap = {
  username: "Username",
  email: "name@example.com",
  password: "password",
  confirmPassword: "password",
};

const feedbackPlaceholderMap = {
  worked: "What worked well?",
  didnt: "What didn't work well?",
  other: "What else would you like to share?",
};

export function AccountFormInput({
  formState,
  fieldName,
  label,
}: RegisterFormInputProps) {
  const inputType = inputTypeMap[fieldName];
  const placeholder = registerPlaceholderMap[fieldName];

  return (
    <div className={"grid gap-2"}>
      <Label htmlFor={fieldName} className={"ml-2"}>
        {label}
      </Label>
      <div className={"relative"}>
        <Input
          type={inputType}
          className="peer bg-gray-300/10 z-20 rounded-2xl w-full outline-none focus:border-primary"
          placeholder={placeholder}
          name={fieldName}
          id={fieldName}
          defaultValue={formState.fieldsState?.[fieldName]}
          required
        />
        {/*<div
          className={
            "peer-[:focus]:bg-primary/50 bg-primary/10 absolute inset-[0%] z-10 blur-[8px]" +
            " rounded-xl transition duration-500 ease-out"
          }
        ></div>*/}
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
  const { padding, paddingButton } = useUISettings();
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
