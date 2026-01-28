"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import postService from "@/services/post.services"
import { baseUrl } from "@/services"

const tabs = [
  { id: "thong-bao", label: "Thông báo" },
  { id: "sinh-hoat", label: "Sinh hoạt/ Hoạt động" },
]

export function NewsSection() {
  const [activeTab, setActiveTab] = useState("thong-bao")
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        // Lấy bài viết từ category tương ứng với tab (tối đa 7 bài)
        const postsData = await postService().getPosts(undefined, activeTab);
        let allPosts = postsData.data || [];
        
        // Sắp xếp lại theo thời gian đăng (mới nhất trước) để đảm bảo bài mới nhất là main news
        allPosts = allPosts.sort((a: any, b: any) => {
          const dateA = a.postingDate ? new Date(a.postingDate).getTime() : new Date(a.createdAt).getTime();
          const dateB = b.postingDate ? new Date(b.postingDate).getTime() : new Date(b.createdAt).getTime();
          return dateB - dateA; // Giảm dần (mới nhất trước)
        });
        
        // Lấy tối đa 7 bài (bài mới nhất sẽ là main news)
        const posts = allPosts.slice(0, 7);
        
        const formattedPosts = posts.map((post: any) => {
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
          
          // Lấy menu và category slug để tạo đường dẫn
          const menuSlug = post.menu_item?.menu?.slug || activeTab;
          const categorySlug = post.menu_item?.slug || activeTab;
          
          // Tạo excerpt từ content (loại bỏ HTML tags)
          const excerpt = post.content 
            ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : '';
          
          // Format date
          const postDate = post.postingDate 
            ? new Date(post.postingDate).toLocaleDateString('vi-VN')
            : new Date(post.createdAt).toLocaleDateString('vi-VN');
          
          return {
            id: post.id,
            title: post.title,
            date: postDate,
            excerpt: excerpt,
            image: backgroundImageUrl || "/images/news-1.jpg",
            href: `/menu/${menuSlug}/${categorySlug}/${post.slug}`
          };
        });
        
        setNewsItems(formattedPosts);
        setLoading(false);
      } catch (error) {
        setNewsItems([]);
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeTab]);

  const mainNews = newsItems[0]
  const sideNews = newsItems.slice(1) // Lấy tất cả bài còn lại, không giới hạn

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-l-lg">
              Tin tức
            </h2>
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/menu/tin-tuc"
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border/50">
            <p className="text-muted-foreground text-lg">Không có bài viết nào</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main News */}
            {mainNews && (
              <Link
                href={mainNews.href}
                className="lg:col-span-2 group"
              >
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={mainNews.image || "/placeholder.svg"}
                    alt={mainNews.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                      {mainNews.title}
                    </h3>
                    <p className="text-sm text-white/80">{mainNews.date}</p>
                    {mainNews.excerpt && (
                      <p className="text-sm text-white/90 mt-2 line-clamp-2 hidden sm:block">
                        {mainNews.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}

            {/* Side News */}
            <div className="space-y-4">
              {sideNews.length > 0 ? (
                sideNews.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-24 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  Không có bài viết khác
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
