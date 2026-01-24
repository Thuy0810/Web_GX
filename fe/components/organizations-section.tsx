"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const organizationTabs = [
  { id: "hien-mau", label: "Hội Hiền Mẫu" },
  { id: "gia-truong", label: "Hội Gia Trưởng" },
  { id: "caritas", label: "Hội Caritas" },
  { id: "legio", label: "Hội Legio" },
  { id: "muc-vu", label: "Hội Đồng Mục Vụ" },
  { id: "anna", label: "Hội Anna" },
]

const organizationNews = [
  {
    id: 1,
    title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
    excerpt:
      "Giáo xứ Ngọc Mạch xin thông báo về việc mở lớp giáo lý Hôn nhân – Dự tòng khóa 1 năm 2025...",
    image: "/images/org-1.jpg",
    org: "hien-mau",
  },
  {
    id: 2,
    title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
    excerpt:
      "Kính thưa cộng đoàn, Trong ý cầu nguyện của Đức Giáo Hoàng dành cho tháng Mân Côi năm nay...",
    image: "/images/org-2.jpg",
    org: "gia-truong",
  },
  {
    id: 3,
    title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
    excerpt:
      "Vào lúc 18h30, thứ Hai, ngày 23/9/2024, Giáo xứ Ngọc Mạch long trọng tổ chức Thánh lễ làm phép viên đá...",
    image: "/images/org-3.jpg",
    org: "caritas",
  },
  {
    id: 4,
    title: "Thư ngỏ – Mời gọi tham gia Ca đoàn Thánh gia Giáo xứ Ngọc Mạch",
    image: "/images/org-4.jpg",
    org: "legio",
  },
  {
    id: 5,
    title: "Ca đoàn Têrêsa Giáo xứ Ngọc Mạch mừng kính lễ Quan Thầy",
    image: "/images/org-5.jpg",
    org: "muc-vu",
  },
  {
    id: 6,
    title: "Mừng Kính Lễ Thánh Giuse Thợ – Bổn mạng Hội Gia trưởng Giáo xứ Ngọc Mạch",
    image: "/images/org-6.jpg",
    org: "anna",
  },
]

export function OrganizationsSection() {
  const [activeTab, setActiveTab] = useState("hien-mau")

  const mainNews = organizationNews.slice(0, 3)
  const sideNews = organizationNews.slice(3, 6)

  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center">
            <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-l-lg">
              Đoàn thể
            </h2>
            <div className="flex flex-wrap">
              {organizationTabs.slice(0, 4).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-card text-muted-foreground hover:bg-card/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/doan-the"
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Articles */}
          <div className="lg:col-span-2 space-y-4">
            {mainNews.map((item) => (
              <Link
                key={item.id}
                href={`/doan-the/${item.id}`}
                className="flex gap-4 bg-card p-4 rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="relative w-32 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  {item.excerpt && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Side News */}
          <div className="space-y-3">
            {sideNews.map((item) => (
              <Link
                key={item.id}
                href={`/doan-the/${item.id}`}
                className="flex gap-3 p-3 bg-card rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="flex-1 font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
