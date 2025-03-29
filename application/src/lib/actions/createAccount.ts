import {z} from "zod";
import {UserRegistrationRequest, UserRegistrationResponse} from "@/lib/apiTypes.ts";
import {getFieldStates} from "@/lib/actions/actionsHelperFunctions.ts";

// Schema to validate fields based on. Message is the error message shown to the user if the requirement is not met
const CreateAccountSchema = z.object({
    username: z
        .string()
        .min(1, {message: 'Username must be at least 3 characters'})
        .max(20, {message: 'Username must not be more than 20 characters'})
        .regex(/^[a-zA-Z0-9_]+$/, {message: 'Username can only contain letters, numbers and underscores'}),

    email: z
        .string()
        .email({message: 'Invalid email address'}),

    password: z
        .string()
        .min(6, {message: 'Password must be at least 6 characters'}),

    confirmPassword: z
        .string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ["confirmPassword"]
})

// State for the signup form (and basically all form states so im only writing a super long explanation for this one)
// - errors are the error message(s) shown to the user.
// - fieldState is the state of the fields before the form is submitted, used to keep these values in the form in case
// of an invalid input so the user doesnt have to type it again.
// - message is the general error message, not shown to the user (just at the moment, we should probably show this too)
// - userId is the user id of the created user, which is returned if the registration succeeds. no idea if we
// actually need this, but i just included it for now lol
export interface CreateAccountState {
    errors?: {
        username?: string[],
        email?: string[],
        password?: string[],
        confirmPassword?: string[],
    },
    fieldsState?: {
        username?: string,
        email?: string,
        password?: string,
        confirmPassword?: string,
    }
    message?: string | null,
    userId?: number,
}

export async function createAccount(_prevState: CreateAccountState, formData: FormData): Promise<CreateAccountState> {
    // uses the validationSchema to parse the data from the form.
    const validatedFields = CreateAccountSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    // if input isnt return error messages and keep field states
    if (!validatedFields.success) {
        return getFieldStates(formData, validatedFields)
    }

    // gets the data required for the request ready
    const requestData: UserRegistrationRequest = {
        username: validatedFields.data.username,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    }

    // post request to backend api to create new account
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
    });

    // any other status than 201 means there was an error, so it gets returned
    if (!response.ok) {
        return {
            message: `Error creating account: ${response.status}`
        }
    }

    // converts response to json and returns user id
    const responseData: UserRegistrationResponse = await response.json()
    return {userId: responseData.user_id}
}