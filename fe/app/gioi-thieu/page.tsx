import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { MassSchedule } from "@/components/mass-schedule"
import { VideoSection } from "@/components/video-section"
import { FacebookWidget } from "@/components/facebook-widget"
import { MapSection } from "@/components/map-section"
import { RecentPostsSidebar } from "@/components/recent-posts-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const introItems = [
    {
        id: 1,
        title: "Giới thiệu về Giáo xứ Ngọc Mạch",
        date: "01/01/2024",
        excerpt: "Giáo xứ Ngọc Mạch là một giáo xứ thuộc Tổng Giáo phận Hà Nội, được thành lập với sứ mệnh loan báo Tin Mừng và phục vụ cộng đồng dân Chúa tại địa phương...",
        image: "/images/news-1.jpg",
        category: "Giáo Xứ",
    },
    {
        id: 2,
        title: "Các Giáo Họ trong Giáo xứ",
        date: "01/01/2024",
        excerpt: "Giáo xứ Ngọc Mạch bao gồm nhiều giáo họ, mỗi giáo họ có những đặc điểm và hoạt động riêng, cùng nhau xây dựng cộng đoàn giáo xứ...",
        image: "/images/news-2.jpg",
        category: "Các Giáo Họ",
    },
    {
        id: 3,
        title: "Lịch sử hình thành Giáo xứ",
        date: "01/01/2024",
        excerpt: "Tìm hiểu về lịch sử hình thành và phát triển của Giáo xứ Ngọc Mạch qua các giai đoạn từ khi thành lập đến nay...",
        image: "/images/news-3.jpg",
        category: "Giáo Xứ",
    },
]

export default function GioiThieuPage() {
    return (
        <section className="py-12 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="hover:text-primary transition-colors">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Giới Thiệu</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="mb-10">
                    <div className="bg-card rounded-xl shadow-lg border border-border/50 p-6 md:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative z-10">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                                Giới Thiệu
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Layout: Content + Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Items List */}
                        <div className="space-y-8">
                            {introItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/post/${item.id}`}
                                    className="block group"
                                >
                                    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50">
                                        <div className="grid md:grid-cols-2 gap-0">
                                            {/* Left Side - Image */}
                                            <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-muted">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            {/* Right Side - Content */}
                                            <div className="p-6 md:p-8 flex flex-col justify-center">
                                                <div className="mb-3">
                                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
                                                    {item.title}
                                                </h2>
                                                {item.excerpt && (
                                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CalendarDays className="size-4 text-primary" />
                                                    <span className="font-medium">{item.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-6 lg:self-start">
                        {/* Lịch lễ tại giáo xứ */}
                        <MassSchedule />

                        {/* Video/Hình ảnh */}
                        <VideoSection />

                        {/* Theo dõi Facebook */}
                        <FacebookWidget />

                        {/* Bản đồ */}
                        <MapSection />

                        {/* Bài viết mới */}
                        <RecentPostsSidebar posts={introItems.slice(0, 4).map(item => ({
                            id: item.id,
                            title: item.title,
                            image: item.image
                        }))} />
                    </aside>
                </div>
            </div>
        </section>
    )
}

