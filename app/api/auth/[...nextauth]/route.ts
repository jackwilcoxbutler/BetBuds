import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        //const res = await auth
        //need to create authenticate function and login api call
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  session : {strategy : "jwt"},
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;// token.uid or token.sub both work
      }      
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id; // token.uid or token.sub both work
      }
      return token;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
