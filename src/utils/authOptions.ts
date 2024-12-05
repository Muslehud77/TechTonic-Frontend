import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginUser } from "../service/auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const res = (await loginUser(
          credentials as { email: string; password: string }
        )) as User & {
          accessToken: string;
        };
        if (res.accessToken) {
          return res; 
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks : {
    async signIn ({ user, account, profile }: { user: User; account: any; profile: any }) {

      if(!profile || !account){
        return false;
      }

      const { name, email, image } = user;
      const { provider } = account;
      console.log({ name, email, image, provider });
      return true;
    }
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
