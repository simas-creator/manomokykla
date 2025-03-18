import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/modals/user";
import bcrypt from "bcrypt"
import connect from "@/lib/mongodb";
export const authOptions = {
    providers: [
        GoogleProvider({
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name | undefined,
                    email: profile.email,
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connect()
                try {
                    const foundUser = await User.findOne({ email: credentials.email}).lean().exec();

                    if (foundUser) {
                        const match = await bcrypt.compare(credentials.password, foundUser.password)
                        if(match) {
                            return foundUser;
                        } else {
                            return null;
                        }
                    }
                    return null;
                    
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/prisijungti',
        error: '/prisijungti?error=prisiregistruokite'
    },
    callbacks: {
        async signIn({ user, account }) {
            await connect();
            if (account.provider === "google") {
                const existingUser = await User.findOne({ email: user.email }).lean().exec();
                if (!existingUser) {
                    return false
                }
            }
            return true; 
        },
        async jwt({token, user}) {
            if (user) token.role = user.role;
            return token
        },
        async session({session, token}) {
            if(session?.user) session.user.role = token.role;
            return session
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl; 
        },
    },
    debug: true
};