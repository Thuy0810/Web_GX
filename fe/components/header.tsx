"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Tin tức",
    href: "/tin-tuc",
    submenu: [
      { label: "Sinh hoạt/ Hoạt động", href: "/sinh-hoat" },
      { label: "Thông báo", href: "/thong-bao" },
    ],
  },
  {
    label: "Đoàn thể",
    href: "/doan-the",
    submenu: [
      { label: "Ca Đoàn Magis", href: "/ca-doan-magis" },
      { label: "Ca Đoàn Têrêsa", href: "/ca-doan-teresa" },
      { label: "Ca Đoàn Thánh Gia", href: "/ca-doan-thanh-gia" },
      { label: "Hội Anna", href: "/hoi-anna" },
      { label: "Hội Caritas", href: "/hoi-caritas" },
      { label: "Hội Đồng Mục Vụ", href: "/hoi-dong-muc-vu" },
      { label: "Hội Gia Trưởng", href: "/hoi-gia-truong" },
      { label: "Hội Hiền Mẫu", href: "/hoi-hien-mau" },
      { label: "Hội Legio", href: "/hoi-legio" },
      { label: "Thiếu Nhi", href: "/thieu-nhi" },
    ],
  },
  {
    label: "Đào tạo",
    href: "/dao-tao",
    submenu: [
      { label: "Cầu nguyện với Lời Chúa", href: "/cau-nguyen" },
      { label: "Giáo lý Hôn Nhân & Dự tòng", href: "/giao-ly-hon-nhan" },
      { label: "Giáo lý Thiếu Nhi", href: "/giao-ly-thieu-nhi" },
      { label: "Lớp Tiếng Anh", href: "/lop-tieng-anh" },
    ],
  },
  {
    label: "Bài viết/Suy niệm",
    href: "/bai-viet",
    submenu: [
      { label: "Suy niệm", href: "/suy-niem" },
      { label: "Suy tư", href: "/suy-tu" },
      { label: "Chuyên mục", href: "/chuyen-muc" },
    ],
  },
  {
    label: "Tư liệu",
    href: "/tu-lieu",
    submenu: [
      { label: "Hình ảnh", href: "/hinh-anh" },
      { label: "Video", href: "/video" },
      { label: "Các biểu mẫu hành chính", href: "/bieu-mau" },
    ],
  },
  {
    label: "Giới Thiệu",
    href: "/gioi-thieu",
    submenu: [
      { label: "Giáo Xứ", href: "/giao-xu" },
      { label: "Các Giáo Họ", href: "/giao-ho" },
      { label: "Liên Hệ", href: "/lien-he" },
    ],
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-bold text-primary">GX</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary-foreground leading-tight">
                Giáo xứ Ngọc Mạch
              </h1>
              <p className="text-xs text-primary-foreground/80">
                Tổng Giáo phận Hà Nội
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-white/10 rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground p-0 h-8 w-6"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent className="bg-white">
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.label} asChild>
                        <Link href={subitem.href} className="cursor-pointer text-foreground hover:text-primary">
                          {subitem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-white/10 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground hover:bg-white/10"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground hover:bg-white/10"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10">
          <nav className="container mx-auto px-4 py-4">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 last:border-0">
                <Link
                  href={item.href}
                  className="block py-3 text-primary-foreground font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-4 pb-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
