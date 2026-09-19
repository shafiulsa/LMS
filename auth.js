import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import { dbConnect } from "./service/mongo";
import bcrypt from "bcryptjs";

export const { 
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await dbConnect();
                    const user = await User.findOne({ email: credentials?.email }).lean();
                    console.log("Found user:", user);

                    if (!user) {
                        console.error("User not found");
                        throw new Error("User not found");
                    }

                    const isMatch = await bcrypt.compare(credentials.password, user.password);

                    if (!isMatch) {
                        console.error("Password Mismatch");
                        throw new Error("Check your password");
                    }

                    return {
                        id: user._id.toString(),
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        role: user.role,
                    };
                } catch (err) {
                    console.error("Authorize error:", err);
                    throw err;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
});