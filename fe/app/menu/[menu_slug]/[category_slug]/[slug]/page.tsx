import Link from "next/link"
import { baseUrl } from "@/services"
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
import postService from "@/services/post.services"

export default async function PostDetail({ params, searchParams }: {
    params: { menu_slug: string, category_slug: string, slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    const { menu_slug, category_slug, slug } = await params
    const postData = await postService().getPostBySlug(slug);
    
    if (!postData.data || postData.data.length === 0) {
        return (
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Bài viết không tồn tại</h1>
                </div>
            </section>
        );
    }

    const post = postData.data[0];
    const category = post.menu_item?.name || "Chưa phân loại";
    const categorySlug = post.menu_item?.slug || "";
    const postDate = post.postingDate 
        ? new Date(post.postingDate).toLocaleDateString('vi-VN')
        : new Date(post.createdAt).toLocaleDateString('vi-VN');
    
    // Lấy các bài viết cùng category
    const relatedPostsData = await postService().getPosts(undefined, categorySlug);
    const relatedPosts = relatedPostsData.data?.filter((p: any) => p.slug !== slug).slice(0, 3) || [];
    
    // Lấy bài viết mới nhất
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
        const menuSlug = p.menu_item?.menu?.slug || menu_slug;
        const categorySlug = p.menu_item?.slug || category_slug;
        
        return {
            id: p.slug,
            title: p.title,
            backgroundImage: backgroundImageUrl || "/images/news-1.jpg",
            slug: p.slug,
            href: `/menu/${menuSlug}/${categorySlug}/${p.slug}`
        };
    }) || [];

    return (
        <>
            <section className="py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-4 sm:mb-6 lg:mb-8">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="hover:text-primary transition-colors">Trang chủ</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            {categorySlug && (
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/menu/${menu_slug}/${category_slug}`} className="hover:text-primary transition-colors">{category}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                            <BreadcrumbItem>
                                <BreadcrumbPage>{post.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
  
                      {/* Header - Full Width */}
                      <div className="mb-6 sm:mb-8 lg:mb-10">
                          <div className="bg-card rounded-xl shadow-lg border border-border/50 p-4 sm:p-6 md:p-8 relative overflow-hidden">
                              {/* Decorative Background Elements */}
                              <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                              <div className="absolute bottom-0 left-0 w-24 sm:w-40 h-24 sm:h-40 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                              
                              <div className="relative z-10">
                                  {/* Category Badge with Accent Line */}
                                  <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                      <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full"></div>
                                      <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary text-xs sm:text-sm font-semibold rounded-full border border-primary/30 shadow-sm backdrop-blur-sm">
                                          {category}
                                      </span>
                                  </div>
  
                                  {/* Title with Two-line Design */}
                                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                                      <span className="block text-foreground">
                                          {post.title}
                                      </span>
                                  </h1>

                                  {/* Meta Information - Enhanced */}
                                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-border/30">
                                      <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto">
                                          <div className="p-1 sm:p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 sm:size-4 text-primary">
                                                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                                              </svg>
                                          </div>
                                          <span className="font-semibold text-foreground text-xs sm:text-sm">{postDate}</span>
                                      </div>
                                      <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto">
                                          <div className="p-1 sm:p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 sm:size-4 text-primary">
                                                  <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                              </svg>
                                          </div>
                                          <span className="font-semibold text-foreground text-xs sm:text-sm">Ban Truyền thông</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
  
                      {/* Main Layout: Content + Sidebar */}
                      <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                          {/* Main Content */}
                          <div className="lg:col-span-3">
                              {/* Main Content Card */}
                              <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 lg:mb-10 border border-border/50">
                                  {/* Featured Image - Optional */}
                                  {(() => {
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
                                      
                                      if (backgroundImageUrl && !backgroundImageUrl.startsWith('http') && !backgroundImageUrl.startsWith('//')) {
                                          if (!backgroundImageUrl.startsWith('/')) {
                                              backgroundImageUrl = `/${backgroundImageUrl}`;
                                          }
                                          backgroundImageUrl = `${baseUrl}${backgroundImageUrl}`;
                                      }
                                      
                                      return backgroundImageUrl ? (
                                          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-6 sm:mb-8 lg:mb-10 group">
                                              <div 
                                                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                                  style={{
                                                      backgroundImage: `url(${backgroundImageUrl})`
                                                  }}
                                              />
                                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                          </div>
                                      ) : null;
                                  })()}

                              {/* Article Content */}
                              <div 
                                  className="prose prose-sans prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4 md:prose-p:mb-6 prose-p:text-sm sm:prose-p:text-base prose-img:mx-auto prose-img:block prose-img:rounded-lg prose-img:max-w-full prose-img:my-4 sm:prose-img:my-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-h1:text-xl sm:prose-h1:text-2xl md:prose-h1:text-3xl prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-base sm:prose-h3:text-lg md:prose-h3:text-xl prose-ul:my-3 sm:prose-ul:my-4 prose-ol:my-3 sm:prose-ol:my-4 prose-li:my-1 sm:prose-li:my-2 prose-blockquote:my-3 sm:prose-blockquote:my-4 prose-blockquote:pl-3 sm:prose-blockquote:pl-4 prose-blockquote:border-l-2 prose-table:text-xs sm:prose-table:text-sm"
                                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                              />
  
                              {/* Tags and Share Section */}
                              <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 border-t-2 border-border/50">
                                  {/* Category */}
                                  {category && (
                                      <div className="mb-6 sm:mb-8">
                                          <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                                              <span className="w-1 h-4 sm:h-5 bg-primary rounded-full"></span>
                                              Danh mục
                                          </h3>
                                          <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                              {categorySlug && (
                                                  <Link
                                                      href={`/menu/${menu_slug}/${category_slug}`}
                                                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-muted to-muted/80 hover:from-primary/10 hover:to-primary/5 text-muted-foreground hover:text-primary text-xs sm:text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-md"
                                                  >
                                                      {category}
                                                  </Link>
                                              )}
                                          </div>
                                      </div>
                                  )}

                                  {/* Share Buttons */}
                                  <ShareButtons />
                              </div>
                          </div>
                          
                          {/* Related Posts */}
                          {relatedPosts.length > 0 && (
                              <div className="mt-6 sm:mt-8 lg:mt-10">
                                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Bài viết cùng chuyên mục</h2>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                                      {relatedPosts.map((relatedPost: any) => {
                                          // Lấy URL của backgroundImage
                                          let backgroundImageUrl = null;
                                          
                                          if (relatedPost.backgroundImage) {
                                              if (relatedPost.backgroundImage.url) {
                                                  backgroundImageUrl = relatedPost.backgroundImage.url;
                                              } else if (relatedPost.backgroundImage.data?.attributes?.url) {
                                                  backgroundImageUrl = relatedPost.backgroundImage.data.attributes.url;
                                              } else if (relatedPost.backgroundImage.data?.url) {
                                                  backgroundImageUrl = relatedPost.backgroundImage.data.url;
                                              }
                                          }
                                          
                                          if (backgroundImageUrl && !backgroundImageUrl.startsWith('http') && !backgroundImageUrl.startsWith('//')) {
                                              if (!backgroundImageUrl.startsWith('/')) {
                                                  backgroundImageUrl = `/${backgroundImageUrl}`;
                                              }
                                              backgroundImageUrl = `${baseUrl}${backgroundImageUrl}`;
                                          }
                                          
                                          // Lấy category slug từ relatedPost hoặc dùng category_slug từ params
                                          const relatedCategorySlug = relatedPost.menu_item?.slug || category_slug;
                                          
                                          return (
                                              <Link
                                                  key={relatedPost.id}
                                                  href={`/menu/${menu_slug}/${relatedCategorySlug}/${relatedPost.slug}`}
                                                  className="block group h-full"
                                              >
                                                  <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50 h-full flex flex-col">
                                                      <div className="relative aspect-[4/3] overflow-hidden bg-muted group flex-shrink-0">
                                                          <div 
                                                              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                                              style={{
                                                                  backgroundImage: `url(${backgroundImageUrl || "/images/news-1.jpg"})`
                                                              }}
                                                          />
                                                      </div>
                                                      <div className="p-3 sm:p-4 flex-1 flex flex-col">
                                                          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
                                                              {relatedPost.title}
                                                          </h3>
                                                      </div>
                                                  </div>
                                              </Link>
                                          );
                                      })}
                                  </div>
                              </div>
                          )}
                          </div>
  
                          {/* Right Sidebar */}
                          <aside className="lg:col-span-1 space-y-4 sm:space-y-6 lg:sticky lg:top-6 lg:self-start mt-6 lg:mt-0">
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
  
        </>
    )
}

