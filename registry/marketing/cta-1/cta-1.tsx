import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

export interface Cta1Action {
  href?: string;
  label: string;
}

export interface Cta1Props {
  className?: string;
  primaryCta?: Cta1Action;
  secondaryCta?: Cta1Action;
  title?: string;
}

function ActionButton({
  action,
  variant,
}: {
  action: Cta1Action;
  variant?: "default" | "secondary";
}) {
  if (action.href) {
    return (
      <Button
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {action.label}
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {action.label}
    </Button>
  );
}

export function Cta1({
  title = "Let your plans shape the future.",
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Contact Sales" },
  className,
}: Cta1Props) {
  return (
    <MarketingSection className={className}>
      <section className="relative flex flex-col justify-between md:flex-row">
        <div className="border-b p-4 md:border-b-0">
          <h2 className="text-center font-heading font-semibold text-lg md:text-left md:text-2xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-2 p-4 md:border-l">
          {secondaryCta ? (
            <ActionButton action={secondaryCta} variant="secondary" />
          ) : null}
          {primaryCta ? <ActionButton action={primaryCta} /> : null}
        </div>
      </section>
    </MarketingSection>
  );
}
