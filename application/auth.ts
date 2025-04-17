import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {UserLoginRequest} from "@/lib/apiTypes";
import {JWT} from "@auth/core/jwt";

interface CustomUser {
    id: string;
    username: string;
    token: string;
    isAdmin: boolean;
}

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

                console.log(requestData);

                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    return null;
                }

                return await response.json();
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt(params) {
            const { token, user } = params;

            if (user) {
                const customUser = user as CustomUser;
                token.id = customUser.id;
                token.username = customUser.username;
                token.accessToken = customUser.token;
                token.role = customUser.isAdmin ? "Admin" : "User";
            }

            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.username = token.username as string;
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnSettingsPage = nextUrl.pathname.startsWith('/settings')
            const isOnAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

            if (isOnSettingsPage) {
                // Redirect to login page if user is not logged in
                return isLoggedIn;
            }

            if (isOnAuthPage && isLoggedIn) {
                return Response.redirect(new URL('/home', nextUrl));
            }

            return true
        },
    },
    pages: {
        signIn: '/login',
    },
    trustHost: true,
})

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            role: string;
        };
        accessToken: string;
    }
}