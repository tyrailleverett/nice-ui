import { MarketingSection } from "@/components/marketing-section";

export interface TermsOfService1Section {
  content: string[];
  id: string;
  title: string;
}

export interface TermsOfService1Props {
  className?: string;
  companyName?: string;
  contactHref?: string;
  effectiveDate?: string;
  intro?: string;
  sections?: TermsOfService1Section[];
  title?: string;
  variant?: "compact" | "default" | "standard" | "wide";
}

const defaultSections: TermsOfService1Section[] = [
  {
    content: [
      "These Terms of Service explain the rules for using our website and services. By accessing the service, you agree to follow these terms.",
    ],
    id: "acceptance",
    title: "Acceptance of terms",
  },
  {
    content: [
      "You may use the service only for lawful purposes and in a way that does not interfere with other people’s access. Keep your account details accurate and protect any credentials associated with your account.",
      "If you use the service on behalf of an organization, you confirm that you have authority to accept these terms for that organization.",
    ],
    id: "using-the-service",
    title: "Using the service",
  },
  {
    content: [
      "You keep ownership of the content you provide. You give us the limited permission needed to host, process, and display that content so we can operate and improve the service.",
      "Our service, branding, and underlying technology remain our property. These terms do not transfer any ownership rights to you.",
    ],
    id: "content-and-ownership",
    title: "Content and ownership",
  },
  {
    content: [
      "We may update, suspend, or discontinue parts of the service when necessary to maintain security, comply with law, or improve the product. We will provide reasonable notice for material changes when practical.",
    ],
    id: "changes-and-availability",
    title: "Changes and availability",
  },
  {
    content: [
      "To the extent permitted by law, the service is provided as is, without warranties that it will always be available, uninterrupted, or error-free. We are not liable for indirect or consequential losses arising from your use of the service.",
    ],
    id: "disclaimers",
    title: "Disclaimers and limits",
  },
  {
    content: [
      "We may suspend or end access if these terms are violated or if continued access creates a security or legal risk. You may stop using the service at any time.",
      "Questions about these terms can be sent to the contact address below.",
    ],
    id: "termination-and-contact",
    title: "Ending the agreement",
  },
];

