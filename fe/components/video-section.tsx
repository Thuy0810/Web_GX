interface VideoSectionProps {
    title?: string
    videoUrl?: string
}

export function VideoSection({ 
    title = "VIDEO/HÌNH ẢNH",
    videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
}: VideoSectionProps) {
    return (
        <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
            <h3 className="text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block border border-primary/20">
                {title}
            </h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-md group">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={videoUrl}
                    title="Video Giáo xứ Ngọc Mạch"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    )
}

