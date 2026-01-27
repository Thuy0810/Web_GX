"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import menuService from "@/services/menu.services"
import contactService from "@/services/contact.services"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [expandedMenuItems, setExpandedMenuItems] = useState<Set<string>>(new Set())
  const [socialLinks, setSocialLinks] = useState({ fb: "https://facebook.com", youtube: "https://youtube.com" })

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusData = await menuService().getMenus();
        
        // Tách menu "Trang chủ" từ API (nếu có)
        const allMenus = menusData.data || [];
        const homeMenu = allMenus.find((menu: any) => {
          const nameLower = menu.name?.toLowerCase() || '';
          const slugLower = menu.slug?.toLowerCase() || '';
          return nameLower === 'trang chủ' || 
                 nameLower === 'trang chu' || 
                 slugLower === 'trang-chu' ||
                 menu.slug === '' ||
                 menu.slug === null;
        });

        // Các menu khác (không phải Trang chủ)
        const otherMenus = allMenus.filter((menu: any) => {
          const nameLower = menu.name?.toLowerCase() || '';
          const slugLower = menu.slug?.toLowerCase() || '';
          // Loại bỏ menu Trang chủ
          const isHomeMenu = nameLower === 'trang chủ' || 
                           nameLower === 'trang chu' || 
                           slugLower === 'trang-chu' ||
                           menu.slug === '' ||
                           menu.slug === null;
          return !isHomeMenu && menu.slug !== '' && menu.slug !== null;
        });

        // Sort menus theo order (nếu có), nếu không có order thì sort theo name
        const sortedMenus = otherMenus.sort((a: any, b: any) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          if (a.order !== undefined) return -1;
          if (b.order !== undefined) return 1;
          return a.name.localeCompare(b.name, 'vi');
        });

        // Loại bỏ menu trùng lặp dựa trên slug
        const uniqueMenus = sortedMenus.filter((menu: any, index: number, self: any[]) => 
          index === self.findIndex((m: any) => m.slug === menu.slug)
        );

        const formattedMenus = uniqueMenus.map((menu: any) => {
          // Kiểm tra nếu là menu "Liên hệ" thì link đến trang liên hệ riêng và không có submenu
          const menuNameLower = menu.name?.toLowerCase() || '';
          const menuSlugLower = menu.slug?.toLowerCase() || '';
          const isContactMenu = menuNameLower.includes('liên hệ') || 
                               menuNameLower.includes('lien he') ||
                               menuSlugLower === 'lien-he' ||
                               menuSlugLower === 'lienhe';
          
          // Nếu là menu liên hệ, không có submenu và link đến /lien-he
          if (isContactMenu) {
            return {
              label: menu.name,
              href: '/lien-he',
              submenu: []
            };
          }

          // Lấy category từ bảng Category (relation oneToMany từ Menu)
          // Category có: name, slug, isActive, menu (relation), posts (relation)
          const categories = menu.category || [];
         
          // Filter chỉ lấy category active và sort theo name
          const sortedCategories = categories
            .filter((category: any) => category.isActive === true)
            .sort((a: any, b: any) => a.name.localeCompare(b.name, 'vi'))
            .map((category: any) => ({
              label: category.name, // Từ trường name của bảng Category
              href: `/menu/${menu.slug}/${category.slug}`, // Từ trường slug của bảng Category
            }));

          return {
            label: menu.name,
            href: `/menu/${menu.slug}`,
            submenu: sortedCategories // Category từ bảng Category, không phải submenu
          };
        });

        // Xử lý menu Trang chủ: ưu tiên từ API, nếu không có thì thêm thủ công
        let homeMenuItem;
        if (homeMenu) {
          // Lấy category từ bảng Category (relation oneToMany từ Menu)
          const categories = homeMenu.category || [];
          
          // Filter chỉ lấy category active và sort theo name
          const sortedCategories = categories
            .filter((category: any) => category.isActive === true)
            .sort((a: any, b: any) => a.name.localeCompare(b.name, 'vi'))
            .map((category: any) => ({
              label: category.name, // Từ trường name của bảng Category
              href: `/menu/${homeMenu.slug}/${category.slug}`, // Từ trường slug của bảng Category
            }));

          homeMenuItem = {
            label: homeMenu.name || "Trang chủ",
            href: "/", // Luôn link đến trang chủ cũ
            submenu: sortedCategories // Category từ bảng Category
          };
        } else {
          // Thêm thủ công nếu không có trong API
          homeMenuItem = { label: "Trang chủ", href: "/" };
        }

        // Đặt Trang chủ ở đầu danh sách
        setMenuItems([
          homeMenuItem,
          ...formattedMenus
        ]);
      } catch (error) {
        console.error("Error fetching menus:", error);
        // Fallback menu nếu có lỗi
        setMenuItems([
          { label: "Trang chủ", href: "/" },
        ]);
      }
    };

    fetchMenus();
  }, [])

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await contactService().getContact()
        const contactData = response.data || null
        if (contactData) {
          setSocialLinks({
            fb: contactData.fb || "https://facebook.com",
            youtube: contactData.youtube || "https://youtube.com"
          })
        }
      } catch (error) {
        console.error("Error fetching contact:", error)
      }
    }
    fetchContact()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-bold text-primary">GX</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary-foreground leading-tight">
                Giáo xứ Ngọc Mạch
              </h1>
              <p className="text-xs text-primary-foreground/80">
                Tổng Giáo phận Hà Nội
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) =>
              item.submenu && item.submenu.length > 0 ? (
                <DropdownMenu key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-white/10 rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground p-0 h-8 w-6"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent className="bg-white">
                    {item.submenu.map((subitem: { label: string; href: string }) => (
                      <DropdownMenuItem key={subitem.label} asChild>
                        <Link href={subitem.href} className="cursor-pointer text-foreground hover:text-primary">
                          {subitem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-white/10 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </Button>
            {socialLinks.fb && (
              <Link
                href={socialLinks.fb}
                target="_blank"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground hover:bg-white/10"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            )}
            {socialLinks.youtube && (
              <Link
                href={socialLinks.youtube}
                target="_blank"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground hover:bg-white/10"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10">
          <nav className="container mx-auto px-4 py-4">
            {menuItems.map((item) => {
              const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
              const isExpanded = expandedMenuItems.has(item.label);
              
              return (
                <div key={item.label} className="border-b border-white/10 last:border-0">
                  <div className="flex items-center justify-between">
                    {hasSubmenu ? (
                      <>
                        <span className="flex-1 block py-3 text-primary-foreground font-medium">
                          {item.label}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedMenuItems((prev) => {
                              const newSet = new Set(prev);
                              if (isExpanded) {
                                newSet.delete(item.label);
                              } else {
                                newSet.add(item.label);
                              }
                              return newSet;
                            });
                          }}
                          className="p-2 text-primary-foreground hover:bg-white/10 rounded-md transition-colors"
                          aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
                        >
                          <ChevronDown 
                            className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        </button>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex-1 block py-3 text-primary-foreground font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                  {hasSubmenu && isExpanded && (
                    <div className="pl-4 pb-2 space-y-1">
                      {item.submenu.map((subitem: any) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
