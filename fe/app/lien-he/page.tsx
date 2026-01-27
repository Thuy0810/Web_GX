import { MapPin, Phone, Mail, Clock } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import contactService from "@/services/contact.services"
import globalService from "@/services/global.services"

export default async function ContactPage() {
  // Fetch dữ liệu liên hệ từ API
  let contactData: any = null
  try {
    const response = await contactService().getContact()
    // Strapi singleType có thể trả về data trực tiếp hoặc trong response.data
    contactData = response.data || response || null
    
    // Debug: Log để kiểm tra dữ liệu
    console.log('ContactPage - Full response:', response)
    console.log('ContactPage - Contact data:', contactData)
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

  // Hàm convert Google Maps URL thành embed URL (async để resolve URL rút gọn)
  const convertToEmbedUrl = async (url: string): Promise<string> => {
    if (!url || url.trim() === '') {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
    }
    
    // Nếu đã là embed URL thì trả về luôn
    if (url.includes('/embed') || url.includes('maps/embed')) {
      return url
    }
    
    // Nếu là URL rút gọn, resolve để lấy URL thực tế
    let resolvedUrl = url
    if (url.includes('byvn.net') || url.includes('goo.gl') || url.includes('bit.ly') || url.includes('tinyurl')) {
      try {
        const response = await fetch(url, { 
          method: 'HEAD',
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        resolvedUrl = response.url || url
        console.log('Resolved shortened URL:', url, '->', resolvedUrl)
      } catch (error) {
        console.warn('Không thể resolve URL rút gọn:', error)
        // Tiếp tục với URL gốc
      }
    }
    
    // Nếu là Google Maps URL thông thường, convert sang embed
    if (resolvedUrl.includes('google.com/maps') || resolvedUrl.includes('maps.google.com')) {
      // Extract coordinates từ URL (format: @lat,lng hoặc !3dlat!4dlng)
      let lat = null
      let lng = null
      
      // Thử extract từ @lat,lng format (ưu tiên)
      const coordsMatch1 = resolvedUrl.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
      if (coordsMatch1) {
        lat = coordsMatch1[1]
        lng = coordsMatch1[2]
      } else {
        // Thử extract từ !3dlat!4dlng format (trong data parameter)
        const latMatch = resolvedUrl.match(/!3d(-?\d+\.?\d*)/)
        const lngMatch = resolvedUrl.match(/!4d(-?\d+\.?\d*)/)
        if (latMatch && lngMatch) {
          lat = latMatch[1]
          lng = lngMatch[1]
        }
      }
      
      if (lat && lng) {
        // Tạo embed URL với coordinates - sử dụng format đơn giản
        console.log('ContactPage - Extracted coordinates:', lat, lng, 'from URL:', resolvedUrl)
        // Sử dụng format đơn giản với coordinates
        return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s`
      }
      
      // Nếu có place name trong URL, có thể dùng để search
      const placeNameMatch = resolvedUrl.match(/place\/([^\/@]+)/)
      if (placeNameMatch) {
        const placeName = decodeURIComponent(placeNameMatch[1].replace(/\+/g, ' '))
        // Sử dụng q parameter với place name (cần API key, nhưng thử cách này)
        return `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(placeName)}&zoom=15`
      }
    }
    
    // Nếu không thể convert, trả về fallback
    console.warn('Không thể convert URL thành embed URL:', url)
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
  }

  const address = contactData?.address || "357 Xuân Phương - Nam Từ Liêm – Hà Nội"
  const phone = contactData?.phone || "0976.677.950"
  const email = contactData?.email || "bttngocmach@gmail.com"
  const workTime = contactData?.workTime || "Thứ 2 - Chủ nhật: 8:00 - 17:00"
  // Lấy map URL, kiểm tra cả map và Map (case sensitive)
  const rawMapUrl = contactData?.map || contactData?.Map || ""
  const mapUrl = await convertToEmbedUrl(rawMapUrl)
  
  console.log('ContactPage - Contact data:', contactData)
  console.log('ContactPage - Raw Map URL:', rawMapUrl)
  console.log('ContactPage - Final Map URL:', mapUrl)

  return (
    <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-muted py-4">
          <div className="container mx-auto px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Liên hệ</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Header Section */}
        <section className="bg-card py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {globalData?.siteName || "Giáo họ Tân Định"}
            </h1>
            <p className="text-muted-foreground text-lg">
              Thông tin liên hệ và địa chỉ
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {/* Contact Information */}
            <div className="mb-8">
              <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary mb-6">Thông Tin Liên Hệ</h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  {address && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Địa chỉ</h3>
                        <p className="text-muted-foreground text-sm">
                          {address}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Điện Thoại Văn Phòng Giáo Họ Tân Định</h3>
                        <p className="text-muted-foreground text-sm">
                          {phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {email && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email Ban Truyền Thông Giáo Họ Tân Định</h3>
                        <p className="text-muted-foreground text-sm">
                          {email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Office Hours */}
                  {workTime && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Giờ làm việc</h3>
                        <p className="text-muted-foreground text-sm">
                          {workTime}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-[21/9]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`Bản đồ ${globalData?.siteName || "Giáo họ Tân Định"}`}
                />
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}

