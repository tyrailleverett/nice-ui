import { useEffect, useState, type ComponentProps } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

function Portal({ className, ...props }: ComponentProps<"div">) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [])

  if (!mounted) {
    return null
  }

  return createPortal(
    <div
      className={cn("fixed inset-0 isolate z-40 flex flex-col", className)}
      {...props}
    />,
    document.body
  )
}

function PortalBackdrop({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 -z-1 bg-background/95 backdrop-blur-sm duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in supports-backdrop-filter:bg-background/60",
        className
      )}
      {...props}
    />
  )
}

export { Portal, PortalBackdrop }
