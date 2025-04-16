import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {UserLoginRequest} from "@/lib/apiTypes";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const requestData: UserLoginRequest = {
                    username: credentials.username as string,
                    password: credentials.password as string,
                }

                const response = await fetch('api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type:': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return await response.json()
            }
        })
    ],
    session: {
        strategy: "jwt"
    }
})