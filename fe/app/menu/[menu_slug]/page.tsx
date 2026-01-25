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

export default async function MenuPage({ params }: {
    params: { menu_slug: string },
}) {
    const { menu_slug:slug } = await params
    
    // Lấy menu theo slug từ API
    const menusData = await menuService().getMenus();
    const menu = menusData.data?.find((m: any) => m.slug === slug);
    
    // Nếu không tìm thấy menu và slug là "tin-tuc", hiển thị tất cả bài viết
    const isNewsPage = !menu && slug === 'tin-tuc';
    
    // Nếu không tìm thấy menu và không phải trang tin-tuc, trả về trang không tồn tại
    if (!menu && !isNewsPage) {
        return (
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Trang không tồn tại</h1>
                </div>
            </section>
        );
    }

    let allPosts: any[] = [];
    let categoryGroups: any[] = [];
    let pageTitle = menu?.name || "Tin tức";
    
    if (isNewsPage) {
        // Trang tin-tuc: Lấy tất cả bài viết và group theo category
        const postsData = await postService().getPosts();
        const posts = postsData.data || [];
        
        // Group posts theo category
        const postsByCategory = posts.reduce((acc: any, post: any) => {
            const categoryName = post.menu_item?.name || "Chưa phân loại";
            const categorySlug = post.menu_item?.slug || "";
            
            if (!acc[categoryName]) {
                acc[categoryName] = {
                    name: categoryName,
                    slug: categorySlug,
                    posts: []
                };
            }
            
            const postDate = post.postingDate 
                ? new Date(post.postingDate).toLocaleDateString('vi-VN')
                : new Date(post.createdAt).toLocaleDateString('vi-VN');
            
            // Tạo excerpt từ content (loại bỏ HTML tags)
            const excerpt = post.content 
                ? post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                : '';

            // Lấy URL của backgroundImage - xử lý nhiều cấu trúc dữ liệu khác nhau
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

            acc[categoryName].posts.push({
                id: post.id,
                title: post.title,
                date: postDate,
                excerpt: excerpt,
                backgroundImage: backgroundImageUrl || "/images/news-1.jpg",
                category: categoryName,
                slug: post.slug,
            });
            
            return acc;
        }, {});

        // Convert object thành array và sort
        categoryGroups = Object.values(postsByCategory).sort((a: any, b: any) => 
            a.name.localeCompare(b.name, 'vi')
        );
        
        allPosts = posts;
    } else {
        // Trang menu thông thường: Lấy bài viết từ các category của menu
        const categories = (menu.category || []).filter((cat: any) => cat.isActive === true);
        
        // Khởi tạo categoryGroups với tất cả categories (kể cả không có posts)
        const postsByCategory: any = {};
        categories.forEach((category: any) => {
            postsByCategory[category.name] = {
                name: category.name,
                slug: category.slug,
                posts: []
            };
        });
        
        // Lấy tất cả bài viết của các category trong menu này
        for (const category of categories) {
            const postsData = await postService().getPosts(undefined, category.slug);
            if (postsData.data && postsData.data.length > 0) {
                allPosts.push(...postsData.data.map((post: any) => ({
                    ...post,
                    categoryName: category.name,
                    categorySlug: category.slug
                })));
                
                // Thêm posts vào category tương ứng
                postsData.data.forEach((post: any) => {
                    const postDate = post.postingDate 
                        ? new Date(post.postingDate).toLocaleDateString('vi-VN')
                        : new Date(post.createdAt).toLocaleDateString('vi-VN');
                    
                    const excerpt = post.content 
                        ? post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                        : '';

                    // Lấy URL của backgroundImage - xử lý nhiều cấu trúc dữ liệu khác nhau
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

                    postsByCategory[category.name].posts.push({
                        id: post.id,
                        title: post.title,
                        date: postDate,
                        excerpt: excerpt,
                        backgroundImage: backgroundImageUrl || "/images/news-1.jpg",
                        category: category.name,
                        slug: post.slug,
                    });
                });
            }
        }

        // Convert object thành array và sort
        categoryGroups = Object.values(postsByCategory).sort((a: any, b: any) => 
            a.name.localeCompare(b.name, 'vi')
        );
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
        const menuSlug = p.menu_item?.menu?.slug || slug;
        const categorySlug = p.menu_item?.slug || '';
        
        return {
            id: p.slug,
            title: p.title,
            backgroundImage: backgroundImageUrl || "/images/news-1.jpg",
            slug: p.slug,
            href: categorySlug ? `/menu/${menuSlug}/${categorySlug}/${p.slug}` : `/menu/${menuSlug}/${p.slug}`
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
                            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
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
                                {pageTitle}
                            </h1>
                            {allPosts.length > 0 && (
                                <p className="text-muted-foreground">
                                    Có {allPosts.length} bài viết trong {categoryGroups.length} danh mục
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Layout: Content + Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* News List - Group theo category */}
                        {categoryGroups.length === 0 ? (
                            <div className="bg-card rounded-xl shadow-lg border border-border/50 p-10 text-center">
                                <p className="text-muted-foreground text-lg">Chưa có thông tin gì.</p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {categoryGroups.map((category: any) => (
                                    <div key={category.name} className="space-y-6">
                                        {/* Category Header */}
                                        <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                            <h2 className="text-2xl font-bold text-foreground">
                                                {category.name}
                                            </h2>
                                            {category.slug && (
                                                <Link 
                                                    href={`/menu/${menu.slug}/${category.slug}`}
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    Xem tất cả →
                                                </Link>
                                            )}
                                        </div>
                                        
                                        {/* Posts in this category */}
                                        <div className="space-y-6">
                                            {category.posts.map((item: any) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/menu/${menu.slug}/${category.slug}/${item.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50">
                                                        <div className="grid md:grid-cols-2 gap-0">
                                                            {/* Left Side - Image */}
                                                            <div className="relative">
                                                                <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-muted group">
                                                                    <div 
                                                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                                                        style={{
                                                                            backgroundImage: `url(${item.backgroundImage || "/images/news-1.jpg"})`
                                                                        }}
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                                </div>
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
                                ))}
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

