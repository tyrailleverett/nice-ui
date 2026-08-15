import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta11Action {
  href?: string;
  label: string;
}

export interface Cta11Avatar {
  alt: string;
  src: string;
}

export interface Cta11Props {
  avatars?: Cta11Avatar[];
  className?: string;
  description?: string;
  primaryCta?: Cta11Action;
  ratingLabel?: string;
  secondaryCta?: Cta11Action;
  title?: ReactNode;
}

const defaultAvatars: Cta11Avatar[] = [
  {
    alt: "Partner 01",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=72",
  },
  {
    alt: "Partner 02",
    src: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?q=80&w=72",
  },
  {
    alt: "Partner 03",
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=72",
  },
  {
    alt: "Partner 04",
    src: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=72",
  },
  {
    alt: "Partner 05",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=72",
  },
];

function ActionButton({
  action,
  variant,
  icon,
}: {
  action: Cta11Action;
  variant?: "default" | "outline";
  icon?: ReactNode;
}) {
  const content = (
    <>
      {action.label}
      {icon}
    </>
  );

  if (action.href) {
    return (
      <Button
        className="rounded-full"
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button className="rounded-full" type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Cta11({
  avatars = defaultAvatars,
  ratingLabel = "140+ happy partners",
  title = (
    <>
      Ready to <em className="italic">boost</em> your growth with performance
      ads?
    </>
  ),
  description = "We engineer profitable acquisition systems for digital brands. If efficient, scalable growth is your goal, you're in the right place.",
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Try it now" },
  className,
}: Cta11Props) {
  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center",
        "bg-[radial-gradient(45%_70%_at_50%_30%,--theme(--color-foreground/.08),transparent)]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {avatars.length ? (
          <div className="flex -space-x-2 *:rounded-full *:ring-2 *:ring-background">
            {avatars.map((avatar) => (
              <img
                alt={avatar.alt}
                height={32}
                key={avatar.src}
                src={avatar.src}
                width={32}
              />
            ))}
          </div>
        ) : null}
        <div className="text-left">
          <div className="flex items-center gap-0.5">
            {["star-1", "star-2", "star-3", "star-4", "star-5"].map(
              (starId) => (
                <StarIcon className="size-3.5 fill-foreground" key={starId} />
              )
            )}
          </div>
          <p className="text-muted-foreground text-xs">{ratingLabel}</p>
        </div>
      </div>

      <h2 className="max-w-xl text-balance font-display-heading text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-lg text-pretty text-muted-foreground text-sm md:text-base">
          {description}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {secondaryCta ? (
          <ActionButton action={secondaryCta} variant="outline" />
        ) : null}
        {primaryCta ? (
          <ActionButton
            action={primaryCta}
            icon={<ArrowUpRightIcon data-icon="inline-end" />}
          />
        ) : null}
      </div>
    </section>
  );
}
