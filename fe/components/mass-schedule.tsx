import { Clock, Church } from "lucide-react"

export function MassSchedule() {
  return (
    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-primary/20">
        <div className="p-2 rounded-lg bg-primary/10">
          <Church className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">LỊCH LỄ TẠI GIÁO XỨ</h3>
      </div>

      <div className="space-y-5">
        {/* Weekdays */}
        <div className="border-b border-border/50 pb-5 last:border-0">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-md bg-secondary/10">
              <Clock className="h-3.5 w-3.5 text-secondary" />
            </div>
            <span className="font-bold text-foreground text-sm">Từ thứ 2 → thứ 6</span>
          </div>
          <div className="pl-8 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ sáng:</span> 5:30 Lễ Chung</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ tối:</span> 19:00 Lễ Chung</span>
            </p>
          </div>
        </div>

        {/* Saturday */}
        <div className="border-b border-border/50 pb-5 last:border-0">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-md bg-secondary/10">
              <Clock className="h-3.5 w-3.5 text-secondary" />
            </div>
            <span className="font-bold text-foreground text-sm">Thứ 7</span>
          </div>
          <div className="pl-8 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ sáng:</span> 5:30 Lễ ngày thường</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ tối:</span> 19:00 – Lễ Chúa Nhật</span>
            </p>
          </div>
        </div>

        {/* Sunday */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-md bg-secondary/10">
              <Clock className="h-3.5 w-3.5 text-secondary" />
            </div>
            <span className="font-bold text-foreground text-sm">Chúa Nhật: có 4 Thánh Lễ</span>
          </div>
          <div className="pl-8 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ sáng:</span> 6:30 Lễ Chung</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ sáng:</span> 10:00 Lễ Thiếu Nhi</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ chiều:</span> 17:00 Lễ Giới Trẻ</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span><span className="font-semibold text-foreground">Lễ tối:</span> 19:00 Lễ Chung</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
