"use server"

import { cookies } from 'next/headers'
import connect from "@/utils/db";
import bcrypt from "bcryptjs"
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

  providers: [
    CredentialsProvider({
      id: "credentials",
      username: "Credentials",
      async authorize(credentials) {


        try {
          // check if the user exists api
          const res = await fetch('http://localhost:4000/api/user/login', {
            method: "POST",
            headers: {
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
              username: credentials?.name,
              password: credentials?.password
            })
          })
          const user = await res.json()

          if (res.status == 200) {

            return user

          }
          else {
            throw new Error('wrong in username or password', { errors: data })
          }
        } catch (err) {
          throw new Error(err)
        }

        // await connect()
        // try {
        //   const user = await User.findOne({
        //     username: credentials.username
        //   })

        //   if (user) {
        //     const isPasswordCorrect = await bcrypt.compare(
        //       credentials.password,
        //       user.password
        //     )


        //     if (isPasswordCorrect) {
        //       return user
        //     } else {
        //       throw new Error("email or password is not correct")
        //     }
        //   } else {
        //     throw new Error("email or password is not correct")
        //   }
        // } catch (err) {
        //   throw new Error(err)
        // }

      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET

    }),

  ],
  // callbacks: {
  //   async session({ session, user, token }) {
  //     return session
  //   },
  // },
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}
    },
    async session({session, token , user}) {
      session.user = token
      return session
    }
  },
  pages: {
    error: "/dashboard/login",
  },
})

export { handler as GET, handler as POST };


