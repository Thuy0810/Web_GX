"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const tabs = [
  { id: "thong-bao", label: "Thông báo" },
  { id: "sinh-hoat", label: "Sinh hoạt/ Hoạt động" },
]

const newsItems = [
  {
    id: 1,
    title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
    date: "13/02/2025",
    excerpt:
      "Giáo xứ Ngọc Mạch xin thông báo về việc mở lớp giáo lý Hôn nhân – Dự tòng khóa 1 năm 2025 như sau: Thời gian Khai giảng vào ngày 20/02/2025...",
    image: "/images/news-1.jpg",
    category: "thong-bao",
  },
  {
    id: 2,
    title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
    date: "14/10/2024",
    image: "/images/news-2.jpg",
    category: "thong-bao",
  },
  {
    id: 3,
    title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
    date: "24/09/2024",
    image: "/images/news-3.jpg",
    category: "sinh-hoat",
  },
  {
    id: 4,
    title: "Thông báo: Thay đổi giờ Thánh Lễ tại Giáo xứ Ngọc Mạch",
    date: "26/08/2024",
    image: "/images/news-4.jpg",
    category: "thong-bao",
  },
  {
    id: 5,
    title: "Giáo xứ Ngọc Mạch ra mắt Hội Đồng Mục Vụ nhiệm kỳ 2024-2028",
    date: "16/08/2024",
    image: "/images/news-5.jpg",
    category: "sinh-hoat",
  },
]

export function NewsSection() {
  const [activeTab, setActiveTab] = useState("thong-bao")

  const filteredNews = newsItems.filter((item) => item.category === activeTab)
  const mainNews = filteredNews[0]
  const sideNews = filteredNews.slice(1, 5)

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-l-lg">
              Tin tức
            </h2>
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/tin-tuc"
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main News */}
          {mainNews && (
            <Link
              href={`/tin-tuc/${mainNews.id}`}
              className="lg:col-span-2 group"
            >
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={mainNews.image || "/placeholder.svg"}
                  alt={mainNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {mainNews.title}
                  </h3>
                  <p className="text-sm text-white/80">{mainNews.date}</p>
                  {mainNews.excerpt && (
                    <p className="text-sm text-white/90 mt-2 line-clamp-2 hidden sm:block">
                      {mainNews.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Side News */}
          <div className="space-y-4">
            {sideNews.map((item) => (
              <Link
                key={item.id}
                href={`/tin-tuc/${item.id}`}
                className="flex gap-4 group"
              >
                <div className="relative w-24 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
