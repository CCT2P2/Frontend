"use server"

import {z} from "zod";
import {generateFormErrorResponse} from "@/lib/actions/actionsHelperFunctions";
import {signIn} from "@/auth";
import {redirect} from "next/navigation";
import {AuthError} from "next-auth";

// for comments on how this works go to createAccount.ts, basically same logic
const LoginSchema = z.object({
  username: z.string(),

  password: z.string(),
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

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        username: validatedFields.error.flatten().fieldErrors.username,
        password: validatedFields.error.flatten().fieldErrors.password,
      },
      fieldsState: {
        username: formData.get("username")?.toString(),
        password: formData.get("password")?.toString(),
      },
      message: "Please fix form errors",
    };
  }

    try {
        await signIn("credentials", {
            username: validatedFields.data.username,
            password: validatedFields.data.password,
            redirect: false,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {message: 'Invalid Email/username or password'}
                default:
                    return {message: 'Failed to sign in'}
            }
        }
        return { message: 'An unexpected error occurred' };
    }

    redirect("/home");
}
