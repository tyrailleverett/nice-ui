import {
  BrandMark,
  CloseButton,
  ContinueButton,
  ProfileForm,
} from "@/components/app/onboarding-shared";
import { cn } from "@/lib/utils";

export interface Onboarding4Props {
  className?: string;
}

export function Onboarding4({ className }: Onboarding4Props) {
  return (
    <main
      className={cn(
        "grid min-h-screen place-items-center bg-background p-5 text-foreground sm:p-10",
        className
      )}
    >
      <section className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between p-8 sm:p-12">
          <div>
            <BrandMark className="mb-10 lg:hidden" />
            <h1 className="font-semibold text-2xl tracking-[-0.03em] sm:text-3xl">
              Set up your profile
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Add the details teammates will see across the workspace.
            </p>
          </div>
          <CloseButton />
        </div>
        <div className="px-8 pb-12 sm:px-12">
          <ProfileForm compact />
        </div>
        <div className="flex items-center justify-between border-border border-t bg-muted/10 px-8 py-5 sm:px-12">
          <div aria-label="Step 1 of 6" className="flex gap-2" role="status">
            {["one", "two", "three", "four", "five", "six"].map(
              (step, index) => (
                <span
                  className={
                    index === 0
                      ? "size-2.5 rounded-full bg-foreground"
                      : "size-2.5 rounded-full bg-muted"
                  }
                  key={step}
                />
              )
            )}
          </div>
          <ContinueButton icon />
        </div>
      </section>
    </main>
  );
}
