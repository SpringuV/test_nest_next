'use server'
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
    try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            // callbackUrl: "/",  
            redirect: false,
        })

        // Nếu NextAuth trả về lỗi
        if (res?.error) {
            if (res.error === "InvalidEmailPasswordError") {
                return { error: "Incorrect email or password", code: 1 };
            }
            if (res.error === "InactiveAccountError") {
                return { error: "Your account is inactive", code: 2 };
            }
            return { error: res.error, code: 0 };
        }
        return res
    } catch (error) {
        if ((error as any).name === "InvalidEmailPasswordError") {
            return {
                error: (error as any).type,
                code: 1
            }
        } else if ((error as any).name === "InactiveAccountError") {
            return {
                error: (error as any).type,
                code: 2
            }
        } else {
            return {
                error: "Internal server error",
                code: 0
            }
        }
    }
}