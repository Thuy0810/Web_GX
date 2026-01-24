import { MapPin, Phone, Mail } from "lucide-react"
import { MassSchedule } from "@/components/mass-schedule"
import { VideoSection } from "@/components/video-section"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ContactPage() {
    const contactInfo = {
        address: "357 Xuân Phương – Nam Từ Liêm – Hà Nội",
        phone: "0976.677.950",
        email: "bttngocmach@gmail.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
    }

    return (
        <>
            <section className="py-12 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-8">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="hover:text-primary transition-colors">Trang chủ</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Liên hệ</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Header */}
                    <div className="mb-10">
                        <div className="bg-card rounded-xl shadow-lg border border-border/50 p-6 md:p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                            
                            <div className="relative z-10">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                                    Giáo xứ Ngọc Mạch
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout: Content + Sidebar */}
                    <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Contact Information */}
                            <div className="bg-card rounded-xl shadow-lg border border-border/50 p-6 md:p-10 mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                                    <span className="w-2 h-7 bg-primary rounded-full"></span>
                                    Thông tin liên hệ
                                </h2>

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="p-3 rounded-xl bg-primary/15 shadow-sm">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2">Địa chỉ</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {contactInfo.address}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="p-3 rounded-xl bg-primary/15 shadow-sm">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2">Điện Thoại Văn Phòng Giáo Xứ Ngọc Mạch</h3>
                                            <a 
                                                href={`tel:${contactInfo.phone}`}
                                                className="text-primary hover:text-primary/80 font-semibold transition-colors"
                                            >
                                                {contactInfo.phone}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-muted/80 to-muted/50 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="p-3 rounded-xl bg-primary/15 shadow-sm">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2">Email Ban Truyền Thông Giáo Xứ Ngọc Mạch</h3>
                                            <a 
                                                href={`mailto:${contactInfo.email}`}
                                                className="text-primary hover:text-primary/80 font-semibold transition-colors"
                                            >
                                                {contactInfo.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps */}
                            <div className="bg-card rounded-xl shadow-lg border border-border/50 p-6 md:p-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                                    <span className="w-2 h-7 bg-primary rounded-full"></span>
                                    Bản đồ
                                </h2>
                                <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-lg bg-muted border border-border/30">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={contactInfo.mapUrl}
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        title="Bản đồ Giáo xứ Ngọc Mạch"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-6 lg:self-start">
                            {/* Lịch lễ tại giáo xứ */}
                            <MassSchedule />

                            {/* Video/Hình ảnh */}
                            <VideoSection />
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

