'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function ceredntialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        return { success: true, response };
    } catch (error) {
        if (error instanceof AuthError) {
            let message = error.cause?.err?.message || error.cause?.message || "Invalid credentials.";
            if (typeof message === "string") {
                message = message.replace(/^Error:\s*/, "");
            }
            return { error: message };
        }
        return { error: error.message || "Something went wrong." };
    }
}