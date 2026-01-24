import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const trainingItems = [
  {
    id: 1,
    title: "Muôn đời con sẽ ngợi ca Danh Ngài",
    excerpt:
      'Giáo xứ Ngọc Mạch, 16.07.2024. "Hồng ân Thiên Chúa bao la. Muôn đời con sẽ ngợi ca Danh Ngài." Đó là tâm tình của chúng con, các học viên lớp giáo lý hôn nhân dự...',
    image: "/images/training-1.jpg",
  },
  {
    id: 2,
    title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Năm 2024",
    image: "/images/training-2.jpg",
  },
  {
    id: 3,
    title: "Lời Cám Ơn: Lớp Giáo Lý Hôn Nhân Dự Tòng – Năm 2023 Khóa 2",
    image: "/images/training-3.jpg",
  },
  {
    id: 4,
    title: "Tổng kết lớp giáo lý hôn nhân dự tòng 2023 – Khóa 1",
    image: "/images/training-4.jpg",
  },
  {
    id: 5,
    title: "Cách Lần Hạt Mân Côi: song ngữ Việt – Anh",
    image: "/images/training-5.jpg",
  },
  {
    id: 6,
    title: "THÔNG BÁO – Khai giảng lớp Giáo lý Hôn nhân Dự tòng – Năm 2023",
    image: "/images/training-6.jpg",
  },
]

export function TrainingSection() {
  const mainItem = trainingItems[0]
  const sideItems = trainingItems.slice(1, 6)

  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
            Đào tạo
          </h2>
          <Link
            href="/dao-tao"
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Item */}
          <Link href={`/dao-tao/${mainItem.id}`} className="group">
            <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={mainItem.image || "/placeholder.svg"}
                  alt={mainItem.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {mainItem.title}
                </h3>
                {mainItem.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {mainItem.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>

          {/* Side Items */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {sideItems.map((item) => (
              <Link
                key={item.id}
                href={`/dao-tao/${item.id}`}
                className="flex gap-3 group"
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
