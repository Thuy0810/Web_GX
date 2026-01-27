import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"
import contactService from "@/services/contact.services"
import postService from "@/services/post.services"
import globalService from "@/services/global.services"
import { baseUrl } from "@/services"

export async function Footer() {
  // Fetch dữ liệu liên hệ từ API
  let contactData: any = null
  try {
    const response = await contactService().getContact()
    contactData = response.data || null
  } catch (error) {
    console.error("Error fetching contact:", error)
  }

  // Fetch dữ liệu Global từ API
  let globalData: any = null
  try {
    const response = await globalService().getGlobal()
    globalData = response.data || response || null
  } catch (error) {
    console.error("Error fetching global:", error)
  }

  // Fetch 2 bài viết mới nhất từ API
  let recentPosts: any[] = []
  try {
    const postsData = await postService().getPosts()
    const posts = postsData.data?.slice(0, 2).map((p: any) => {
      let backgroundImageUrl = null
      if (p.backgroundImage) {
        if (p.backgroundImage.url) {
          backgroundImageUrl = p.backgroundImage.url
        } else if (p.backgroundImage.data?.attributes?.url) {
          backgroundImageUrl = p.backgroundImage.data.attributes.url
        } else if (p.backgroundImage.data?.url) {
          backgroundImageUrl = p.backgroundImage.data.url
        }
      }
      if (backgroundImageUrl && !backgroundImageUrl.startsWith('http') && !backgroundImageUrl.startsWith('//')) {
        if (!backgroundImageUrl.startsWith('/')) {
          backgroundImageUrl = `/${backgroundImageUrl}`
        }
        backgroundImageUrl = `${baseUrl}${backgroundImageUrl}`
      }
      const menuSlug = p.menu_item?.menu?.slug || 'tin-tuc'
      const categorySlug = p.menu_item?.slug || ''
      return {
        id: p.slug,
        title: p.title,
        image: backgroundImageUrl || "/images/news-1.jpg",
        slug: p.slug,
        href: categorySlug ? `/menu/${menuSlug}/${categorySlug}/${p.slug}` : `/menu/${menuSlug}/${p.slug}`
      }
    }) || []
    recentPosts = posts
  } catch (error) {
    console.error("Error fetching recent posts:", error)
  }

  const address = contactData?.address || "Tân Định, Hà Nội, Việt Nam"
  const phone = contactData?.phone || "+84 xxx xxx xxx"
  const email = contactData?.email || "contact@giaoxungocmach.org"
  const fb = contactData?.fb || "https://facebook.com"
  const youtube = contactData?.youtube || "https://youtube.com"

  return (
    <footer className="bg-foreground text-background  w-full">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* About & Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-14 w-14 rounded-full bg-primary shadow-lg overflow-hidden">
                {(() => {
                  // Xử lý nhiều định dạng response từ Strapi
                  let faviconUrl = null
                  const favicon = globalData?.favicon
                  
                  if (favicon) {
                    // Kiểm tra các định dạng khác nhau
                    if (typeof favicon === 'string') {
                      faviconUrl = favicon
                    } else if (favicon?.url) {
                      faviconUrl = favicon.url
                    } else if (favicon?.data?.attributes?.url) {
                      faviconUrl = favicon.data.attributes.url
                    } else if (favicon?.data?.url) {
                      faviconUrl = favicon.data.url
                    } else if (favicon?.attributes?.url) {
                      faviconUrl = favicon.attributes.url
                    } else if (favicon?.data) {
                      // Nếu data là object trực tiếp
                      faviconUrl = favicon.data.url || favicon.data
                    }
                    
                    // Xử lý URL - nếu là relative path thì thêm baseUrl
                    if (faviconUrl) {
                      if (typeof faviconUrl === 'string' && !faviconUrl.startsWith('http') && !faviconUrl.startsWith('//') && !faviconUrl.startsWith('data:')) {
                        faviconUrl = faviconUrl.startsWith('/') 
                          ? `${baseUrl}${faviconUrl}` 
                          : `${baseUrl}/${faviconUrl}`
                      }
                    }
                  }
                  
                  // Luôn hiển thị logo, nếu không có từ API thì dùng placeholder
                  return (
                    <Image
                      src={faviconUrl || "/placeholder-logo.png"}
                      alt={globalData?.siteName || "Logo"}
                      fill
                      className="object-cover rounded-full"
                    />
                  )
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-background">{globalData?.siteName || "Giáo họ Tân Định"}</h3>
                <p className="text-sm text-background/70">{globalData?.diocese || "Giáo phận Vinh"}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-background/80 mb-6">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{phone}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{email}</span>
              </p>
            </div>
            <div className="flex gap-3">
              {fb && (
                <Link
                  href={fb}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {youtube && (
                <Link
                  href={youtube}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-secondary transition-all duration-300 hover:scale-110"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h4 className="text-lg font-bold text-background mb-6 pb-3 border-b-2 border-primary/30">
              Bài viết mới
            </h4>
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id || post.slug}
                    href={post.href || `/menu/tin-tuc/${post.slug || post.id}`}
                    className="flex gap-4 group hover:bg-background/5 p-2 rounded-lg transition-all duration-300"
                  >
                    <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background/10 shadow-md group-hover:shadow-lg transition-shadow">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h5 className="flex-1 text-sm text-background/80 group-hover:text-primary transition-colors line-clamp-2 font-medium leading-snug">
                      {post.title}
                    </h5>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-background/60">Chưa có bài viết nào.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-background/60">
            © {new Date().getFullYear()} {globalData?.siteName || "Giáo họ Tân Định"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
