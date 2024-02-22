import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import LoginBtn from '@/components/LoginBtn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pre_Music',
  description: '좋아하는 음악을 자랑하고, 추천해보세요. 그리고 새로운 음악을 찾아봐요!',
  icons : {
    icon: '/icons/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className}`}>
        <div className='lg:mx-60 md:mx-30 mx-10 mt-10 text-pretty'>
          <LoginBtn />
          <Header />
          {children}
        </div>
        <Toaster />
        </body>
    </html>
  )
}
