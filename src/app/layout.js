import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { ThemeProvider } from "@/context/ThemeContext";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SnJcZ Dev',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className='container mx-auto min-h-screen flex flex-col justify-between'>
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}