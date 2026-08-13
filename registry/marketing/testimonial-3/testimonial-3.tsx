import { QuoteIcon } from "lucide-react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { cn } from "@/lib/utils";

export interface Testimonial3Item {
  company?: string;
  name: string;
  quote: string;
  role: string;
}

export interface Testimonial3Props {
  className?: string;
  testimonials?: Testimonial3Item[];
}

const defaultTestimonials: Testimonial3Item[] = [
  {
    company: "Shadcn UI",
    name: "Shadcn",
    quote:
      "Nice UI is so polished I might just retire and become a full-time potato farmer. The ecosystem is in safe hands.",
    role: "Founder",
  },
  {
    company: "Vercel",
    name: "Guillermo Rauch",
    quote:
      "Nice UI is why I still have hair. No more pulling it out over centering divs or fighting with CSS grid.",
    role: "CEO",
  },
  {
    company: "X.com",
    name: "Elon Musk",
    quote:
      "I tried to buy Nice UI but they wouldn't sell. So I just bought Twitter instead to complain about it.",
    role: "CEO",
  },
];

export function Testimonial3({
  testimonials = defaultTestimonials,
  className,
}: Testimonial3Props) {
  const [firstTestimonial, secondTestimonial, featured] = testimonials;
  const primary = [firstTestimonial, secondTestimonial].filter(
    (testimonial): testimonial is Testimonial3Item => testimonial !== undefined
  );

  return (
    <section
      className={cn("relative mx-auto w-full max-w-4xl border-x", className)}
    >
      <FullWidthDivider position="top" />
      <div className="grid md:grid-cols-[2fr_1px_1fr]">
        <div className="divide-y">
          {primary.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
        <div className="h-px bg-border md:h-auto" />
        {featured ? (
          <div className="flex items-center">
            <TestimonialCard testimonial={featured} />
          </div>
        ) : null}
      </div>
      <FullWidthDivider position="bottom" />
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial3Item }) {
  const { quote, name, role, company } = testimonial;

  return (
    <figure className="p-6 md:p-8">
      <QuoteIcon
        aria-hidden="true"
        className="mb-4 size-12 stroke-1 text-muted-foreground"
      />

      <blockquote className="mb-6 font-normal text-base text-foreground md:text-lg">
        &quot;{quote}&quot;
      </blockquote>

      <figcaption className="flex flex-col gap-0.5">
        <cite className="font-medium text-foreground text-lg not-italic">
          {name}
        </cite>
        <p className="text-muted-foreground text-sm">
          {role}
          {company ? `, ${company}` : null}
        </p>
      </figcaption>
    </figure>
  );
}
