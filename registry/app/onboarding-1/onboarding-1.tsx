import {
  BrandMark,
  ContinueButton,
  ProductPreview,
  ProfileForm,
} from "@/components/app/onboarding-shared";
import { cn } from "@/lib/utils";

export interface Onboarding1Props {
  className?: string;
}

export function Onboarding1({ className }: Onboarding1Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background px-5 py-6 text-foreground sm:px-10 lg:px-16",
        className
      )}
    >
      <header className="mx-auto flex max-w-[1460px] items-center justify-between">
        <BrandMark />
        <span className="text-muted-foreground text-sm">Step 1 of 6</span>
      </header>
      <section className="mx-auto mt-10 grid min-h-[680px] max-w-[1460px] overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col p-8 sm:p-14 lg:p-20">
          <div className="max-w-xl">
            <h1 className="font-semibold text-3xl tracking-[-0.04em] sm:text-4xl">
              Set up your profile
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Add the details teammates will see across the workspace.
            </p>
            <div className="mt-12">
              <ProfileForm />
            </div>
          </div>
          <ContinueButton className="mt-10" />
        </div>
        <ProductPreview />
      </section>
      <footer className="flex justify-center gap-7 py-8 text-muted-foreground text-sm">
        <span>2026 ReUI</span>
        <span>Privacy Policy</span>
        <span>Support</span>
        <span>Sign out</span>
      </footer>
    </main>
  );
}
