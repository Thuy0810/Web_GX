import React from "react"
import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import globalService from "@/services/global.services"
import { baseUrl } from "@/services"

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export async function generateMetadata(): Promise<Metadata> {
  let siteName = 'Giáo Họ Tân Định'
  let siteDescription = 'Trang web chính thức của Giáo họ Tân Định - Giáo phận Vinh'
  let faviconUrl: string | undefined = undefined
  
  try {
    const response = await globalService().getGlobal()
    const globalData = response.data || response || null
    if (globalData) {
      siteName = globalData.siteName || siteName
      const diocese = globalData.diocese || 'Giáo phận Vinh'
      siteDescription = globalData.siteDescription || `${siteName} - ${diocese}`
      
      // Xử lý favicon cho browser tab
      const favicon = globalData.favicon
      if (favicon) {
        let extractedUrl = null
        
        // Kiểm tra các định dạng khác nhau
        if (typeof favicon === 'string') {
          extractedUrl = favicon
        } else if (favicon?.url) {
          extractedUrl = favicon.url
        } else if (favicon?.data?.attributes?.url) {
          extractedUrl = favicon.data.attributes.url
        } else if (favicon?.data?.url) {
          extractedUrl = favicon.data.url
        } else if (favicon?.attributes?.url) {
          extractedUrl = favicon.attributes.url
        } else if (favicon?.data) {
          extractedUrl = favicon.data.url || favicon.data
        }
        
        // Xử lý URL - nếu là relative path thì thêm baseUrl
        if (extractedUrl) {
          if (typeof extractedUrl === 'string' && !extractedUrl.startsWith('http') && !extractedUrl.startsWith('//') && !extractedUrl.startsWith('data:')) {
            faviconUrl = extractedUrl.startsWith('/') 
              ? `${baseUrl}${extractedUrl}` 
              : `${baseUrl}/${extractedUrl}`
          } else {
            faviconUrl = extractedUrl
          }
        }
      }
    }
  } catch (error) {
    // Error fetching global data for metadata
  }

  const metadata: Metadata = {
    title: siteName,
    description: siteDescription,
    generator: 'v0.app',
  }

  // Thêm favicon vào metadata nếu có
  if (faviconUrl) {
    metadata.icons = {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    }
  }

  return metadata
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
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
