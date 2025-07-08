import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',  // <-- FIXED: should be a page, not an API route
  },
  callbacks: {
    async session({ session, user, token }) {
      // Add user id to session
      if (session.user) {
        (session.user as typeof session.user & { id: string }).id = user?.id || token?.sub || "";
      }
      return session;
    },
  },
};

export default authOptions;