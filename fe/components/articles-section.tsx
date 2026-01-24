import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Sứ điệp Mùa Chay năm 2023 của ĐTC Phanxicô",
    excerpt:
      "Trong Sứ điệp Mùa Chay 2023, Đức Thánh Cha Phanxicô nhấn mạnh mối quan hệ giữa hành trình Mùa Chay và hành trình hiệp hành...",
    image: "/images/article-1.jpg",
  },
  {
    id: 2,
    title: "Đời con dâng Chúa",
    image: "/images/article-2.jpg",
  },
  {
    id: 3,
    title: "THÔNG BÁO – Khai giảng lớp Giáo lý Hôn nhân Dự tòng – Năm 2023",
    image: "/images/article-3.jpg",
  },
  {
    id: 4,
    title: "Chúc thư tinh thần của Đức nguyên Giáo Hoàng Biển Đức XVI",
    image: "/images/article-4.jpg",
  },
  {
    id: 5,
    title: "Tổng kết lớp giáo lý hôn nhân dự tòng 2022 – Khóa 2",
    image: "/images/article-5.jpg",
  },
  {
    id: 6,
    title: "Giáo xứ Ngọc Mạch mừng Lễ Bổn Mạng",
    image: "/images/article-6.jpg",
  },
]

export function ArticlesSection() {
  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 6)

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
            Bài viết/ Suy niệm
          </h2>
          <Link
            href="/bai-viet"
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Article */}
          <Link href={`/bai-viet/${mainArticle.id}`} className="group">
            <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={mainArticle.image || "/placeholder.svg"}
                  alt={mainArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {mainArticle.title}
                </h3>
                {mainArticle.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {mainArticle.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>

          {/* Side Articles */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                href={`/bai-viet/${article.id}`}
                className="flex gap-3 group"
              >
                <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="flex-1 font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
