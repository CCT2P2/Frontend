import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {UserLoginRequest} from "@/lib/apiTypes";
import {JWT} from "@auth/core/jwt";
import {cookies} from "next/headers";

const tokenExpiration = 55 * 60 * 1000;
export const refreshTokenError = "RefreshTokenError"

interface CustomUser {
    userId: string;
    username: string;
    accessToken: string;
    isAdmin: number;
    email: string;
    imagePath: string | undefined;
}

// helper function to... well refresh the access token and returns the updated jwt session token
async function refreshAccessToken(token: JWT) {
    try {
        const cookiesStore = await cookies()

        const response = await fetch(`${process.env.API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': cookiesStore.toString()
            }
        });

        if (!response.ok) {
            throw new Error("Failed to refresh access token: " + response.statusText);
        }

        const setCookieHeader = response.headers.get('set-cookie')
        if (setCookieHeader) {
            const cookieParts = setCookieHeader.split(';')[0].split('=');
            const name = cookieParts[0];
            const value = cookieParts[1];

            cookiesStore.set(name, value, {
                secure: true,
                httpOnly: true,
                sameSite: "strict",
            })
        }

        const refreshedToken = await response.json();

        return {
            ...token,
            accessToken: refreshedToken.accessToken,
            expiresAt: Date.now() + tokenExpiration,
        }
    } catch (error) {
        console.error("Error refreshing access token: " + error);
        return {
            ...token,
            error: refreshTokenError,
        }
    }
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


                const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                    credentials: "include",
                });

                if (!response.ok) {
                    return null;
                }
                const setCookieHeader = response.headers.get('set-cookie')
                if (setCookieHeader) {
                    const cookieParts = setCookieHeader.split(';')[0].split('=');
                    const name = cookieParts[0];
                    const value = cookieParts[1];

                    const cookiesStore = await cookies()
                    cookiesStore.set(name, value, {
                        secure: true,
                        httpOnly: true,
                        sameSite: "strict",
                    })
                }

                const user = await response.json();
                console.log(user);
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
                console.log(user)
                console.log(token)
                // this part runs on initial sign in
                const customUser = user as CustomUser;
                token.id = customUser.userId;
                token.username = customUser.username;
                token.accessToken = customUser.accessToken;
                token.role = customUser.isAdmin === 1 ? "Admin" : "User";
                token.email = customUser.email;
                token.picture = customUser.imagePath || undefined;
                token.expiresAt = Date.now() + tokenExpiration;

                return token;
            }

            // checks if token is expired
            if (token.expiresAt && typeof token.expiresAt === "number") {
                if (Date.now() < token.expiresAt) {
                    return token
                }

                return refreshAccessToken(token);
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
                session.expiresAt = token.expiresAt as number;

                // if refreshAccessToken failed, token will include an error. we add this to session too.
                // this is later used to redirect the user to the login screen
                if (token.error) {
                    session.error = token.error as string;
                }
            }
            return session;
        },

        authorized({auth, request: {nextUrl}}) {
            const protectedPages = ["/settings", "/user", "/forum"];
            const isProtectedPage = protectedPages.some(page => nextUrl.pathname.startsWith(page));
            const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');
            const isLoggedIn = !!auth?.user;
            const hasRefreshError = auth?.error === refreshTokenError;

            // Handle protected pages
            if (isProtectedPage) {
                if (!isLoggedIn) {
                    return Response.redirect(new URL('/login', nextUrl));
                }

                if (hasRefreshError) {
                    // Session expired on protected page
                    return Response.redirect(new URL('/login', nextUrl));
                }

                return true;
            }

            // Handle auth pages (login/register)
            if (isAuthPage) {
                if (isLoggedIn && !hasRefreshError) {
                    return Response.redirect(new URL('/forum/0', nextUrl));
                }

                return true;
            }

            return true;
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
        expiresAt: number;
        error: string;
    }
}
