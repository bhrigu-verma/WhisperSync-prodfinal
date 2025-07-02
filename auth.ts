import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

// Debug environment variables
console.log('=== ENVIRONMENT VARIABLES DEBUG ===')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING')
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING')
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'MISSING')
console.log('NODE_ENV:', process.env.NODE_ENV)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  
  // Custom logger for debugging
  logger: {
    error(code, metadata) {
      console.error('❌ NextAuth Error:', code, metadata)
    },
    warn(code) {
      console.warn('⚠️ NextAuth Warning:', code)
    },
    debug(code, metadata) {
      console.log('🐛 NextAuth Debug:', code, metadata)
    }
  },
  
  // Custom callbacks for debugging
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔐 Sign in attempt:', { user: user.email, account: account?.provider })
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 Redirect:', { url, baseUrl })
      // Always redirect to base URL to avoid issues
      return baseUrl
    },
    async session({ session, token }) {
      console.log('📊 Session callback:', session)
      return session
    },
    async jwt({ token, account, user }) {
      console.log('🎫 JWT callback:', { token, account: account?.provider })
      return token
    }
  },
  
  // Error page for debugging
  pages: {
    error: '/auth/error', // Custom error page
  },
  
  // Event handlers for debugging
  events: {
    async signIn(message) {
      console.log('✅ Sign in event:', message)
    },
    async signOut(message) {
      console.log('👋 Sign out event:', message)
    },
    async createUser(message) {
      console.log('👤 Create user event:', message)
    },
    async session(message) {
      console.log('📝 Session event:', message)
    }
  }
})

export { handler as GET, handler as POST }