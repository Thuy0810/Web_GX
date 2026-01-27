import contactService from "@/services/contact.services"
import globalService from "@/services/global.services"

interface VideoSectionProps {
    title?: string
    videoUrl?: string
}

export async function VideoSection({ 
    title = "VIDEO/HÌNH ẢNH",
    videoUrl
}: VideoSectionProps) {
    // Fetch dữ liệu liên hệ từ API nếu không có videoUrl được truyền vào
    let youtubeUrl = videoUrl
    if (!youtubeUrl) {
        try {
            const response = await contactService().getContact()
            const contactData = response.data || null
            youtubeUrl = contactData?.youtube || "https://www.youtube.com/embed/dQw4w9WgXcQ"
            // Convert YouTube URL thành embed URL nếu cần
            if (youtubeUrl && !youtubeUrl.includes('/embed/')) {
                // Extract video ID từ các format YouTube URL
                const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
                if (videoIdMatch) {
                    youtubeUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`
                } else {
                    youtubeUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
            }
        } catch (error) {
            console.error("Error fetching contact:", error)
            youtubeUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
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

    const siteName = globalData?.siteName || "Giáo họ Tân Định"

    return (
        <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
            <h3 className="text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block border border-primary/20">
                {title}
            </h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-md group">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={youtubeUrl}
                    title={`Video ${siteName}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    )
}

