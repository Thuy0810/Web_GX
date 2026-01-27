import { Header } from "@/components/header"
import { NewsSlider } from "@/components/news-slider"
import { MassSchedule } from "@/components/mass-schedule"
import { IntroduceSection } from "@/components/introduce-section"
import { NewsSection } from "@/components/news-section"
import { OrganizationsSection } from "@/components/organizations-section"
import { ArticlesSection } from "@/components/articles-section"
import { TrainingSection } from "@/components/training-section"
import contactService from "@/services/contact.services"

export default async function HomePage() {
  // Fetch dữ liệu liên hệ từ API
  let contactData: any = null
  try {
    const response = await contactService().getContact()
    contactData = response.data || null
  } catch (error) {
    console.error("Error fetching contact:", error)
  }

  const youtube = contactData?.youtube || "https://www.youtube.com/embed/dQw4w9WgXcQ"
  const fb = contactData?.fb || "https://facebook.com"
  
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
                    title="Video Giáo xứ Ngọc Mạch"
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
                    <p className="font-medium text-foreground">Giáo xứ Ngọc Mạch</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Bản đồ Giáo xứ Ngọc Mạch"
              />
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
