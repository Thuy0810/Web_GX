import React from "react"
import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: 'Giáo Xứ Ngọc Mạch',
  description: 'Trang web chính thức của Giáo xứ Ngọc Mạch - Tổng Giáo phận Hà Nội',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body
        suppressHydrationWarning
        className={`${beVietnamPro.className} antialiased`}
      >
        <Header />
        {children} 
        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
