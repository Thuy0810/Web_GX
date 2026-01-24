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

const documentItems = [
    {
        id: 1,
        title: "Hình ảnh Thánh lễ đặt viên đá đầu tiên",
        date: "24/09/2024",
        excerpt: "Tuyển tập hình ảnh đẹp từ Thánh lễ đặt viên đá đầu tiên của công trình nhà thờ Giáo xứ Ngọc Mạch...",
        image: "/images/news-3.jpg",
        category: "Hình ảnh",
    },
    {
        id: 2,
        title: "Video Highlight các hoạt động Giáo xứ năm 2024",
        date: "20/09/2024",
        excerpt: "Video tổng hợp các hoạt động nổi bật của Giáo xứ Ngọc Mạch trong năm 2024, bao gồm các Thánh lễ, sinh hoạt và sự kiện quan trọng...",
        image: "/images/news-2.jpg",
        category: "Video",
    },
    {
        id: 3,
        title: "Các biểu mẫu hành chính Giáo xứ",
        date: "15/09/2024",
        excerpt: "Tổng hợp các biểu mẫu hành chính thường dùng trong Giáo xứ Ngọc Mạch, bao gồm đơn xin, giấy chứng nhận và các văn bản khác...",
        image: "/images/news-1.jpg",
        category: "Biểu mẫu",
    },
    {
        id: 4,
        title: "Album ảnh Ca Đoàn Têrêsa",
        date: "10/09/2024",
        excerpt: "Album ảnh các hoạt động và sinh hoạt của Ca Đoàn Têrêsa Giáo xứ Ngọc Mạch trong năm 2024...",
        image: "/images/news-4.jpg",
        category: "Hình ảnh",
    },
]

export default function TuLieuPage() {
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
                            <BreadcrumbPage>Tư liệu</BreadcrumbPage>
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
                                Tư liệu
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
                            {documentItems.map((item) => (
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
                        <RecentPostsSidebar posts={documentItems.slice(0, 4).map(item => ({
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

