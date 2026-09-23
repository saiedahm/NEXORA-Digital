 import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import { prisma } from "@/lib/db/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const email = user.email.toLowerCase().trim();

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            email,
            name: user.name ?? null,
          },
        });

        await prisma.organization.create({
          data: {
            name: `${user.name ?? "NEXORA"} Organization`,
            members: {
              create: {
                userId: newUser.id,
                role: "ORGANIZATION_OWNER",
              },
            },
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            name: user.name ?? existingUser.name,
          },
        });

        const membership = await prisma.organizationMember.findFirst({
          where: {
            userId: existingUser.id,
          },
        });

        if (!membership) {
          await prisma.organization.create({
            data: {
              name: `${user.name ?? "NEXORA"} Organization`,
              members: {
                create: {
                  userId: existingUser.id,
                  role: "ORGANIZATION_OWNER",
                },
              },
            },
          });
        }
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email.toLowerCase().trim(),
        },
      });

      if (dbUser) {
        token.userId = dbUser.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }

      return session;
    },
  },
});
