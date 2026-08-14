import {
  BrandMark,
  ContinueButton,
  ProfileForm,
  StepRail,
} from "@/components/app/onboarding-shared";
import { cn } from "@/lib/utils";

export interface Onboarding3Props {
  className?: string;
}

export function Onboarding3({ className }: Onboarding3Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-8",
        className
      )}
    >
      <div className="grid min-h-[calc(100vh-2rem)] grid-cols-1 overflow-hidden rounded-2xl border border-border sm:min-h-[calc(100vh-4rem)] lg:grid-cols-[420px_1fr]">
        <aside className="relative flex flex-col overflow-hidden bg-muted/10 p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,color-mix(in_oklch,var(--primary)_35%,transparent)_1px,transparent_0)] [background-size:28px_28px]" />
          <BrandMark className="relative" />
          <div className="relative mt-auto mb-auto max-w-[260px] pt-16">
            <StepRail dotted />
          </div>
          <div className="relative flex justify-between text-muted-foreground text-xs">
            <span>Terms of Service</span>
            <span>Help Center</span>
          </div>
        </aside>
        <section className="flex flex-col p-8 sm:p-16 lg:p-24">
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
            <h1 className="font-semibold text-3xl tracking-[-0.04em] sm:text-4xl">
              Set up your profile
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Add the details teammates will see across the workspace.
            </p>
            <div className="mt-12">
              <ProfileForm jobTitle="Product Lead" />
            </div>
            <ContinueButton className="mt-10" />
          </div>
        </section>
      </div>
    </main>
  );
}
