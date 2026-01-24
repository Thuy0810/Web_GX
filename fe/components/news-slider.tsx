"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
    date: "13/02/2025",
    excerpt:
      "Giáo xứ Ngọc Mạch xin thông báo về việc mở lớp giáo lý Hôn nhân – Dự tòng khóa 1 năm 2025 như sau: Thời gian Khai giảng vào ngày 20/02/2025 và học liên tục trong vòng 4,5 tháng...",
    image: "/images/slide-1.jpg",
    href: "/thong-bao/khai-giang-lop-giao-ly",
  },
  {
    id: 2,
    title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
    date: "14/10/2024",
    excerpt:
      'Kính thưa cộng đoàn, Trong ý cầu nguyện của Đức Giáo Hoàng dành cho tháng Mân Côi năm nay, mở đầu ngài đã phát biểu rằng: "Tất cả các Kitô hữu chúng ta đều có trách nhiệm với sứ mạng của Giáo hội."',
    image: "/images/slide-2.jpg",
    href: "/tin-tuc/ca-doan-teresa",
  },
  {
    id: 3,
    title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
    date: "24/09/2024",
    excerpt:
      "Vào lúc 18h30, thứ Hai, ngày 23/9/2024, Giáo xứ Ngọc Mạch long trọng tổ chức Thánh lễ làm phép viên đá đầu tiên của công trình nhà thờ Giáo xứ...",
    image: "/images/slide-3.jpg",
    href: "/tin-tuc/thanh-le-dat-vien-da",
  },
  {
    id: 4,
    title: "Giáo xứ Ngọc Mạch ra mắt Hội Đồng Mục Vụ nhiệm kỳ 2024-2028",
    date: "16/08/2024",
    excerpt:
      "Tối ngày 15/08/2024, Lễ Đức Maria hồn xác lên Trời, Giáo xứ Ngọc Mạch long trọng tổ chức Thánh Lễ ra mắt Ban Thường Vụ Hội Đồng Mục Vụ Giáo xứ nhiệm kỳ 2024-2028...",
    image: "/images/slide-4.jpg",
    href: "/tin-tuc/ra-mat-hoi-dong-muc-vu",
  },
]

export function NewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Slider */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg bg-card shadow-md">
            <div className="relative aspect-[16/9]">
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded mb-3">
                  THÔNG BÁO
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-sm text-white/80 mb-2">
                  {slides[currentSlide].date}
                </p>
                <p className="text-sm text-white/90 line-clamp-2 hidden sm:block">
                  {slides[currentSlide].excerpt}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Side News List */}
          <div className="space-y-4">
            {slides.slice(0, 4).map((slide, index) => (
              <Link
                key={slide.id}
                href={slide.href}
                className={`block p-4 rounded-lg transition-all ${
                  index === currentSlide
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted"
                }`}
                onMouseEnter={() => setCurrentSlide(index)}
              >
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                  {slide.title}
                </h3>
                <p
                  className={`text-xs ${
                    index === currentSlide
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {slide.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
