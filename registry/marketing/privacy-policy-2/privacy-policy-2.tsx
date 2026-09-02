import { MarketingSection } from "@/components/marketing-section";
export interface PrivacyPolicy2Props {
  className?: string;
  company?: string;
  updated?: string;
}
export function PrivacyPolicy2({
  company = "Nice UI, Inc.",
  updated = "September 2, 2026",
  className,
}: PrivacyPolicy2Props) {
  return (
    <MarketingSection className={className}>
      <article className="grid gap-10 p-4 md:grid-cols-[12rem_1fr] md:p-8">
        <nav
          aria-label="Policy contents"
          className="h-fit space-y-3 text-sm md:sticky md:top-6"
        >
          <p className="font-mono text-muted-foreground text-xs uppercase">
            Contents
          </p>
          <a
            className="block text-foreground underline underline-offset-4"
            href="#overview"
          >
            Overview
          </a>
          <a
            className="block text-muted-foreground hover:text-foreground"
            href="#data"
          >
            Data we collect
          </a>
          <a
            className="block text-muted-foreground hover:text-foreground"
            href="#rights"
          >
            Your rights
          </a>
        </nav>
        <div className="max-w-2xl space-y-8">
          <header className="space-y-3 border-b pb-8">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
              Legal / Privacy
            </p>
            <h1 className="font-display-heading text-4xl sm:text-5xl">
              Privacy policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated {updated}
            </p>
          </header>
          <section className="space-y-3" id="overview">
            <h2 className="font-display-heading text-2xl">Overview</h2>
            <p className="text-muted-foreground text-sm leading-7">
              This policy explains how {company} handles information when you
              browse Nice UI, use our documentation, or contact the team. We
              collect only what we need to provide, secure, and improve the
              service.
            </p>
          </section>
          <section className="space-y-3" id="data">
            <h2 className="font-display-heading text-2xl">Data we collect</h2>
            <p className="text-muted-foreground text-sm leading-7">
              We may receive account details, messages you send us, device
              information, and usage events. We do not sell personal
              information. Service providers process data only to perform work
              for us under appropriate agreements.
            </p>
          </section>
          <section className="space-y-3" id="rights">
            <h2 className="font-display-heading text-2xl">Your rights</h2>
            <p className="text-muted-foreground text-sm leading-7">
              Depending on where you live, you may request access, correction,
              deletion, or a copy of your information. Email{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:privacy@niceui.dev"
              >
                privacy@niceui.dev
              </a>{" "}
              and we will respond within a reasonable time.
            </p>
          </section>
        </div>
      </article>
    </MarketingSection>
  );
}
