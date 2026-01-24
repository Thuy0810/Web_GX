import Image from "next/image"
import Link from "next/link"
import { RelatedPostsSection } from "@/components/related-posts-section"
import { ShareButtons } from "@/components/share-buttons"
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

// Dữ liệu mẫu cho tin cùng chuyên mục
const relatedPosts = [
    {
        id: 1,
        title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
        date: "13/02/2025",
        excerpt: "Giáo xứ Ngọc Mạch xin thông báo về việc mở lớp giáo lý Hôn nhân – Dự tòng khóa 1 năm 2025 như sau: Thời gian Khai giảng vào ngày 20/02/2025...",
        image: "/images/news-1.jpg",
    },
    {
        id: 2,
        title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
        date: "14/10/2024",
        excerpt: "Kính thưa cộng đoàn, Trong ý cầu nguyện của Đức Giáo Hoàng dành cho tháng Mân Côi năm nay...",
        image: "/images/news-2.jpg",
    },
    {
        id: 3,
        title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
        date: "24/09/2024",
        excerpt: "Vào lúc 18h30, thứ Hai, ngày 23/9/2024, Giáo xứ Ngọc Mạch long trọng tổ chức Thánh lễ làm phép viên đá...",
        image: "/images/news-3.jpg",
    },
]

// Dữ liệu mẫu cho bài viết mới
const recentPosts = [
    {
        id: 1,
        title: "THÔNG BÁO: Khai giảng Lớp Giáo lý Hôn nhân Dự tòng – Khóa 1 năm 2025",
        image: "/images/news-1.jpg",
    },
    {
        id: 2,
        title: "CA ĐOÀN TÊ-RÊ-SA GIÁO XỨ NGỌC MẠCH - Mời gọi Chung tay phục vụ Thiên Chúa",
        image: "/images/news-2.jpg",
    },
    {
        id: 3,
        title: "Giáo xứ Ngọc Mạch: Thánh lễ đặt viên đá đầu tiên",
        image: "/images/news-3.jpg",
    },
    {
        id: 4,
        title: "Thông báo: Thay đổi giờ Thánh Lễ tại Giáo xứ Ngọc Mạch",
        image: "/images/news-4.jpg",
    },
]

