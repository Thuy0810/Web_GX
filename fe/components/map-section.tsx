import contactService from "@/services/contact.services"
import globalService from "@/services/global.services"

interface MapSectionProps {
    title?: string
    mapUrl?: string
}

export async function MapSection({ 
    title = "BẢN ĐỒ",
    mapUrl
}: MapSectionProps) {
    // Hàm convert Google Maps URL thành embed URL
    const convertToEmbedUrl = async (url: string): Promise<string> => {
        if (!url || url.trim() === '') {
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
        }
        
        // Nếu đã là embed URL thì trả về luôn
        if (url.includes('/embed') || url.includes('maps/embed')) {
            return url
        }
        
        // Nếu là URL rút gọn (shortened URL), cần resolve để lấy URL thực tế
        let resolvedUrl = url
        if (url.includes('byvn.net') || url.includes('goo.gl') || url.includes('bit.ly') || url.includes('tinyurl')) {
            try {
                // Thử resolve URL rút gọn
                const response = await fetch(url, { 
                    method: 'HEAD',
                    redirect: 'follow',
                    headers: {
                        'User-Agent': 'Mozilla/5.0'
                    }
                })
                resolvedUrl = response.url || url
                console.log('Resolved shortened URL:', resolvedUrl)
            } catch (error) {
                console.warn('Không thể resolve URL rút gọn:', error)
                // Tiếp tục với URL gốc
            }
        }
        
        // Nếu là Google Maps URL thông thường, cần convert
        if (resolvedUrl.includes('google.com/maps') || resolvedUrl.includes('maps.google.com') || resolvedUrl.includes('goo.gl/maps')) {
            // Extract Place ID từ URL (format: !1s0x...:0x...)
            const placeIdMatch = resolvedUrl.match(/!1s([^!]+)/)
            if (placeIdMatch) {
                const placeId = placeIdMatch[1]
                // Sử dụng Place ID để tạo embed URL
                // Format: https://www.google.com/maps/embed/v1/place?key=API_KEY&q=PLACE_ID
                // Nhưng không có API key, nên dùng cách khác: extract coordinates và tạo embed
            }
            
            // Extract coordinates từ URL (format: @lat,lng hoặc !3dlat!4dlng)
            let lat = null
            let lng = null
            
            // Thử extract từ @lat,lng format
            const coordsMatch1 = resolvedUrl.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
            if (coordsMatch1) {
                lat = coordsMatch1[1]
                lng = coordsMatch1[2]
            } else {
                // Thử extract từ !3dlat!4dlng format
                const latMatch = resolvedUrl.match(/!3d(-?\d+\.?\d*)/)
                const lngMatch = resolvedUrl.match(/!4d(-?\d+\.?\d*)/)
                if (latMatch && lngMatch) {
                    lat = latMatch[1]
                    lng = lngMatch[1]
                }
            }
            
            if (lat && lng) {
                // Tạo embed URL với coordinates - sử dụng format đơn giản
                console.log('MapSection - Extracted coordinates:', lat, lng, 'from URL:', resolvedUrl)
                // Sử dụng format đơn giản với q parameter (coordinates)
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
        
        // Nếu không phải Google Maps URL hợp lệ, trả về fallback
        console.warn('Map URL không hợp lệ hoặc không phải embed URL:', url)
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
    }

    // Fetch dữ liệu liên hệ từ API nếu không có mapUrl được truyền vào
    let mapEmbedUrl = mapUrl
    if (!mapEmbedUrl) {
        try {
            const response = await contactService().getContact()
            // Strapi singleType có thể trả về data trực tiếp hoặc trong response.data
            const contactData = response.data || response || null
            
            // Debug: Log để kiểm tra dữ liệu
            console.log('MapSection - Full response:', response)
            console.log('MapSection - Contact data:', contactData)
            console.log('MapSection - Map field:', contactData?.map)
            
            // Lấy map URL, kiểm tra cả map và Map (case sensitive)
            const rawMapUrl = contactData?.map || contactData?.Map || ""
            
            // Convert sang embed URL (async)
            mapEmbedUrl = await convertToEmbedUrl(rawMapUrl)
            
            console.log('MapSection - Raw Map URL:', rawMapUrl)
            console.log('MapSection - Converted Embed URL:', mapEmbedUrl)
        } catch (error) {
            console.error("Error fetching contact:", error)
            mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
        }
    } else {
        // Convert mapUrl được truyền vào (async)
        mapEmbedUrl = await convertToEmbedUrl(mapUrl)
    }
    
    // Đảm bảo mapEmbedUrl luôn có giá trị và không rỗng
    if (!mapEmbedUrl || mapEmbedUrl.trim() === '') {
        mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
    }
    
    console.log('MapSection - Final Map Embed URL:', mapEmbedUrl)

    // Fetch dữ liệu Global từ API
    let globalData: any = null
    try {
        const response = await globalService().getGlobal()
        globalData = response.data || response || null
    } catch (error) {
        console.error("Error fetching global:", error)
    }

    const siteName = globalData?.siteName || "Giáo họ Tân Định"

    return (
        <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
            <h3 className="text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block border border-primary/20">
                {title}
            </h3>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-md bg-card border border-border/30">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={mapEmbedUrl}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`Bản đồ ${siteName}`}
                />
            </div>
        </div>
    )
}

