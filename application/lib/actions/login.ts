import { z } from "zod";
import { generateFormErrorResponse } from "@/lib/actions/actionsHelperFunctions";
import { UserLoginRequest, UserLoginResponse } from "@/lib/apiTypes";

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

  const requestData: UserLoginRequest = {
    username: validatedFields.data.username,
    password: validatedFields.data.password,
  };

  const response = await fetch("api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  console.log(response);
  if (!response.ok) {
    return {
      ..._prevState,
      message: `Login failed: Invalid Username or Password`,
    };
  }

  // Redirect to home page on successful login
  window.location.href = "/forum/0";

  const responseData: UserLoginResponse = await response.json();
  return { userId: responseData.user_id };
}
