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

const newsItems = [
    {
        id: 1,
        title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
        date: "13/02/2025",
        excerpt: "Giáo xứ Ngọc Mạch xin thông báo về việc mở lớp giáo lý Hôn nhân – Dự tòng khóa 1 năm 2025 như sau: Thời gian Khai giảng vào ngày 20/02/2025 và học liên tục trong vòng 4,5 tháng Tuần học 3 buổi tối: thứ 3,5,7 vào lúc 7h45-9h15 tối tại nhà Mục Vụ Giáo xứ Ngọc Mạch...",
        image: "/images/news-1.jpg",
        category: "Thông báo",
        type: "card",
        cardContent: {
            title: "HÔN NHÂN & DỰ TÒNG",
            subtitle: "(KHÓA I NĂM 2025 TẠI GIÁO XỨ NGỌC MẠCH)",
            details: [
                "THỜI GIAN: Bắt đầu từ 20/02/2025 (Học liên tiếp trong vòng 4,5 tháng)",
                "LỊCH HỌC: Tuần học 3 buổi tối: thứ 3,5,7 vào lúc 7h45-9h15 tối tại nhà Mục Vụ Giáo xứ Ngọc Mạch"
            ]
        }
    },
    {
        id: 2,
        title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
        date: "14/10/2024",
        excerpt: "Kính thưa cộng đoàn, Trong ý cầu nguyện của Đức Giáo Hoàng dành cho tháng Mân Côi năm nay, mở đầu ngài đã phát biểu rằng: \"Tất cả các Kitô hữu chúng ta đều có trách nhiệm với sứ mạng...\"",
        image: "/images/news-2.jpg",
        category: "Sinh hoạt/ Hoạt động",
        type: "image"
    },
    {
        id: 3,
        title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
        date: "24/09/2024",
        excerpt: "Vào lúc 18h30, thứ Hai, ngày 23/9/2024, Giáo xứ Ngọc Mạch long trọng tổ chức Thánh lễ làm phép viên đá đầu tiên của công trình nhà thờ Giáo xứ. Thánh lễ do Đức cha Giu-se Vũ Văn Thiên – Tổng Giám mục Tổng Giáo phận (TGP) Hà Nội chủ sự.",
        image: "/images/news-3.jpg",
        category: "Sinh hoạt/ Hoạt động",
        type: "image"
    },
    {
        id: 4,
        title: "Thông báo: Thay đổi giờ Thánh Lễ tại Giáo xứ Ngọc Mạch",
        date: "26/08/2024",
        excerpt: "Giáo xứ Ngọc Mạch xin thông báo về việc thay đổi giờ Thánh Lễ, áp dụng từ ngày 1/9/2024. Kính mong quý giáo dân lưu ý và sắp xếp thời gian tham dự Thánh Lễ phù hợp.",
        image: "/images/news-4.jpg",
        category: "Thông báo",
        type: "banner",
        bannerContent: {
            title: "THÔNG BÁO THAY ĐỔI GIỜ LỄ",
            subtitle: "Áp dụng từ ngày 1/9/2024"
        }
    },
]

export default function NewsPage() {
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
                            <BreadcrumbPage>Tin tức</BreadcrumbPage>
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
                                Tin tức
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Layout: Content + Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* News List */}
                        <div className="space-y-8">
                            {newsItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/post/${item.id}`}
                                    className="block group"
                                >
                                    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50">
                                        <div className="grid md:grid-cols-2 gap-0">
                                            {/* Left Side - Image or Card */}
                                            <div className="relative">
                                                {item.type === "card" && item.cardContent ? (
                                                    <div className="h-full bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 md:p-8 border-r border-border/50 flex flex-col justify-center">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                                                                    {item.cardContent.title}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground font-medium">
                                                                    {item.cardContent.subtitle}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                {item.cardContent.details.map((detail, index) => (
                                                                    <p key={index} className="text-sm text-foreground/80 leading-relaxed">
                                                                        {detail}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : item.type === "banner" && item.bannerContent ? (
                                                    <div className="h-full bg-gradient-to-br from-foreground to-foreground/90 p-6 md:p-8 border-r border-border/50 flex flex-col justify-center">
                                                        <div className="text-center">
                                                            <h3 className="text-xl md:text-2xl font-bold text-background mb-2 uppercase">
                                                                {item.bannerContent.title}
                                                            </h3>
                                                            <p className="text-lg text-background/90 font-semibold">
                                                                {item.bannerContent.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-muted">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                )}
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
                        <RecentPostsSidebar posts={newsItems.slice(0, 4).map(item => ({
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

