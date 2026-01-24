import Image from "next/image"
import Link from "next/link"

interface RelatedPost {
    id: number | string
    title: string
    date: string
    excerpt?: string
    image: string
}

interface RelatedPostsSectionProps {
    posts: RelatedPost[]
    title?: string
    basePath?: string
}

export function RelatedPostsSection({ 
    posts, 
    title = "Tin cùng chuyên mục",
    basePath = "/post"
}: RelatedPostsSectionProps) {
    return (
        <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg inline-block border border-primary/20">
                        {title}
                    </h2>
                </div>

                {/* Main Layout: Content + Sidebar (same as above) */}
                <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Posts List - Full width to match sidebar components */}
                    <div className="lg:col-span-4">
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`${basePath}/${post.id}`}
                                    className="block group"
                                >
                                    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex gap-5 border border-border/50">
                                        <div className="relative w-36 h-36 shrink-0 rounded-xl overflow-hidden bg-muted shadow-md group-hover:shadow-lg transition-shadow">
                                            <Image
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-snug">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                                                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium">{post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

