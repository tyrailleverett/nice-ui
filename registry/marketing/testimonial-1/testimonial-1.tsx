import type { ComponentProps, ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Testimonial1Avatar {
  alt: string;
  fallback: string;
  src: string;
}

export interface Testimonial1Props {
  avatar?: Testimonial1Avatar;
  className?: string;
  company?: ReactNode;
  name?: string;
  quote?: ReactNode;
  role?: string;
}

export function VercelIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/vercel.svg"
        width="100%"
      />
    </svg>
  );
}

const defaultCompany = (
  <>
    <VercelIcon aria-hidden="true" className="size-6" />
    <span className="font-medium text-lg">Vercel</span>
  </>
);

const defaultQuote = (
  <>
    &quot;<span className="font-medium">Nice UI</span> is why I still have hair.
    No more worrying about UI blocks.&quot;
  </>
);

const defaultAvatar: Testimonial1Avatar = {
  alt: "Guillermo Rauch's profile picture",
  fallback: "GR",
  src: "https://github.com/rauchg.png",
};

export function Testimonial1({
  company = defaultCompany,
  quote = defaultQuote,
  name = "Guillermo Rauch",
  role = "CEO, Vercel",
  avatar = defaultAvatar,
  className,
}: Testimonial1Props) {
  return (
    <MarketingSection className={className} padded>
      <figure className="flex flex-col items-center justify-center">
        {company ? (
          <div className="mb-8 flex items-center gap-1">{company}</div>
        ) : null}

        <blockquote className="text-center text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl">
          {quote}
        </blockquote>

        <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px w-full max-w-sm bg-border" />

        <figcaption className="flex flex-col items-center gap-5">
          <div className="space-y-0.5 text-center">
            <cite className="font-medium text-foreground text-xl not-italic">
              {name}
            </cite>
            {role ? (
              <div className="text-lg text-muted-foreground">{role}</div>
            ) : null}
          </div>

          <Avatar className="size-12 rounded-full border object-cover">
            <AvatarImage alt={avatar.alt} src={avatar.src} />
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          </Avatar>
        </figcaption>
      </figure>
    </MarketingSection>
  );
}
