"use server"

import {z} from "zod";
import {generateFormErrorResponse} from "@/lib/actions/actionsHelperFunctions";
import {signIn} from "@/auth";
import {redirect} from "next/navigation";

// for comments on how this works go to createAccount.ts, basically same logic
const LoginSchema = z.object({
    username: z
        .string(),

    password: z
        .string(),
});

export interface LoginState {
    errors?: {
        username?: string[];
        password?: string[];
    };
    fieldsState?: {
        username?: string;
        password?: string;
    };
    message?: string | null;
    userId?: number;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const validatedFields = LoginSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    });

    if (!validatedFields.success) {
        return generateFormErrorResponse(formData, validatedFields)
    }

    try {
        await signIn("credentials", validatedFields)
    } catch (error) {
        if (error === "Not Found") {
            return {message: "Username or password is incorrect"};
        }
        return {message: `Failed to login: ${error}`}
    }

    redirect("/home");
}