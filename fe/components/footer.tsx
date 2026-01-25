import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"

const quickLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Tin tức", href: "/menu/tin-tuc" },
  { label: "Sinh hoạt/ Hoạt động", href: "/menu/sinh-hoat" },
  { label: "Thông báo", href: "/menu/thong-bao" },
  { label: "Đoàn thể", href: "/menu/doan-the" },
  { label: "Đào tạo", href: "/menu/dao-tao" },
  { label: "Bài viết/Suy niệm", href: "/menu/bai-viet" },
  { label: "Tư liệu", href: "/menu/tu-lieu" },
  { label: "Giới Thiệu", href: "/menu/gioi-thieu" },
  { label: "Liên Hệ", href: "/lien-he" },
]

const externalLinks = [
  { label: "Tòa Thánh Vatican", href: "https://www.vatican.va" },
  { label: "Vatican News (Tiếng Việt)", href: "https://www.vaticannews.va/vi.html" },
  { label: "Hội Đồng Giám Mục Việt Nam", href: "https://hdgmvietnam.com" },
  { label: "Tổng Giáo Phận Hà Nội", href: "https://tonggiaophanhanoi.org" },
  { label: "Dòng Tên", href: "https://dongten.net" },
]

const recentPosts = [
  {
    id: 1,
    title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
    image: "/images/recent-1.jpg",
    slug: "thong-bao-khai-giang-lop-giao-ly-hon-nhan-du-tong-khoa-1-nam-2025",
  },
  {
    id: 2,
    title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
    image: "/images/recent-2.jpg",
    slug: "ca-doan-te-resa-giao-xu-ngoc-mach-moi-goi-chung-tay-phuc-vu-thien-chua",
  },
  {
    id: 3,
    title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
    image: "/images/recent-3.jpg",
    slug: "giao-xu-ngoc-mach-thanh-le-dat-vien-da-dau-tien",
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background  w-full">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">GX</span>
              </div>
              <div>
                <h3 className="font-bold text-background">Giáo xứ Ngọc Mạch</h3>
                <p className="text-xs text-background/70">Tổng Giáo phận Hà Nội</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-background/80">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Ngọc Mạch, Hà Nội, Việt Nam</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+84 xxx xxx xxx</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@giaoxungocmach.org</span>
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 hover:bg-secondary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background mb-4 border-b border-background/20 pb-2">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 8).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-bold text-background mb-4 border-b border-background/20 pb-2">
              Liên kết website
            </h4>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h4 className="font-bold text-background mb-4 border-b border-background/20 pb-2">
              Bài viết mới
            </h4>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={post.href || `/menu/tin-tuc/${post.slug || post.id}`}
                  className="flex gap-3 group"
                >
                  <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-background/10">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="flex-1 text-xs text-background/80 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h5>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-background/60">
            © {new Date().getFullYear()} Giáo xứ Ngọc Mạch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
