import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { CreateAccountState } from "@/lib/actions/createAccount";

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
          className="peer bg-black z-20 rounded-2xl w-full outline-none focus:border-primary"
          placeholder={placeholder}
          name={fieldName}
          id={fieldName}
          defaultValue={formState.fieldsState?.[fieldName]}
          required
        />
        <div
          className={
            "peer-[:focus]:bg-primary/50 bg-primary/10 absolute inset-[0%] z-10 blur-[8px]" +
            " rounded-xl transition duration-500 ease-out"
          }
        ></div>
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
        <Input
          placeholder={placeholder}
          className="peer bg-black z-20 rounded-2xl w-full min-w-[300px] outline-none focus:border-primary"
          name={fieldName}
          id={fieldName}
          defaultValue={formState?.fieldsState?.[fieldName]}
          required={required}
        />
        <div
          className={
            "peer-[:focus]:bg-primary/50 bg-primary/10 absolute inset-[0%] z-10 blur-[8px]" +
            " rounded-xl transition duration-500 ease-out"
          }
        ></div>
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
