import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log(profile);
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        throw new Error("Failed to fetch");
                    }

                    const user = await res.json();
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error in authorize function:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/prisijungti',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) token.role = user.role;
            return token
        },
        async session({session, token}) {
            if(session?.user) session.user.role = token.role;
            return session
        }
    },
    debug: true // Enable debug mode for detailed logs
};