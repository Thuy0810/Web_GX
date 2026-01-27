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

export default async function ContactPage() {
  // Fetch dữ liệu liên hệ từ API
  let contactData: any = null
  try {
    const response = await contactService().getContact()
    contactData = response.data || null
  } catch (error) {
    console.error("Error fetching contact:", error)
  }

  const address = contactData?.address || "357 Xuân Phương - Nam Từ Liêm – Hà Nội"
  const phone = contactData?.phone || "0976.677.950"
  const email = contactData?.email || "bttngocmach@gmail.com"
  const workTime = contactData?.workTime || "Thứ 2 - Chủ nhật: 8:00 - 17:00"

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
              Giáo xứ Ngọc Mạch
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
                        <h3 className="font-semibold text-foreground mb-1">Điện Thoại Văn Phòng Giáo Xứ Ngọc Mạch</h3>
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
                        <h3 className="font-semibold text-foreground mb-1">Email Ban Truyền Thông Giáo Xứ Ngọc Mạch</h3>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Bản đồ Giáo xứ Ngọc Mạch"
                />
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}

