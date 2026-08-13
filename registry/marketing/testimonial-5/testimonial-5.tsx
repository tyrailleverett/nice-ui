import { QuoteIcon } from "lucide-react"
import type { ComponentProps } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { FullWidthDivider } from "@/components/full-width-divider"
import { cn } from "@/lib/utils"

export type Testimonial5Item = {
  name: string
  role: string
  image: string
  quote: string
  company?: string
  source?: string
}

export type Testimonial5Props = {
  title?: string
  description?: string
  testimonials?: Testimonial5Item[]
  className?: string
}

const defaultTestimonials: Testimonial5Item[] = [
  {
    quote:
      "Nice UI is so polished I might just retire and become a full-time potato farmer. The ecosystem is in safe hands.",
    image: "https://github.com/shadcn.png",
    name: "Shadcn",
    role: "Founder",
    company: "Shadcn UI",
    source: "ui.shadcn.com",
  },
  {
    quote:
      "Nice UI is why I still have hair. No more pulling it out over centering divs or fighting with CSS grid.",
    image: "https://github.com/rauchg.png",
    name: "Guillermo Rauch",
    role: "CEO",
    company: "Vercel",
    source: "x.com",
  },
  {
    quote:
      "I tried to buy Nice UI but they wouldn't sell. So I just bought Twitter instead to complain about it.",
    image: "https://unavatar.io/x/elonmusk",
    name: "Elon Musk",
    role: "CEO",
    company: "X.com",
    source: "x.com",
  },
  {
    quote:
      "We just acquired Nice UI for 3 gazillion dollars. We're calling it iNice. It's our best product yet.",
    image: "https://unavatar.io/x/tim_cook",
    name: "Tim Cook",
    role: "CEO",
    company: "Apple",
    source: "x.com",
  },
  {
    quote:
      "I'm considering shipping Nice UI components with Prime delivery. 2-day shipping on beautiful UIs? Done.",
    image: "https://unavatar.io/x/JeffBezos",
    name: "Jeff Bezos",
    role: "Founder",
    company: "Amazon",
    source: "x.com",
  },
  {
    quote:
      "We're rewriting OpenAI's entire frontend in Nice UI. The AGI told us it's the only logical choice.",
    image: "https://unavatar.io/x/sama",
    name: "Sam Altman",
    role: "CEO",
    company: "OpenAI",
    source: "x.com",
  },
  {
    quote:
      "We processed 100 petabytes of data to find the perfect UI library. The algorithm returned 'Nice UI' with 99.9% confidence.",
    image: "https://unavatar.io/x/sundarpichai",
    name: "Sundar Pichai",
    role: "CEO",
    company: "Google",
    source: "x.com",
  },
  {
    quote:
      "Our links might 404 sometimes, but thanks to Nice UI, at least the 404 page looks absolutely stunning.",
    image: "https://github.com/steven-tey.png",
    name: "Steven Tey",
    role: "Founder",
    company: "Dub.co",
    source: "x.com",
  },
]

export function Testimonial5({
  title = "What our users say",
  description = "See what our customers have to say about us.",
  testimonials = defaultTestimonials,
  className,
}: Testimonial5Props) {
  return (
    <section className={cn("mx-auto w-full max-w-5xl py-8", className)}>
      <style>{`
        @keyframes nice-ui-testimonial-5-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .nice-ui-testimonial-5-track {
          animation: nice-ui-testimonial-5-marquee 50s linear infinite;
        }
        .nice-ui-testimonial-5-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .nice-ui-testimonial-5-track {
            animation: none;
            max-width: 100%;
            overflow-x: auto;
          }
          .nice-ui-testimonial-5-clone {
            display: none;
          }
        }
      `}</style>
      <div className="mb-8 flex flex-col gap-2 px-4 md:px-6">
        <h2 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="relative overflow-hidden">
        <FullWidthDivider position="top" />
        <div className="nice-ui-testimonial-5-track flex w-max">
          <TestimonialRow testimonials={testimonials} />
          <TestimonialRow
            aria-hidden
            className="nice-ui-testimonial-5-clone"
            testimonials={testimonials}
          />
        </div>
        <FullWidthDivider position="bottom" />
      </div>
    </section>
  )
}

function TestimonialRow({
  className,
  testimonials,
  ...props
}: { testimonials: Testimonial5Item[] } & ComponentProps<"div">) {
  return (
    <div className={cn("flex", className)} {...props}>
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.name} testimonial={testimonial} />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial5Item }) {
  const { quote, company, image, name, role, source } = testimonial

  return (
    <figure className="flex w-80 shrink-0 flex-col justify-between gap-8 border-r p-6">
      <div className="flex items-start justify-between gap-4">
        <QuoteIcon
          aria-hidden="true"
          className="size-5 text-muted-foreground"
        />
        {source ? (
          <span className="text-muted-foreground text-xs">{source}</span>
        ) : null}
      </div>
      <blockquote className="text-pretty text-foreground text-sm leading-relaxed md:text-base">
        &quot;{quote}&quot;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar className="size-8 rounded-full">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="-space-y-0.5">
          <cite className="block text-sm not-italic">{name}</cite>
          <span className="block text-[11px] text-muted-foreground">
            {role}
            {company ? `, ${company}` : null}
          </span>
        </div>
      </figcaption>
    </figure>
  )
}
