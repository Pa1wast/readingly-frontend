import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createUser, getUser } from './actions';

const authConfig = {
  providers: [
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
  ],

  callbacks: {
    authorized(request) {
      return !!request?.auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser) await createUser({ email: user.email, name: user.name });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, _user }) {
      const user = await getUser(session.user.email);

      session.user.userId = user.id;

      session.user.wantToReadBooks = user.want_to_read_books;
      session.user.currentlyReadingBooks = user.currently_reading_books;
      session.user.readBooks = user.read_books;
      session.user.ratedBooks = user.rated_books || [];

      session.user.notInterestedBooks = user.not_interested_books || [];

      session.user.reviews = user.reviews || [];
      session.user.favouriteGenres = user.favourite_genres || [];

      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
