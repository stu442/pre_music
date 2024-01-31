import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import LoginBtn from '@/components/LoginBtn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className}`}>
        <div className='mx-60 mt-10'>
          <LoginBtn />
          <Header />
          {children}
        </div>
        <Toaster />
        </body>
    </html>
  )
}
