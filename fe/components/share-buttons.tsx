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
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Chia sẻ:</span>
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
                        }
                    }}
                >
                    <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Facebook</span>
                    <span className="sm:hidden">FB</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')
                        }
                    }}
                >
                    <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Twitter</span>
                    <span className="sm:hidden">TW</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <>
                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden sm:inline">Đã sao chép!</span>
                            <span className="sm:hidden">Đã copy</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden sm:inline">Sao chép</span>
                            <span className="sm:hidden">Copy</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