export function TermsOfService1({
  className,
  companyName = "Your Company",
  contactHref = "mailto:legal@example.com",
  effectiveDate = "January 1, 2025",
  intro = "A plain-language starting point for the agreement between you and our team.",
  sections = defaultSections,
  title = "Terms of Service",
  variant = "default",
}: TermsOfService1Props) {
  if (variant === "standard") {
    return (
      <MarketingSection className={className}>
        <article className="bg-background px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <header className="border-border border-b pb-10">
              <h1 className="font-display-heading text-4xl text-primary leading-tight tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-muted-foreground text-sm">
                Last updated {effectiveDate}
              </p>
              <p className="mt-8 text-base text-muted-foreground leading-7">
                {intro}
              </p>
            </header>
            <div className="space-y-10 pt-10">
              {sections.map((section) => (
                <section
                  className="scroll-mt-8"
                  id={section.id}
                  key={section.id}
                >
                  <h2 className="font-semibold text-foreground text-xl tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-4 text-muted-foreground text-sm leading-7">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <footer className="mt-12 border-border border-t pt-6 text-muted-foreground text-sm">
              Questions?{" "}
              <a
                className="text-foreground underline underline-offset-4"
                href={contactHref}
              >
                Contact legal
              </a>
              .
            </footer>
          </div>
        </article>
      </MarketingSection>
    );
  }

  if (variant === "compact") {
    return (
      <MarketingSection className={className}>
        <article className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <header className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
                A quick read
              </p>
              <h1 className="mt-5 font-display-heading text-4xl text-primary leading-[1.05] tracking-tight md:text-6xl">
                {title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {intro}
              </p>
            </header>
            <dl className="mx-auto mt-10 grid max-w-3xl border-border border-y py-5 text-center text-sm sm:grid-cols-3">
              <div className="border-border sm:border-r">
                <dt className="text-muted-foreground">Effective date</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {effectiveDate}
                </dd>
              </div>
              <div className="mt-4 border-border sm:mt-0 sm:border-r">
                <dt className="text-muted-foreground">Applies to</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {companyName}
                </dd>
              </div>
              <div className="mt-4 sm:mt-0">
                <dt className="text-muted-foreground">Questions</dt>
                <dd className="mt-1 font-medium text-foreground">
                  <a
                    className="underline underline-offset-4 hover:text-foreground/70"
                    href={contactHref}
                  >
                    Contact legal
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {sections.map((section, index) => (
                <section
                  className="scroll-mt-8 border-border border-t pt-5"
                  id={section.id}
                  key={section.id}
                >
                  <p className="font-mono text-muted-foreground text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-semibold text-foreground text-xl tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-muted-foreground text-sm leading-7">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </MarketingSection>
    );
  }

  if (variant === "wide") {
    return (
      <MarketingSection className={className}>
        <article className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(18rem,0.8fr)_1.6fr]">
            <aside className="flex min-h-[32rem] flex-col justify-between p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen">
              <div>
                <p className="font-mono text-primary-foreground/60 text-xs uppercase tracking-[0.18em]">
                  Terms
                </p>
                <h1 className="mt-6 font-display-heading text-5xl leading-[0.95] tracking-tight md:text-7xl">
                  {title}
                </h1>
                <p className="mt-6 max-w-sm text-primary-foreground/70 text-sm leading-7">
                  {intro}
                </p>
              </div>
              <nav aria-label="Terms of Service contents" className="mt-12">
                <p className="mb-4 font-medium text-sm">Navigate</p>
                <ol className="space-y-2 text-primary-foreground/60 text-sm">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        className="hover:text-primary-foreground"
                        href={`#${section.id}`}
                      >
                        <span className="mr-3 font-mono text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
            <div className="bg-background px-6 py-16 text-foreground md:px-12 md:py-20 lg:px-20">
              <dl className="grid gap-6 border-border border-b pb-8 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-muted-foreground">Effective date</dt>
                  <dd className="mt-1 font-medium">{effectiveDate}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Applies to</dt>
                  <dd className="mt-1 font-medium">{companyName}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Questions</dt>
                  <dd className="mt-1 font-medium">
                    <a
                      className="underline underline-offset-4 hover:text-foreground/70"
                      href={contactHref}
                    >
                      Contact legal
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="divide-y divide-border">
                {sections.map((section, index) => (
                  <section
                    className="scroll-mt-8 py-10 first:pt-0 last:pb-0"
                    id={section.id}
                    key={section.id}
                  >
                    <div className="flex gap-5">
                      <span className="pt-1 font-mono text-muted-foreground text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-semibold text-foreground text-xl tracking-tight">
                          {section.title}
                        </h2>
                        <div className="mt-4 space-y-4 text-muted-foreground text-sm leading-7">
                          {section.content.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </article>
      </MarketingSection>
    );
  }

  return (
    <MarketingSection className={className}>
      <article className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl border-border border-b pb-10 md:pb-14">
            <h1 className="font-display-heading text-4xl text-primary leading-[1.05] tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {intro}
            </p>
            <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Effective date</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {effectiveDate}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Applies to</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {companyName}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Questions</dt>
                <dd className="mt-1 font-medium text-foreground">
                  <a
                    className="underline underline-offset-4 hover:text-foreground/70"
                    href={contactHref}
                  >
                    Contact legal
                  </a>
                </dd>
              </div>
            </dl>
          </header>

          <div className="grid gap-12 pt-12 lg:grid-cols-[12rem_minmax(0,42rem)] lg:gap-20">
            <nav
              aria-label="Terms of Service contents"
              className="lg:sticky lg:top-8 lg:self-start"
            >
              <p className="mb-4 font-medium text-foreground text-sm">
                On this page
              </p>
              <ol className="space-y-3 border-border border-l pl-4 text-muted-foreground text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      className="hover:text-foreground"
                      href={`#${section.id}`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-12">
              {sections.map((section) => (
                <section
                  className="scroll-mt-8"
                  id={section.id}
                  key={section.id}
                >
                  <h2 className="font-semibold text-foreground text-xl tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-muted-foreground text-sm leading-7">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>
    </MarketingSection>
  );
}
