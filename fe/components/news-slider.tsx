"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import postService from "@/services/post.services"
import { baseUrl } from "@/services"

export function NewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThongBaoPosts = async () => {
      try {
        // Lấy bài viết từ category "thông báo"
        const postsData = await postService().getPosts(undefined, "thong-bao");
        const posts = postsData.data || [];
        
        // Lấy tối đa 5 bài mới nhất
        const latestPosts = posts.slice(0, 5).map((post: any) => {
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
          const menuSlug = post.menu_item?.menu?.slug || "thong-bao";
          const categorySlug = post.menu_item?.slug || "thong-bao";
          
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
            image: backgroundImageUrl || "/images/slide-1.jpg",
            href: `/menu/${menuSlug}/${categorySlug}/${post.slug}`
          };
        });
        
        setSlides(latestPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching thong bao posts:", error);
        setLoading(false);
      }
    };

    fetchThongBaoPosts();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (loading) {
    return (
      <section className="relative bg-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Slider */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg bg-card shadow-md">
            <div className="relative aspect-[16/9]">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slides[currentSlide].image || "/images/slide-1.jpg"})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded mb-3">
                  THÔNG BÁO
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-sm text-white/80 mb-2">
                  {slides[currentSlide].date}
                </p>
                {slides[currentSlide].excerpt && (
                  <p className="text-sm text-white/90 line-clamp-2 hidden sm:block">
                    {slides[currentSlide].excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            {slides.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Side News List */}
          <div className="space-y-4">
            {slides.map((slide, index) => (
              <Link
                key={slide.id}
                href={slide.href}
                className={`block p-4 rounded-lg transition-all ${
                  index === currentSlide
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted"
                }`}
                onMouseEnter={() => setCurrentSlide(index)}
              >
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                  {slide.title}
                </h3>
                <p
                  className={`text-xs ${
                    index === currentSlide
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {slide.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
