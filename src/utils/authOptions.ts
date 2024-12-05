import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginUser } from "../service/auth";
import { envConfig } from "../config/envConfig";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: envConfig.GITHUB_ID!,
      clientSecret: envConfig.GITHUB_SECRET!,
    }),
    Google({
      clientId: envConfig.GOOGLE_ID!,
      clientSecret: envConfig.GOOGLE_SECRET!,
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
    async signIn ({ user, account, profile }: { user: User; account: any; profile?: any }) {

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
