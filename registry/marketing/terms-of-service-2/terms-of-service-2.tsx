import { MarketingSection } from "@/components/marketing-section";
export interface TermsOfService2Props {
  className?: string;
  company?: string;
  updated?: string;
}
export function TermsOfService2({
  company = "Nice UI, Inc.",
  updated = "September 2, 2026",
  className,
}: TermsOfService2Props) {
  return (
    <MarketingSection className={className}>
      <article className="grid gap-10 p-4 md:grid-cols-[12rem_1fr] md:p-8">
        <nav
          aria-label="Terms contents"
          className="h-fit space-y-3 text-sm md:sticky md:top-6"
        >
          <p className="font-mono text-muted-foreground text-xs uppercase">
            Contents
          </p>
          <a
            className="block text-foreground underline underline-offset-4"
            href="#use"
          >
            Using Nice UI
          </a>
          <a
            className="block text-muted-foreground hover:text-foreground"
            href="#accounts"
          >
            Accounts
          </a>
          <a
            className="block text-muted-foreground hover:text-foreground"
            href="#contact"
          >
            Contact
          </a>
        </nav>
        <div className="max-w-2xl space-y-8">
          <header className="space-y-3 border-b pb-8">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
              Legal / Terms
            </p>
            <h1 className="font-display-heading text-4xl sm:text-5xl">
              Terms of service
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated {updated}
            </p>
          </header>
          <section className="space-y-3" id="use">
            <h2 className="font-display-heading text-2xl">Using Nice UI</h2>
            <p className="text-muted-foreground text-sm leading-7">
              You may use, adapt, and ship the components according to the
              license that accompanies the package. Keep your projects lawful,
              secure, and respectful of the people who use them.
            </p>
          </section>
          <section className="space-y-3" id="accounts">
            <h2 className="font-display-heading text-2xl">
              Accounts and responsibility
            </h2>
            <p className="text-muted-foreground text-sm leading-7">
              Keep account credentials private and tell us promptly about
              suspected misuse. You are responsible for the content you publish
              and for checking that your implementation meets the laws and
              accessibility needs of your audience.
            </p>
          </section>
          <section className="space-y-3" id="contact">
            <h2 className="font-display-heading text-2xl">Contact</h2>
            <p className="text-muted-foreground text-sm leading-7">
              Questions about these terms can be sent to{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:legal@niceui.dev"
              >
                legal@niceui.dev
              </a>
              . We may update these terms as the service changes and will post
              the new effective date here.
            </p>
          </section>
          <p className="border-t pt-6 text-muted-foreground text-xs">
            {company} · Please read the full license included with your
            installation.
          </p>
        </div>
      </article>
    </MarketingSection>
  );
}
