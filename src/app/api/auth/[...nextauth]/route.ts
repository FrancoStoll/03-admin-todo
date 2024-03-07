import prisma from "@/libs/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react"
import { signInEmailPassword } from "@/app/auth/actions/auth-actions"




export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@email.com" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(credentials!.email, credentials!.password);

        if (user) {
          return user
        }

        return null
      }
    }),
  ],


  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {



      return true
    },

    async jwt({ token, user, account, profile }) {

      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-id'

      return token;
    },

    async session({ session, token, user }) {


      if (session && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles
      }

      return session
    }

  }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }