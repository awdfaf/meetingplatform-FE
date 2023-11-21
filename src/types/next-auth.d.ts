import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {

    interface Session {
        user: {
            userUuid : string,
            birthYear: number,
            gender: string,
            name: string,
            nickname: string,
            token: string,
            companyCategory: string,
        } & DefaultSession["user"]
    }
}
