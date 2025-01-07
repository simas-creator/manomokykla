import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connect from "@/lib/mongodb"
import User from "@/lib/modals/user"

import { compare } from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },

        authorize: async (credentials) => {
          const email = credentials.email 
          const password = credentials.password 
          if(!email || !password) {
            console.log("credential sign in error: ")
          }
          await connect();

          const user = await User.findOne({email}).select("+password +role")
          if(!user) {
            throw new CredentialsSignin("vartotojas nerastas")

          }

          if(!user.password) {
            throw new CredentialsSignin("klaida: slaptazodis nerastas")
          }
          const isMatched = await compare(password, user.password)
          if(!isMatched) {
            throw new CredentialsSignin("klaida: slaptazodis nesutampa")
          }

          const userData = {
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user._id,
          }
          return userData;
        },
      }),
  ],
  pages: {
    signIn: "/prisijungti"
  }
})
