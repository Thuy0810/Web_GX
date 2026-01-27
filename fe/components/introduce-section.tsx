import Link from "next/link"
import introduceService from "@/services/introduce.services"
import globalService from "@/services/global.services"

export async function IntroduceSection() {
  // Fetch dữ liệu từ API
  let introduceData: any = null
  let hasError = false
  
  try {
    const response = await introduceService().getIntroduce()
    introduceData = response.data || null
  } catch (error: any) {
    console.error("Error fetching introduce:", error)
    hasError = true
    
    if (error?.message?.includes('403')) {
      console.warn("Lỗi 403: Vui lòng enable permission 'find' cho 'introduce' trong Strapi Admin > Settings > Users & Permissions Plugin > Public role")
    }
  }

  // Fetch dữ liệu Global từ API
  let globalData: any = null
  try {
    const response = await globalService().getGlobal()
    globalData = response.data || response || null
  } catch (error) {
    console.error("Error fetching global:", error)
  }

  // Nếu không có dữ liệu hoặc lỗi, hiển thị fallback
  const title = introduceData?.title || "Giới thiệu Giáo xứ"
  const content = introduceData?.content || ""
  const siteName = globalData?.siteName || "Giáo họ Tân Định"
  const diocese = globalData?.diocese || "Giáo phận Vinh"

  // Hàm để strip HTML tags và lấy text thuần, giới hạn số từ (không bao gồm hình ảnh)
  const getPlainText = (html: string, maxWords: number = 500): string => {
    if (!html) return ""
    
    // Loại bỏ markdown image syntax ![alt](url) trước
    let text = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '')
    
    // Loại bỏ HTML img tags
    text = text.replace(/<img[^>]*>/gi, '')
    
    // Loại bỏ tất cả HTML tags khác
    text = text.replace(/<[^>]*>/g, '')
    
    // Loại bỏ markdown formatting (**, __, *, _)
    const cleanText = text.replace(/\*\*|\*|__|_/g, '')
    
    // Loại bỏ các ký tự đặc biệt và khoảng trắng thừa
    const normalizedText = cleanText.replace(/\s+/g, ' ').trim()
    
    // Tách thành các từ
    const words = normalizedText.split(' ').filter(word => word.length > 0)
    
    // Giới hạn số từ
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...'
    }
    return normalizedText
  }

  const plainText = getPlainText(content, 500)

  return (
    <div className="bg-card rounded-lg shadow-md p-6 h-full">
      <h3 className="text-xl font-bold text-primary mb-4 border-b border-border pb-3">
        {title}
      </h3>
      <div className="prose prose-sm max-w-none text-muted-foreground">
        {hasError ? (
          <p className="text-sm text-muted-foreground">Không thể tải nội dung giới thiệu. Vui lòng kiểm tra cấu hình API.</p>
        ) : plainText ? (
          <p className="mb-4">
            {plainText}
          </p>
        ) : (
          <p className="mb-4">
            <strong className="text-foreground">{siteName}</strong> là một giáo họ thuộc {diocese}, 
            được thành lập với sứ mệnh loan báo Tin Mừng và phục vụ cộng đồng dân Chúa tại địa phương.
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
          {diocese}
        </span>
        <span className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full">
          10+ Đoàn thể
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          Phục vụ cộng đồng
        </span>
      </div>
      {content && (
        <div className="mt-6">
          <Link 
            href="/menu/gioi-thieu"
            className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1 transition-colors"
          >
            Xem thêm →
          </Link>
        </div>
      )}
    </div>
  )
}

