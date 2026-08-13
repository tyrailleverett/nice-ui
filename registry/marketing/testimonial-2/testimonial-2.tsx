import type { ComponentProps, ReactNode } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export type Testimonial2Avatar = {
  alt: string
  fallback: string
  src: string
}

export type Testimonial2Props = {
  quote?: ReactNode
  name?: string
  role?: string
  avatar?: Testimonial2Avatar
  className?: string
}

export function MaskLine({
  className,
  orientation,
  ...props
}: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bg-foreground/20",
        orientation === "vertical" &&
          "mask-t-from-80% mask-b-from-80% -inset-y-1/2 w-px",
        orientation === "horizontal" &&
          "mask-l-from-80% mask-r-from-80% -inset-x-1/2 h-px",
        className
      )}
      {...props}
    />
  )
}

const defaultQuote = (
  <>
    &quot;<span className="font-medium text-foreground">Nice UI</span> is so
    polished I might just retire. The ecosystem is in safe hands.&quot;
  </>
)

const defaultAvatar: Testimonial2Avatar = {
  alt: "Shadcn's profile picture",
  fallback: "SH",
  src: "https://github.com/shadcn.png",
}

export function Testimonial2({
  quote = defaultQuote,
  name = "Shadcn",
  role = "Founder, shadcn/ui",
  avatar = defaultAvatar,
  className,
}: Testimonial2Props) {
  return (
    <figure
      className={cn(
        "mx-auto flex w-full max-w-lg flex-col items-center justify-center md:grid md:grid-cols-[auto_1fr]",
        className
      )}
    >
      <div className="relative">
        <MaskLine className="left-0" orientation="vertical" />
        <MaskLine className="right-0" orientation="vertical" />
        <MaskLine className="top-0 md:w-xl" orientation="horizontal" />
        <MaskLine className="bottom-0 md:w-xl" orientation="horizontal" />

        <Avatar className="mask-[radial-gradient(circle,black_60%,transparent)] size-24 rounded-none after:rounded-none *:rounded-none md:size-32">
          <AvatarImage alt={avatar.alt} src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      </div>
      <figcaption className="space-y-4 p-8 text-center md:p-6 md:text-left">
        <blockquote className="text-lg text-muted-foreground leading-tight tracking-tight">
          {quote}
        </blockquote>

        <div>
          <cite className="font-medium text-foreground text-xs not-italic">
            {name}
          </cite>
          {role ? (
            <div className="text-[10px] text-muted-foreground">{role}</div>
          ) : null}
        </div>
      </figcaption>
    </figure>
  )
}
