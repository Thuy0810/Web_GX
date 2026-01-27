import contactService from "@/services/contact.services"
import globalService from "@/services/global.services"

interface FacebookWidgetProps {
    title?: string
    facebookUrl?: string
}

export async function FacebookWidget({ 
    title = "THEO DÕI FACEBOOK",
    facebookUrl
}: FacebookWidgetProps) {
    // Fetch dữ liệu liên hệ từ API nếu không có facebookUrl được truyền vào
    let fbUrl = facebookUrl
    if (!fbUrl) {
        try {
            const response = await contactService().getContact()
            const contactData = response.data || null
            fbUrl = contactData?.fb || "https://facebook.com"
        } catch (error) {
            console.error("Error fetching contact:", error)
            fbUrl = "https://facebook.com"
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
            <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-6 h-80 flex items-center justify-center border border-border/30">
                <div className="text-center text-muted-foreground">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg border-2 border-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <svg
                            className="w-10 h-10 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </div>
                    <p className="font-bold text-foreground text-base mb-1">{siteName}</p>
                    <p className="text-sm mb-5">Theo dõi Facebook để cập nhật tin tức</p>
                    <a
                        href={fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Theo dõi ngay
                    </a>
                </div>
            </div>
        </div>
    )
}

