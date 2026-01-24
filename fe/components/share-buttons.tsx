"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Copy } from "lucide-react"
import { useState } from "react"

export function ShareButtons() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-foreground">Chia sẻ:</span>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
                        }
                    }}
                >
                    <Facebook className="h-4 w-4" />
                    Facebook
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')
                        }
                    }}
                >
                    <Twitter className="h-4 w-4" />
                    Twitter
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <>
                            <Copy className="h-4 w-4" />
                            Đã sao chép!
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            Sao chép
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

