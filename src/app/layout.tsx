import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './Navbar/Navbar'
import Footer from './footer'
import  SessionProvider  from './sessionProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flowmazon',
  description: 'we make your wallet cry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Navbar />
        <main className='p-4 max-w-7xl ms-auto mx-auto min-w-[300px]'>
        {children}
        </main>
        <Footer />
        </SessionProvider>
        </body>
    </html>
  )
}