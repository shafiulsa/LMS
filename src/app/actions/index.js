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
            return { error: error.cause?.err?.message || "Invalid credentials." };
        }
        return { error: error.message || "Something went wrong." };
    }
}