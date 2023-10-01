import '@/src/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Sidebar from './Sidebar'

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
    <div>
      <Sidebar />
      <div className="min-h-screen flex flex-1 flex-col md:pl-64">
        { children }
      </div>
    </div>
  );
}