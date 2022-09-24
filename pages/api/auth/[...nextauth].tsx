import NextAuth, { DefaultSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi,{ LOGIN_URL } from '../../../lib/spotify';
import { JWT } from "next-auth/jwt";
// import session from 'next-session'

async function refreshAccessToken(token){
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const {body:refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS",refreshedToken);

        return{
            ...token,
            accessToken:refreshedToken.access_token,
            accessTokenExpires:Date.now() + refreshedToken.expires_in *1000,
            refreshToken:refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        console.log(error)
        return{
            ...token,
            error:"RefreshAccessTokenError"
        }
    }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTRING ACCESS TOKEN IS VALID");
        return token;
      }
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING");
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});