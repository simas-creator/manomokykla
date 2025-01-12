import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/modals/user";
import bcrypt from "bcryptjs"
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
                    const foundUser = await User.findOne({ email: credentials.email}).lean().exec();

                    if (foundUser) {
                        const match = await bcrypt.compare(credentials.password, foundUser.password)
                        if(match) {
                            return foundUser;
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