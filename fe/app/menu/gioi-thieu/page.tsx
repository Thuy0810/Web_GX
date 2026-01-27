import introduceService from "@/services/introduce.services"
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
import postService from "@/services/post.services"
import { baseUrl } from "@/services"

export default async function IntroducePage() {
    // Fetch dữ liệu giới thiệu từ API
    let introduceData: any = null
    let hasError = false
    
    try {
        const response = await introduceService().getIntroduce()
        introduceData = response.data || null
    } catch (error: any) {
        console.error("Error fetching introduce:", error)
        hasError = true
    }

    // Lấy bài viết mới nhất cho sidebar
    const recentPostsData = await postService().getPosts();
    const recentPosts = recentPostsData.data?.slice(0, 4).map((p: any) => {
        // Lấy URL của backgroundImage
        let backgroundImageUrl = null;
        
        if (p.backgroundImage) {
            if (p.backgroundImage.url) {
                backgroundImageUrl = p.backgroundImage.url;
            } else if (p.backgroundImage.data?.attributes?.url) {
                backgroundImageUrl = p.backgroundImage.data.attributes.url;
            } else if (p.backgroundImage.data?.url) {
                backgroundImageUrl = p.backgroundImage.data.url;
            }
        }
        
        // Nếu URL là relative path, thêm baseUrl
        if (backgroundImageUrl && !backgroundImageUrl.startsWith('http') && !backgroundImageUrl.startsWith('//')) {
            if (!backgroundImageUrl.startsWith('/')) {
                backgroundImageUrl = `/${backgroundImageUrl}`;
            }
            backgroundImageUrl = `${baseUrl}${backgroundImageUrl}`;
        }
        
        // Lấy menu và category slug để tạo đường dẫn
        const menuSlug = p.menu_item?.menu?.slug || 'tin-tuc';
        const categorySlug = p.menu_item?.slug || '';
        
        return {
            id: p.slug,
            title: p.title,
            backgroundImage: backgroundImageUrl || "/images/news-1.jpg",
            slug: p.slug,
            href: categorySlug ? `/menu/${menuSlug}/${categorySlug}/${p.slug}` : `/menu/${menuSlug}/${p.slug}`
        };
    }) || [];

    const title = introduceData?.title || "Giới thiệu Giáo xứ"
    let content = introduceData?.content || ""

    // Hàm để convert markdown sang HTML và xử lý URL
    const processContent = (html: string): string => {
        if (!html) return html
        
        let processed = html
        
        // QUAN TRỌNG: Xử lý images TRƯỚC các markdown khác để tránh conflict
        // Convert markdown image syntax ![alt](url) thành HTML <img> tag
        processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
            // Xử lý URL - nếu là localhost, thay bằng baseUrl từ env
            let imageUrl = url.trim()
            
            // Nếu URL chứa localhost:1337, thay bằng baseUrl
            if (imageUrl.includes('localhost:1337')) {
                imageUrl = imageUrl.replace(/https?:\/\/localhost:1337/g, baseUrl || 'http://localhost:1337')
            }
            
            // Nếu URL là relative path và chưa có baseUrl, thêm baseUrl
            if (!imageUrl.startsWith('http') && !imageUrl.startsWith('//') && !imageUrl.startsWith('data:')) {
                imageUrl = imageUrl.startsWith('/') 
                    ? `${baseUrl}${imageUrl}` 
                    : `${baseUrl}/${imageUrl}`
            }
            
            return `<img src="${imageUrl}" alt="${alt || ''}" class="mx-auto block rounded-lg max-w-full h-auto" />`
        })
        
        // Xử lý các thẻ <img> có sẵn trong HTML (nếu có)
        processed = processed.replace(/<img([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi, (match, before, src, after) => {
            // Nếu src chứa localhost:1337, thay bằng baseUrl
            if (src.includes('localhost:1337')) {
                const newSrc = src.replace(/https?:\/\/localhost:1337/g, baseUrl || 'http://localhost:1337')
                return `<img${before}src="${newSrc}"${after}>`
            }
            
            // Nếu là relative path, thêm baseUrl
            if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
                const newSrc = src.startsWith('/') 
                    ? `${baseUrl}${src}` 
                    : `${baseUrl}/${src}`
                return `<img${before}src="${newSrc}"${after}>`
            }
            
            return match
        })
        
        // Sau đó mới xử lý các markdown formatting khác
        // Convert markdown bold **text** hoặc __text__ thành <strong>text</strong>
        processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        processed = processed.replace(/__([^_]+)__/g, '<strong>$1</strong>')
        
        // Convert markdown italic *text* hoặc _text_ thành <em>text</em>
        // Chỉ convert single asterisk/underscore (không phải double)
        processed = processed.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
        processed = processed.replace(/(?<!_)_([^_\n]+)_(?!_)/g, '<em>$1</em>')
        
        // Convert markdown headings # Heading thành <h1>Heading</h1>
        processed = processed.replace(/^### (.*$)/gim, '<h3>$1</h3>')
        processed = processed.replace(/^## (.*$)/gim, '<h2>$1</h2>')
        processed = processed.replace(/^# (.*$)/gim, '<h1>$1</h1>')
        
        // Convert markdown links [text](url) thành <a href="url">text</a>
        // Tránh convert image links (đã có ! ở đầu và đã được xử lý)
        processed = processed.replace(/(?!!)\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        
        // Convert line breaks (double newline) thành paragraph breaks
        // Wrap toàn bộ content trong <p> tags nếu chưa có
        if (!processed.trim().startsWith('<')) {
            processed = '<p>' + processed.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') + '</p>'
        }
        
        return processed
    }

    // Xử lý content
    content = processContent(content)

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
                            <BreadcrumbPage>{title}</BreadcrumbPage>
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
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Layout: Content + Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 border border-border/50">
                            {hasError ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground text-lg">Không thể tải nội dung giới thiệu. Vui lòng kiểm tra cấu hình API.</p>
                                </div>
                            ) : content ? (
                                <div 
                                    className="prose prose-sans prose-sm md:prose-base lg:prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6 prose-img:mx-auto prose-img:block prose-img:rounded-lg"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            ) : (
                                <div className="prose prose-sans prose-sm md:prose-base lg:prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6">
                                    <p className="mb-6">
                                        <strong className="text-foreground">Giáo xứ Ngọc Mạch</strong> là một giáo xứ thuộc Tổng Giáo phận Hà Nội, 
                                        được thành lập với sứ mệnh loan báo Tin Mừng và phục vụ cộng đồng dân Chúa tại địa phương.
                                    </p>
                                    <p className="mb-6">
                                        Giáo xứ hiện có nhiều đoàn thể hoạt động sôi nổi như: Ca Đoàn Magis, Ca Đoàn Têrêsa, 
                                        Ca Đoàn Thánh Gia, Hội Anna, Hội Caritas, Hội Đồng Mục Vụ, Hội Gia Trưởng, 
                                        Hội Hiền Mẫu, Hội Legio, và Thiếu Nhi.
                                    </p>
                                    <p>
                                        Bên cạnh các hoạt động phụng vụ, Giáo xứ còn tổ chức nhiều chương trình đào tạo 
                                        như: Lớp Giáo lý Hôn nhân & Dự tòng, Giáo lý Thiếu Nhi, Lớp Tiếng Anh, 
                                        và các buổi cầu nguyện với Lời Chúa.
                                    </p>
                                </div>
                            )}
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
                        <RecentPostsSidebar posts={recentPosts.map((p: any) => ({
                            id: p.slug,
                            title: p.title,
                            image: p.backgroundImage || "/images/news-1.jpg",
                            href: p.href
                        }))} />
                    </aside>
                </div>
            </div>
        </section>
    )
}

