import { MarketingSection } from "@/components/marketing-section";
export interface LogoCloud4Logo {
  name: string;
  src?: string;
}
export interface LogoCloud4Props {
  className?: string;
  logos?: LogoCloud4Logo[];
  title?: string;
}
const defaultLogos: LogoCloud4Logo[] = [
  "Arcade",
  "Northstar",
  "Field Notes",
  "Relay",
  "Common Room",
  "Orbit",
].map((name) => ({ name }));
export function LogoCloud4({
  title = "Trusted by teams with standards",
  logos = defaultLogos,
  className,
}: LogoCloud4Props) {
  return (
    <MarketingSection className={className}>
      <section
        aria-label="Customers"
        className="space-y-8 p-4 text-center md:p-8"
      >
        <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
          {title}
        </p>
        <div className="grid grid-cols-2 border-y sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              className="flex h-20 items-center justify-center border-border border-b px-3 font-display-heading text-lg text-muted-foreground grayscale last:border-b-0 sm:border-r sm:nth-[3n]:border-r-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
              key={logo.name}
            >
              {logo.src ? (
                <img
                  alt={logo.name}
                  className="max-h-7 max-w-28 object-contain"
                  height={28}
                  src={logo.src}
                  width={112}
                />
              ) : (
                logo.name
              )}
            </div>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
