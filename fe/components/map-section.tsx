interface MapSectionProps {
    title?: string
    mapUrl?: string
}

export function MapSection({ 
    title = "BẢN ĐỒ",
    mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949688028!2d105.85192731540222!3d21.02649139299312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647881040827!5m2!1sen!2s"
}: MapSectionProps) {
    return (
        <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
            <h3 className="text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block border border-primary/20">
                {title}
            </h3>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-md bg-card border border-border/30">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={mapUrl}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Bản đồ Giáo xứ Ngọc Mạch"
                />
            </div>
        </div>
    )
}

