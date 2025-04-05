import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import {CreateAccountState} from "@/lib/actions/createAccount";

interface RegisterFormInputProps {
    formState: CreateAccountState;
    fieldName: "username" | "email" | "password" | "confirmPassword";
    label: string;
}

const inputTypeMap = {
    username: "text",
    email: "email",
    password: "password",
    confirmPassword: "password"
};

const placeholderMap = {
    username: "Username",
    email: "name@example.com",
    password: "password",
    confirmPassword: "password"
}


export function AccountFormInput({formState, fieldName, label}: RegisterFormInputProps) {
    const inputType = inputTypeMap[fieldName];
    const placeholder = placeholderMap[fieldName];


    return (
        <div className={"grid gap-2"}>
            <Label htmlFor={fieldName} className={"ml-2"}>{label}</Label>
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
                    className={"peer-[:focus]:bg-primary/50 bg-primary/10 absolute inset-[0%] z-10 blur-[8px]" +
                        " rounded-xl transition duration-500 ease-out"}></div>
            </div>
            <div id={`${fieldName}-error`}>
                {
                    formState.errors?.[fieldName] &&
                    formState.errors[fieldName].map((error: string) => (
                        <p key={error} className={"ml-2 text-sm text-red-500"}>
                            {error}
                        </p>
                    ))
                }
            </div>
        </div>
    )
}