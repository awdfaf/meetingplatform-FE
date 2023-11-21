import type {NextAuthOptions} from "next-auth";
import NaverProvider from "next-auth/providers/naver"
import KakaoProvider from "next-auth/providers/kakao"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"


export const options: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
          loginId: { label: "loginId", type: "text", placeholder: "SSGPOINT" },
          password: { label: "password", type: "password" }

      },
      async authorize(credentials, req) {

          console.log(credentials)
          if (!credentials?.loginId || !credentials?.password) return null

          const res = await fetch("https://moa-backend.duckdns.org/api/v1/user/auth/login", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  loginId: credentials?.loginId,
                  password: credentials?.password,

              })
          })

          // const user = await res.json()
          const user = await res.json()
          console.log(user)

          if (res.ok && user) {
              
              return user.result
          }
          

          // Return null if user data could not be retrieved
          return null
      }
  }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || ""
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ""
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
  ],
  secret: process.env.CRED_SECRET_KEY,

  session: {
    strategy: 'jwt',
    maxAge: 60 * 30
},

  callbacks: {

    async signIn({ user, account, profile, email, credentials, }) {
      console.log(user);
      console.log(account);

      return true;
    },


    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/login', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }

}