export default async function PostDetail({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    const { slug } = await params
    const postDate = "24/10/2024"
    const category = "Sinh hoạt/ Hoạt động"
    const tags = ["Thánh lễ", "Giáo xứ", "Xây dựng"]

    return (
        <>
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
                                <BreadcrumbLink href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{category}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Header - Full Width */}
                    <div className="mb-10">
                        <div className="bg-card rounded-xl shadow-lg border border-border/50 p-6 md:p-8 relative overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                            
                            <div className="relative z-10">
                                {/* Category Badge with Accent Line */}
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-1 w-12 bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full"></div>
                                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary text-sm font-semibold rounded-full border border-primary/30 shadow-sm backdrop-blur-sm">
                                        {category}
                                    </span>
                                </div>

                                {/* Title with Two-line Design */}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                                    <span className="block mb-2 text-primary text-xl md:text-2xl lg:text-3xl font-bold">
                                        Giáo xứ Ngọc Mạch:
                                    </span>
                                    <span className="block uppercase text-foreground">
                                        THÁNH LỄ ĐẶT VIÊN ĐÁ ĐẦU TIÊN
                                        
                                    </span>
                                </h1>

                                {/* Meta Information - Enhanced */}
                                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/30">
                                    <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="p-1.5 rounded-lg bg-primary/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-primary">
                                                <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-foreground text-sm">{postDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="p-1.5 rounded-lg bg-primary/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-primary">
                                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-foreground text-sm">Ban Truyền thông</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout: Content + Sidebar */}
                    <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Main Content Card */}
                            <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 mb-10 border border-border/50">
                                {/* Featured Image */}
                                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-10 group">
                                    <Image
                                        src="/images/news-3.jpg"
                                        alt="Thánh lễ đặt viên đá đầu tiên tại Giáo xứ Ngọc Mạch"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                            {/* Article Content */}
                            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6">
                                <p className="text-base md:text-lg leading-relaxed mb-8 text-foreground/90 font-medium">
                                    Vào lúc 18h30, thứ Hai, ngày 23/9/2024, Giáo xứ Ngọc Mạch long trọng tổ chức Thánh lễ làm phép viên đá đầu tiên của công trình nhà thờ Giáo xứ. Thánh lễ do Đức cha Giu-se Vũ Văn Thiên – Tổng Giám mục Tổng Giáo phận (TGP) Hà Nội chủ sự.
                                </p>

                                <p className="leading-relaxed mb-8">
                                    Thánh lễ được cử hành trong không khí trang nghiêm và đầy xúc động với sự tham dự đông đảo của các linh mục, tu sĩ và giáo dân trong giáo xứ. Công trình nhà thờ mới là một dấu mốc quan trọng trong lịch sử phát triển của Giáo xứ Ngọc Mạch, thể hiện sự phát triển và lớn mạnh của cộng đoàn giáo dân nơi đây.
                                </p>

                                {/* Inline Image */}
                                <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-xl overflow-hidden bg-muted my-10 shadow-lg group">
                                    <Image
                                        src="/images/news-3.jpg"
                                        alt="Cộng đoàn giáo dân tham dự Thánh lễ"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <p className="leading-relaxed mb-8">
                                    Trong bài giảng, Đức cha đã nhấn mạnh ý nghĩa thiêng liêng của việc xây dựng nhà thờ - nơi quy tụ cộng đoàn để thờ phượng Thiên Chúa và cử hành các bí tích. Ngài cũng kêu gọi mọi người cùng chung tay đóng góp để công trình được hoàn thành sớm nhất, phục vụ tốt nhất cho đời sống đức tin của cộng đoàn.
                                </p>

                                {/* Inline Image */}
                                <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-xl overflow-hidden bg-muted my-10 shadow-lg group">
                                    <Image
                                        src="/images/news-3.jpg"
                                        alt="Nghi thức làm phép viên đá đầu tiên"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <p className="leading-relaxed mb-8">
                                    Sau phần cử hành Thánh lễ, Đức cha cùng các linh mục và đại diện giáo xứ đã tiến hành nghi thức làm phép viên đá đầu tiên. Nghi thức này mang ý nghĩa đánh dấu sự khởi đầu của một công trình thiêng liêng, nơi sẽ là trung tâm sinh hoạt tôn giáo của giáo xứ trong nhiều năm tới.
                                </p>

                                <p className="leading-relaxed mb-0">
                                    Buổi lễ kết thúc trong niềm vui và hy vọng của toàn thể cộng đoàn. Giáo xứ Ngọc Mạch sẽ tiếp tục nỗ lực để hoàn thành công trình nhà thờ mới, tạo điều kiện tốt nhất cho việc phục vụ và phát triển đời sống đức tin của giáo dân.
                                </p>
                            </div>

                            {/* Tags and Share Section */}
                            <div className="mt-10 pt-8 border-t-2 border-border/50">
                                {/* Tags */}
                                <div className="mb-8">
                                    <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-primary rounded-full"></span>
                                        Thẻ tag
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {tags.map((tag, index) => (
                                            <Link
                                                key={index}
                                                href={`/tag/${tag.toLowerCase()}`}
                                                className="px-4 py-2 bg-gradient-to-r from-muted to-muted/80 hover:from-primary/10 hover:to-primary/5 text-muted-foreground hover:text-primary text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-md"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Share Buttons */}
                                <ShareButtons />
                            </div>
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
                            <RecentPostsSidebar posts={recentPosts} />
                        </aside>
                    </div>
                </div>
            </section>

            {/* Tin cùng chuyên mục */}
            <RelatedPostsSection posts={relatedPosts} />
        </>
    )
}