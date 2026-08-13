import type { ComponentProps } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { FullWidthDivider } from "@/components/full-width-divider"
import { cn } from "@/lib/utils"

export type Testimonial4Item = {
  name: string
  role: string
  image: string
  company?: string
  quote: string
}

export type Testimonial4Props = {
  title?: string
  description?: string
  testimonials?: Testimonial4Item[]
  className?: string
}

const defaultTestimonials: Testimonial4Item[] = [
  {
    quote:
      "Nice UI is so polished I might just retire and become a full-time potato farmer. The ecosystem is in safe hands.",
    image: "https://github.com/shadcn.png",
    name: "Shadcn",
    role: "Founder",
    company: "Shadcn UI",
  },
  {
    quote:
      "Nice UI is why I still have hair. No more pulling it out over centering divs or fighting with CSS grid.",
    image: "https://github.com/rauchg.png",
    name: "Guillermo Rauch",
    role: "CEO",
    company: "Vercel",
  },
  {
    quote:
      "I tried to buy Nice UI but they wouldn't sell. So I just bought Twitter instead to complain about it.",
    image: "https://unavatar.io/x/elonmusk",
    name: "Elon Musk",
    role: "CEO",
    company: "X.com",
  },
  {
    quote:
      "We just acquired Nice UI for 3 gazillion dollars. We're calling it iNice. It's our best product yet.",
    image: "https://unavatar.io/x/tim_cook",
    name: "Tim Cook",
    role: "CEO",
    company: "Apple",
  },
  {
    quote:
      "I'm considering shipping Nice UI components with Prime delivery. 2-day shipping on beautiful UIs? Done.",
    image: "https://unavatar.io/x/JeffBezos",
    name: "Jeff Bezos",
    role: "Founder",
    company: "Amazon",
  },
  {
    quote:
      "We're rewriting OpenAI's entire frontend in Nice UI. The AGI told us it's the only logical choice.",
    image: "https://unavatar.io/x/sama",
    name: "Sam Altman",
    role: "CEO",
    company: "OpenAI",
  },
  {
    quote:
      "We processed 100 petabytes of data to find the perfect UI library. The algorithm returned 'Nice UI' with 99.9% confidence.",
    image: "https://unavatar.io/x/sundarpichai",
    name: "Sundar Pichai",
    role: "CEO",
    company: "Google",
  },
  {
    quote:
      "Our links might 404 sometimes, but thanks to Nice UI, at least the 404 page looks absolutely stunning.",
    image: "https://github.com/steven-tey.png",
    name: "Steven Tey",
    role: "Founder",
    company: "Dub.co",
  },
  {
    quote:
      "It's so fast, I finished my UI sprint before my next meeting even started. Open source for the win.",
    image: "https://unavatar.io/x/peer_rich",
    name: "Peer Richelsen",
    role: "Co-Founder",
    company: "Cal.com",
  },
  {
    quote:
      "21st.dev brings in 100k users daily just to see Nice UI. We got into YC solely because of this UI library. And yes, we're rich now.",
    image: "https://github.com/serafimcloud.png",
    name: "Serafim",
    role: "Founder",
    company: "21st Labs.",
  },
  {
    quote:
      "I posted a video on Nice UI components and it got more views than my cat video. That's statistically impossible.",
    image: "https://github.com/TheOrcDev.png",
    name: "OrcDev",
    role: "Youtuber",
  },
]

export function Testimonial4({
  title = "Real Results, Real Voices",
  description = "Used by thousands of developers to build beautiful, accessible, and performant web applications.",
  testimonials = defaultTestimonials,
  className,
}: Testimonial4Props) {
  return (
    <section className={cn("mx-auto max-w-5xl space-y-8 border-x py-6", className)}>
      <div className="flex flex-col gap-2 px-4 md:px-6">
        <h2 className="text-balance font-semibold text-3xl tracking-wide md:text-4xl xl:font-bold">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      <div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <FullWidthDivider position="top" />
        {testimonials.map((testimonial) => (
          <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </section>
  )
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: ComponentProps<"figure"> & {
  testimonial: Testimonial4Item
}) {
  const { quote, company, image, name, role } = testimonial

  return (
    <figure
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-x-3 bg-background p-4",
        className
      )}
      {...props}
    >
      <Avatar className="size-8 rounded-full">
        <AvatarImage alt={`${name}'s profile picture`} src={image} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <figcaption className="-mt-0.5 -space-y-0.5">
          <cite className="text-sm not-italic md:text-base">{name}</cite>
          <span className="block font-light text-[11px] text-muted-foreground tracking-tight">
            {role}
            {company ? `, ${company}` : null}
          </span>
        </figcaption>
        <blockquote className="mt-3">
          <p className="text-foreground/80 text-sm tracking-wide">{quote}</p>
        </blockquote>
      </div>
    </figure>
  )
}
