"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import postService from "@/services/post.services"
import { baseUrl } from "@/services"

export function ArticlesSection() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        // Lấy bài viết từ category "bai-viet" hoặc "suy-niem" (tối đa 6 bài)
        const postsData = await postService().getPosts(undefined, "bai-viet");
        let allPosts = postsData.data || [];
        
        // Nếu không có bài từ "bai-viet", thử "suy-niem"
        if (allPosts.length === 0) {
          const suyNiemData = await postService().getPosts(undefined, "suy-niem");
          allPosts = suyNiemData.data || [];
        }
        
        // Sắp xếp lại theo thời gian đăng (mới nhất trước)
        allPosts = allPosts.sort((a: any, b: any) => {
          const dateA = a.postingDate ? new Date(a.postingDate).getTime() : new Date(a.createdAt).getTime();
          const dateB = b.postingDate ? new Date(b.postingDate).getTime() : new Date(b.createdAt).getTime();
          return dateB - dateA; // Giảm dần (mới nhất trước)
        });
        
        // Lấy tối đa 6 bài
        const posts = allPosts.slice(0, 6);
        
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
          const menuSlug = post.menu_item?.menu?.slug || "tin-tuc";
          const categorySlug = post.menu_item?.slug || "bai-viet";
          
          // Tạo excerpt từ content (loại bỏ HTML tags)
          const excerpt = post.content 
            ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : '';
          
          return {
            id: post.id,
            title: post.title,
            excerpt: excerpt,
            image: backgroundImageUrl || "/images/article-1.jpg",
            href: `/menu/${menuSlug}/${categorySlug}/${post.slug}`
          };
        });
        
        setArticles(formattedPosts);
        setLoading(false);
      } catch (error) {
        setArticles([]);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 6)

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
            Bài viết/ Suy niệm
          </h2>
          <Link
            href="/bai-viet"
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border/50">
            <p className="text-muted-foreground text-lg">Không có bài viết nào</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Article */}
            {mainArticle && (
              <Link href={mainArticle.href} className="group">
                <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={mainArticle.image || "/placeholder.svg"}
                      alt={mainArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {mainArticle.title}
                    </h3>
                    {mainArticle.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {mainArticle.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}

            {/* Side Articles */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {sideArticles.map((article) => (
                <Link
                  key={article.id}
                  href={article.href}
                  className="flex gap-3 group"
                >
                  <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="flex-1 font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
