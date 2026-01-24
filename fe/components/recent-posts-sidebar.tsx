import Image from "next/image"
import Link from "next/link"

interface RecentPost {
    id: number | string
    title: string
    image: string
}

interface RecentPostsSidebarProps {
    posts: RecentPost[]
    title?: string
    basePath?: string
}

export function RecentPostsSidebar({ 
    posts, 
    title = "Bài viết mới",
    basePath = "/post"
}: RecentPostsSidebarProps) {
    return (
        <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/50">
            <h3 className="text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg mb-6 inline-block border border-primary/20">
                {title}
            </h3>
            <div className="space-y-4">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`${basePath}/${post.id}`}
                        className="flex gap-3 group p-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                        <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-muted shadow-sm group-hover:shadow-md transition-shadow">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h4 className="flex-1 font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {post.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </div>
    )
}

