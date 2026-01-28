"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import postService from "@/services/post.services"
import { baseUrl } from "@/services"

export function TrainingSection() {
  const [trainingItems, setTrainingItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setLoading(true)
        // Lấy bài viết từ category "dao-tao" (tối đa 6 bài)
        const postsData = await postService().getPosts(undefined, "dao-tao");
        let allPosts = postsData.data || [];
        
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
          const categorySlug = post.menu_item?.slug || "dao-tao";
          
          // Tạo excerpt từ content (loại bỏ HTML tags)
          const excerpt = post.content 
            ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : '';
          
          return {
            id: post.id,
            title: post.title,
            excerpt: excerpt,
            image: backgroundImageUrl || "/images/training-1.jpg",
            href: `/menu/${menuSlug}/${categorySlug}/${post.slug}`
          };
        });
        
        setTrainingItems(formattedPosts);
        setLoading(false);
      } catch (error) {
        setTrainingItems([]);
        setLoading(false);
      }
    };

    fetchTraining();
  }, []);

  const mainItem = trainingItems[0]
  const sideItems = trainingItems.slice(1, 6)

  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
            Đào tạo
          </h2>
          <Link
            href="/dao-tao"
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
        ) : trainingItems.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border/50">
            <p className="text-muted-foreground text-lg">Không có bài viết nào</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Item */}
            {mainItem && (
              <Link href={mainItem.href} className="group">
                <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={mainItem.image || "/placeholder.svg"}
                      alt={mainItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {mainItem.title}
                    </h3>
                    {mainItem.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {mainItem.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}

            {/* Side Items */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {sideItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex gap-3 group"
                >
                  <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="flex-1 font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
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
