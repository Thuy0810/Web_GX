import { Clock, Church } from "lucide-react"
import liturgicalCalendarService from "@/services/liturgical-calendar.services"

export async function MassSchedule() {
  // Fetch dữ liệu từ API
  let schedules: any[] = []
  let hasError = false
  
  try {
    const response = await liturgicalCalendarService().getLiturgicalCalendars()
    schedules = response.data || []
  } catch (error: any) {
    hasError = true
  }

  // Hàm helper để lấy schedule items từ nhiều định dạng dữ liệu khác nhau
  const getScheduleItems = (schedule: any): any[] => {
    if (!schedule.Schedude) return []
    
    // Trường hợp 1: Mảng trực tiếp
    if (Array.isArray(schedule.Schedude)) {
      return schedule.Schedude.map((item: any) => {
        // Nếu item có attributes (Strapi v4 format)
        if (item.attributes) {
          return { title: item.attributes.title || '' }
        }
        // Nếu item là object trực tiếp
        return { title: item.title || '' }
      })
    }
    
    // Trường hợp 2: Có data wrapper (Strapi v4 format)
    if (schedule.Schedude.data && Array.isArray(schedule.Schedude.data)) {
      return schedule.Schedude.data.map((item: any) => {
        if (item.attributes) {
          return { title: item.attributes.title || '' }
        }
        return { title: item.title || '' }
      })
    }
    
    return []
  }

  return (
    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-primary/20">
        <div className="p-2 rounded-lg bg-primary/10">
          <Church className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">LỊCH LỄ TẠI GIÁO HỌ</h3>
      </div>

      <div className="space-y-5">
        {hasError ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Không thể tải lịch lễ. Vui lòng kiểm tra cấu hình API.</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Chưa có lịch lễ nào.</p>
          </div>
        ) : (
          schedules.map((schedule, index) => {
            const scheduleItems = getScheduleItems(schedule)
            const isLast = index === schedules.length - 1

            return (
              <div 
                key={schedule.id || index} 
                className={`border-b border-border/50 pb-5 ${isLast ? 'last:border-0' : ''}`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-md bg-secondary/10">
                    <Clock className="h-3.5 w-3.5 text-secondary" />
                  </div>
                  <span className="font-bold text-foreground text-sm">
                    {schedule.Title || `Nhóm ${index + 1}`}
                  </span>
                </div>
                {scheduleItems.length > 0 ? (
                  <div className="pl-8 space-y-2 text-sm text-muted-foreground">
                    {scheduleItems.map((item: any, itemIndex: number) => (
                      <p key={itemIndex} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span>{item.title || ''}</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="pl-8 text-sm text-muted-foreground">
                    <p>Chưa có lịch lễ nào trong nhóm này.</p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
