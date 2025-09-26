import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InactiveAccountError, InvalidEmailPasswordError } from "./utils/errors"
import axios from "axios"
import { IUser } from "./types/next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
                        username: credentials?.email,
                        password: credentials?.password,
                    })
                    // console.log("Backend response status:", res.status);
                    // console.log("Backend response data:", JSON.stringify(res.data, null, 2));
                    // Backend response status: 201
                    // Backend response data: {
                    //     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh1YW52dWF1ZGkyMDAyQGdtYWlsLmNvbSIsInN1YiI6IjY4ZDU2ZGRiOTBiOTA0ZDc2ODA1MDJhNSIsImlhdCI6MTc1ODg3NDMwMywiZXhwIjoxNzU4ODc0MzAzfQ.8NYqAqBKW7AaykJJW5y0tMBhJuc8jGUwc-kuGw3rSP4",
                    //         "user": {
                    //         "_id": "68d56ddb90b904d7680502a5",
                    //             "email": "xuanvuaudi2002@gmail.com",
                    //                 "name": "xvu"
                    //     }
                    // }
                    const responseData = res.data
                    // Check if we have the expected structure
                    if (responseData && responseData.access_token && responseData.user) {
                        // console.log("SUCCESS: Returning user object to NextAuth:", responseData);
                        // SUCCESS: Returning user object to NextAuth: {
                        // access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh1YW52dWF1ZGkyMDAyQGdtYWlsLmNvbSIsInN1YiI6IjY4ZDU2ZGRiOTBiOTA0ZDc2ODA1MDJhNSIsImlhdCI6MTc1ODg3NDMwMywiZXhwIjoxNzU4ODc0MzAzfQ.8NYqAqBKW7AaykJJW5y0tMBhJuc8jGUwc-kuGw3rSP4',
                        // user: {
                        //     _id: '68d56ddb90b904d7680502a5',
                        //     email: 'xuanvuaudi2002@gmail.com',
                        //     name: 'xvu'
                        // }
                        // }
                        return {
                            _id: responseData.user?._id,
                            email: responseData.user?.email,
                            name: responseData.user?.name,
                            accessToken: responseData.access_token
                        };
                    }

                    console.log("FAILED: Invalid response structure - missing access_token or user");
                    console.log("Response was:", responseData);
                    return null;
                } catch (err) {
                    console.error("CATCH BLOCK: Error occurred");

                    if (axios.isAxiosError(err)) {
                        console.error("Axios error details:", {
                            status: err.response?.status,
                            statusText: err.response?.statusText,
                            data: err.response?.data,
                            url: err.config?.url,
                            method: err.config?.method
                        });
                        if (axios.isAxiosError(err)) {
                            if (err.response?.status === 401) throw new InvalidEmailPasswordError();
                            if (err.response?.status === 400) throw new InactiveAccountError();
                        }
                    } else {
                        console.error("Unknown error:", err);
                    }

                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user as IUser
            }
            return token
        },

        session({ session, token }) {
            (session.user as IUser) = token.user
            return session
        },
        authorized: async ({ auth }) => {
            // Logged in users are authenticated
            // otherwise redirect to login page
            return !!auth
        }
    },
    debug: true,
})