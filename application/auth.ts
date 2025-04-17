import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {UserLoginRequest} from "@/lib/apiTypes";
import {JWT} from "@auth/core/jwt";

interface CustomUser {
    id: string;
    username: string;
    token: string;
    isAdmin: boolean;
    email: string;
    imagePath: string | undefined;
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

                const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    return null;
                }

                const user = await response.json();
                console.log(user);
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt(params) {
            const {token, user} = params;

            if (user) {
                const customUser = user as CustomUser;
                token.id = customUser.id;
                token.username = customUser.username;
                token.accessToken = customUser.token;
                token.role = customUser.isAdmin ? "Admin" : "User";
                token.email = customUser.email;
                token.picture = customUser.imagePath || undefined;
            }

            return token;
        },

        async session({session, token}) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
                session.user.picture = token.picture as string || undefined;
                session.accessToken = token.accessToken as string;
            }
            return session;
        },

        authorized({auth, request: {nextUrl}}) {
            const protectedPages = ["/settings", "/user", "/forum"];

            const isOnProtectedPage = protectedPages.some((page) => {
                return nextUrl.pathname.startsWith(page)
            })

            const isLoggedIn = !!auth?.user;
            const isOnAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

            if (isOnProtectedPage) {
                // Redirect to login page if user is not logged in
                return isLoggedIn;
            }

            if (isOnAuthPage && isLoggedIn) {
                return Response.redirect(new URL('/forum/0', nextUrl));
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
            email: string;
            picture: string | undefined;
        };
        accessToken: string;
    }
}