import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db"


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Sign in attempt:", { user: user.email, account: account?.provider })
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect:", { url, baseUrl })
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({ session, user }) {
      console.log("Session callback:", { userId: user.id })
      const existingUser = await prisma.user.findFirst({
        where: {
          id: user.id
        },
        select: {
          plan: true
        }
      })
      if (existingUser) {
        //@ts-ignore
        session.user.plan = existingUser.plan
      }
      return session
    }
  }
})