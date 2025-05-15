import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID as string
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    if (!clientSecret || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
    // adapter: ,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            return session
        },
    }
}