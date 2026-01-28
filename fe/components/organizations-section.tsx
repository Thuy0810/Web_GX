"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import postService from "@/services/post.services"
import menuService from "@/services/menu.services"
import { baseUrl } from "@/services"

export function OrganizationsSection() {
  const [organizationTabs, setOrganizationTabs] = useState<Array<{ id: string; label: string }>>([])
  const [activeTab, setActiveTab] = useState<string>("")
  const [organizationNews, setOrganizationNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [menuSlug, setMenuSlug] = useState<string>("doan-the")

  // Lấy danh sách categories từ menu "doan-the"
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Lấy tất cả menus
        const menusData = await menuService().getMenus();
        const menus = menusData.data || [];
        
        // Tìm menu "doan-the" hoặc menu có tên chứa "đoàn thể"
        const doanTheMenu = menus.find((menu: any) => 
          menu.slug === "doan-the" || 
          menu.slug === "doan-the" ||
          menu.name?.toLowerCase().includes("đoàn thể") ||
          menu.name?.toLowerCase().includes("doan the")
        );
        
        if (doanTheMenu) {
          setMenuSlug(doanTheMenu.slug);
          
          // Lấy categories từ menu này
          const categories = doanTheMenu.category || [];
          
          // Filter chỉ lấy category active và sort theo name
          const sortedCategories = categories
            .filter((category: any) => category.isActive === true)
            .sort((a: any, b: any) => a.name.localeCompare(b.name, 'vi'))
            .map((category: any) => ({
              id: category.slug,
              label: category.name
            }));
          
          setOrganizationTabs(sortedCategories);
          
          // Set tab đầu tiên làm activeTab mặc định
          if (sortedCategories.length > 0 && !activeTab) {
            setActiveTab(sortedCategories[0].id);
          }
        }
      } catch (error) {
        // Error fetching categories
      }
    };

    fetchCategories();
  }, []);

  // Lấy bài viết khi activeTab thay đổi
  useEffect(() => {
    if (!activeTab) return;

    const fetchNews = async () => {
      try {
        setLoading(true)
        // Lấy bài viết từ category tương ứng với tab (tối đa 6 bài)
        const postsData = await postService().getPosts(undefined, activeTab);
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
          const postMenuSlug = post.menu_item?.menu?.slug || menuSlug;
          const categorySlug = post.menu_item?.slug || activeTab;
          
          // Tạo excerpt từ content (loại bỏ HTML tags)
          const excerpt = post.content 
            ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : '';
          
          return {
            id: post.id,
            title: post.title,
            excerpt: excerpt,
            image: backgroundImageUrl || "/images/org-1.jpg",
            href: `/menu/${postMenuSlug}/${categorySlug}/${post.slug}`
          };
        });
        
        setOrganizationNews(formattedPosts);
        setLoading(false);
      } catch (error) {
        setOrganizationNews([]);
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeTab, menuSlug]);

  const mainNews = organizationNews.slice(0, 3)
  const sideNews = organizationNews.slice(3, 6)

  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center">
            <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-l-lg">
              Đoàn thể
            </h2>
            <div className="flex flex-wrap">
              {organizationTabs.slice(0, 4).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-card text-muted-foreground hover:bg-card/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <Link
            href={menuSlug ? `/menu/${menuSlug}` : "/doan-the"}
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        ) : organizationNews.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border/50">
            <p className="text-muted-foreground text-lg">Không có bài viết nào</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Articles */}
            <div className="lg:col-span-2 space-y-4">
              {mainNews.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex gap-4 bg-card p-4 rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div className="relative w-32 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    {item.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Side News */}
            <div className="space-y-3">
              {sideNews.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex gap-3 p-3 bg-card rounded-lg hover:shadow-md transition-shadow group"
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
