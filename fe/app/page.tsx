import { Header } from "@/components/header"
import { NewsSlider } from "@/components/news-slider"
import { MassSchedule } from "@/components/mass-schedule"
import { IntroduceSection } from "@/components/introduce-section"
import { NewsSection } from "@/components/news-section"
import { OrganizationsSection } from "@/components/organizations-section"
import { ArticlesSection } from "@/components/articles-section"
import { TrainingSection } from "@/components/training-section"
import contactService from "@/services/contact.services"
import globalService from "@/services/global.services"

export default async function HomePage() {
  // Fetch dữ liệu liên hệ từ API
  let contactData: any = null
  try {
    const response = await contactService().getContact()
    // Strapi singleType có thể trả về data trực tiếp hoặc trong response.data
    contactData = response.data || response || null
    
    // Debug: Log để kiểm tra dữ liệu
    console.log('HomePage - Full response:', response)
    console.log('HomePage - Contact data:', contactData)
    console.log('HomePage - Map field:', contactData?.map)
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
        // Thử extract từ !3dlat!4dlng format (trong data parameter - chính xác hơn)
        const latMatch = resolvedUrl.match(/!3d(-?\d+\.?\d*)/)
        const lngMatch = resolvedUrl.match(/!4d(-?\d+\.?\d*)/)
        if (latMatch && lngMatch) {
          lat = latMatch[1]
          lng = lngMatch[1]
        }
      }
      
      if (lat && lng) {
        // Tạo embed URL với coordinates - sử dụng format đơn giản
        console.log('HomePage - Extracted coordinates:', lat, lng, 'from URL:', resolvedUrl)
        // Sử dụng format đơn giản với coordinates
        return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s`
      }
      
      // Nếu có place name trong URL, có thể dùng để search
      const placeNameMatch = resolvedUrl.match(/place\/([^\/@]+)/)
      if (placeNameMatch) {
        const placeName = decodeURIComponent(placeNameMatch[1].replace(/\+/g, ' '))
        // Sử dụng q parameter với place name
        return `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(placeName)}&zoom=15`
      }
    }
    
    // Nếu không thể convert, trả về fallback
    console.warn('Không thể convert URL thành embed URL:', url)
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
  }

  const youtube = contactData?.youtube || "https://www.youtube.com/embed/dQw4w9WgXcQ"
  const fb = contactData?.fb || "https://facebook.com"
  // Lấy map URL, kiểm tra cả map và Map (case sensitive)
  const rawMapUrl = contactData?.map || contactData?.Map || ""
  const mapUrl = await convertToEmbedUrl(rawMapUrl)
  
  console.log('HomePage - Raw Map URL:', rawMapUrl)
  console.log('HomePage - Final Map URL:', mapUrl)
  
  // Convert YouTube URL thành embed URL nếu cần
  let youtubeEmbedUrl = youtube
  if (youtube && !youtube.includes('/embed/')) {
    const videoIdMatch = youtube.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (videoIdMatch) {
      youtubeEmbedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`
    } else {
      youtubeEmbedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Slider */}
        <NewsSlider />

        {/* Mass Schedule + Intro Section */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Mass Schedule */}
              <div className="lg:col-span-1">
                <MassSchedule />
              </div>

              {/* Parish Introduction */}
              <div className="lg:col-span-2">
                <IntroduceSection />
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* Organizations Section */}
        <OrganizationsSection />

        {/* Articles Section */}
        <ArticlesSection />

        {/* Training Section */}
        <TrainingSection />

        {/* Video & Social Section */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block">
                  VIDEO/HÌNH ẢNH
                </h3>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted shadow-md">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={youtubeEmbedUrl}
                    title={`Video ${globalData?.siteName || "Giáo họ Tân Định"}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Facebook Widget */}
              <div>
                <h3 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block">
                  THEO DÕI FACEBOOK
                </h3>
                <div className="bg-card rounded-lg shadow-md p-4 h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <p className="font-medium text-foreground">{globalData?.siteName || "Giáo họ Tân Định"}</p>
                    <p className="text-sm mt-1">Theo dõi Facebook để cập nhật tin tức</p>
                    <a
                      href={fb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Theo dõi ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-10 bg-muted">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block">
              BẢN ĐỒ
            </h3>
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden shadow-md bg-card">
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
        </section>
      </main>

    </div>
  )
}
