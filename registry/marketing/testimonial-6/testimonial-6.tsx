import { QuoteIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Testimonial6Item {
  company: string;
  image?: string;
  name: string;
  quote: string;
  role: string;
}
export interface Testimonial6Props {
  className?: string;
  description?: string;
  testimonials?: Testimonial6Item[];
  title?: string;
}
const defaultTestimonials: Testimonial6Item[] = [
  {
    company: "Northstar",
    image: "https://github.com/rauchg.png",
    name: "Maya Chen",
    quote:
      "We went from a blank canvas to a credible launch page in one afternoon. The details feel considered, not assembled.",
    role: "Product designer",
  },
  {
    company: "Field Notes",
    image: "https://github.com/shadcn.png",
    name: "Jon Bell",
    quote:
      "The blocks give our small team a strong starting point while leaving room for our own voice.",
    role: "Co-founder",
  },
  {
    company: "Relay",
    name: "Priya Shah",
    quote:
      "Nice UI made the handoff between design and engineering refreshingly uneventful.",
    role: "Engineering lead",
  },
  {
    company: "Common Room",
    name: "Alex Rivera",
    quote:
      "The responsive behavior was good enough to trust on day one, which is rare for a marketing kit.",
    role: "Growth lead",
  },
  {
    company: "Arcade",
    name: "Tess Morgan",
    quote:
      "We kept the structure, changed the tone, and still shipped something that feels unmistakably ours.",
    role: "Brand designer",
  },
  {
    company: "Orbit",
    name: "Noah Williams",
    quote:
      "The accessible primitives mean we can focus on the story instead of rebuilding the basics.",
    role: "Frontend developer",
  },
];
export function Testimonial6({
  title = "Good work leaves evidence",
  description = "A few notes from teams who wanted a sharper starting point.",
  testimonials = defaultTestimonials,
  className,
}: Testimonial6Props) {
  return (
    <MarketingSection className={className}>
      <section className="space-y-8 p-4 md:p-8">
        <header className="max-w-xl space-y-3">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Customer notes
          </p>
          <h2 className="font-display-heading text-3xl sm:text-4xl">{title}</h2>
          <p className="text-muted-foreground text-sm leading-6">
            {description}
          </p>
        </header>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              className="flex min-h-56 flex-col justify-between gap-8 bg-background p-5"
              key={item.name}
            >
              <QuoteIcon
                aria-hidden="true"
                className="size-6 text-muted-foreground"
              />
              <blockquote className="text-sm leading-6">
                {item.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage
                    alt={`${item.name}'s profile`}
                    src={item.image}
                  />
                  <AvatarFallback>
                    {item.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <cite className="block text-sm not-italic">{item.name}</cite>
                  <span className="text-muted-foreground text-xs">
                    {item.role}, {item.company}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
