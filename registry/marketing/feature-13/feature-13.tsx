import { ShieldIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Feature13Logo {
  alt: string;
  src: string;
}

export interface Feature13Props {
  className?: string;
  description?: string;
  logos?: Feature13Logo[];
  title?: string;
}

const defaultLogos: Feature13Logo[] = [
  { alt: "Vercel", src: "https://svgl.app/library/vercel.svg" },
  { alt: "Slack", src: "https://svgl.app/library/slack.svg" },
  { alt: "Clerk", src: "https://svgl.app/library/clerk-icon-light.svg" },
  { alt: "Linear", src: "https://svgl.app/library/linear.svg" },
  { alt: "Supabase", src: "https://svgl.app/library/supabase.svg" },
  { alt: "Firebase", src: "https://svgl.app/library/firebase.svg" },
];

const DEVELOPER_BAR_IDS = Array.from(
  { length: 32 },
  (_, index) => `developer-bar-${index}`
);

function LogoPill({ src, alt }: Feature13Logo) {
  return (
    <div className="relative flex h-8 items-center rounded-full bg-card px-3 shadow-black/10 shadow-sm ring ring-border">
      <img
        alt={alt}
        className="size-3.5 object-contain dark:invert"
        height={14}
        src={src}
        width={14}
      />
    </div>
  );
}

export function Feature13({
  title = "Powerful features for modern teams",
  description = "Everything you need to build, connect, and scale your integrations effortlessly.",
  logos = defaultLogos,
  className,
}: Feature13Props) {
  const [vercel, slack, clerk, linear, supabase, firebase] = logos;

  return (
    <section className={cn("@container bg-background py-24", className)}>
      <div className="mx-auto max-w-2xl px-6">
        <div>
          <h2 className="text-balance font-display-heading text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-balance text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-12 grid @xl:grid-cols-2 gap-3 *:p-6">
          <Card className="row-span-2 grid grid-rows-subgrid shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">
                Seamless Integrations
              </h3>
              <p className="text-muted-foreground text-sm">
                Connect your favorite tools and services with just a few clicks.
              </p>
            </div>
            <div
              aria-hidden
              className="flex h-44 flex-col justify-between pt-8"
            >
              <div className="relative flex h-10 items-center gap-12 px-6">
                <div className="absolute inset-0 my-auto h-px bg-border" />
                {vercel ? <LogoPill {...vercel} /> : null}
                {slack ? <LogoPill {...slack} /> : null}
              </div>
              <div className="relative flex h-10 items-center justify-between gap-12 pr-6 pl-17">
                <div className="absolute inset-0 my-auto h-px bg-border" />
                {clerk ? <LogoPill {...clerk} /> : null}
                {linear ? <LogoPill {...linear} /> : null}
              </div>
              <div className="relative flex h-10 items-center gap-20 px-8">
                <div className="absolute inset-0 my-auto h-px bg-border" />
                {supabase ? <LogoPill {...supabase} /> : null}
                {firebase ? <LogoPill {...firebase} /> : null}
              </div>
            </div>
          </Card>
          <Card className="row-span-2 grid grid-rows-subgrid overflow-hidden shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Real-time Sync</h3>
              <p className="text-muted-foreground text-sm">
                Keep your data synchronized across all platforms automatically.
              </p>
            </div>
            <div aria-hidden className="relative h-44 translate-y-6">
              <div className="absolute inset-0 mx-auto w-px bg-foreground/15" />
              <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border" />
              <div className="mask-l-from-50% mask-l-to-90% mask-r-from-50% mask-r-to-50% absolute -inset-x-16 top-6 aspect-square rounded-full border border-primary" />
              <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border" />
              <div className="mask-r-from-50% mask-r-to-90% mask-l-from-50% mask-l-to-50% absolute -inset-x-8 top-24 aspect-square rounded-full border border-lime-500" />
            </div>
          </Card>
          <Card className="row-span-2 grid grid-rows-subgrid overflow-hidden shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Developer First</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Built with developers in mind, featuring comprehensive APIs and
                SDKs.
              </p>
            </div>
            <div
              aria-hidden
              className="flex h-44 justify-between pt-12 pb-6 *:h-full *:w-px *:bg-foreground/15"
            >
              {DEVELOPER_BAR_IDS.map((barId, index) => (
                <div
                  className={cn(
                    [4, 9, 13, 18, 23, 31].includes(index) && "bg-primary!"
                  )}
                  key={barId}
                />
              ))}
            </div>
          </Card>
          <Card className="row-span-2 grid grid-rows-subgrid shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium">Enterprise Ready</h3>
              <p className="text-muted-foreground text-sm">
                Scale confidently with enterprise-grade security and
                reliability.
              </p>
            </div>

            <div className="pointer-events-none relative -ml-7 flex size-44 items-center justify-center pt-5">
              <ShieldIcon className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-15" />
              <ShieldIcon className="size-32 stroke-[0.1px]" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
