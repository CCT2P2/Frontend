import {z} from "zod";
import {getFieldStates} from "@/lib/actions/actionsHelperFunctions.ts";
import {UserLoginRequest, UserLoginResponse} from "@/lib/apiTypes.ts";

// for comments on how this works go to createAccount.ts, basically same logic
const LoginSchema = z.object({
    username: z
        .string(),

    password: z
        .string(),
});

export interface LoginState {
    errors?: {
        username?: string[],
        password?: string[],
    },
    fieldsState?: {
        username?: string,
        password?: string,
    }
    message?: string | null,
    userId?: number,
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const validatedFields = LoginSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    });

    if (!validatedFields.success) {
        return getFieldStates(formData, validatedFields)
    }

    const requestData: UserLoginRequest = {
        username: validatedFields.data.username,
        password: validatedFields.data.password,
    }

    const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type:': 'application/json',
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        return {
            message: `Error with login: ${response.status}`
        }
    }

    const responseData: UserLoginResponse = await response.json();
    return {userId: responseData.user_id}
}