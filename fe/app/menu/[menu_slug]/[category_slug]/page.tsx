import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { baseUrl } from "@/services"
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
import menuService from "@/services/menu.services"
import postService from "@/services/post.services"

export default async function CategoryPage({ params }: {
    params: { category_slug: string }, 
}) {
    const { category_slug:slug } = await params
    
    // Lấy category theo slug
    const categoriesData = await menuService().getCategories();
    const category = categoriesData.data?.find((cat: any) => cat.slug === slug);
    
    if (!category) {
        return (
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Danh mục không tồn tại</h1>
                </div>
            </section>
        );
    }

    // Lấy bài viết theo category
    const postsData = await postService().getPosts(undefined, slug);
    const posts = postsData.data || [];

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
        const menuSlug = p.menu_item?.menu?.slug || category.menu.slug;
        const categorySlug = p.menu_item?.slug || category.slug;
        
        return {
            id: p.slug,
            title: p.title,
            backgroundImage: backgroundImageUrl || "/images/news-1.jpg",
            slug: p.slug,
            href: `/menu/${menuSlug}/${categorySlug}/${p.slug}`
        };
    }) || [];

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
                            <BreadcrumbPage>{category.name}</BreadcrumbPage>
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
                                {category.name}
                            </h1>
                            {posts.length > 0 && (
                                <p className="text-muted-foreground">
                                    Có {posts.length} bài viết trong danh mục này
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Layout: Content + Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {posts.length === 0 ? (
                            <div className="bg-card rounded-xl shadow-lg border border-border/50 p-10 text-center">
                                <p className="text-muted-foreground text-lg">Chưa có thông tin nào.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {posts.map((post: any) => {
                                    const postDate = post.postingDate 
                                        ? new Date(post.postingDate).toLocaleDateString('vi-VN')
                                        : new Date(post.createdAt).toLocaleDateString('vi-VN');
                                    
                                    // Lấy URL của backgroundImage
                                    let backgroundImageUrl = null;
                                    
                                    if (post.backgroundImage) {
                                        if (post.backgroundImage.url) {
                                            backgroundImageUrl = post.backgroundImage.url;
                                        } else if (post.backgroundImage.data?.attributes?.url) {
                                            backgroundImageUrl = post.backgroundImage.data.attributes.url;
                                        } else if (post.backgroundImage.data?.url) {
                                            backgroundImageUrl = post.backgroundImage.data.url;
                                        }
                                    }
                                    
                                    // Nếu URL là relative path, thêm baseUrl
                                    if (backgroundImageUrl && !backgroundImageUrl.startsWith('http') && !backgroundImageUrl.startsWith('//')) {
                                        if (!backgroundImageUrl.startsWith('/')) {
                                            backgroundImageUrl = `/${backgroundImageUrl}`;
                                        }
                                        backgroundImageUrl = `${baseUrl}${backgroundImageUrl}`;
                                    }
                                    
                                    return (
                                        <Link
                                            key={post.id}
                                            href={`/menu/${category.menu.slug}/${category.slug}/${post.slug}`}
                                            className="block group"
                                        >
                                            <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50">
                                                <div className="grid md:grid-cols-2 gap-0">
                                                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-muted group">
                                                        <div 
                                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                                            style={{
                                                                backgroundImage: `url(${backgroundImageUrl || "/images/news-1.jpg"})`
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                    <div className="p-6 md:p-8 flex flex-col justify-center">
                                                        <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
                                                            {post.title}
                                                        </h2>
                                                        {post.content && (
                                                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                                                                {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                                            </p>
                                                        )}
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <CalendarDays className="size-4 text-primary" />
                                                            <span className="font-medium">{postDate}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
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

