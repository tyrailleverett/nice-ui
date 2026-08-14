import {
  BrandMark,
  ContinueButton,
  ProfileForm,
} from "@/components/app/onboarding-shared";
import { cn } from "@/lib/utils";

export interface Onboarding5Props {
  className?: string;
}

export function Onboarding5({ className }: Onboarding5Props) {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground",
        className
      )}
    >
      <header className="flex h-20 items-center justify-between border-border border-b px-6 sm:px-10">
        <BrandMark />
        <div className="flex items-center gap-5">
          <div className="h-2 w-44 overflow-hidden rounded-full bg-muted sm:w-80">
            <div className="h-full w-1/8 rounded-full bg-foreground" />
          </div>
          <span className="text-muted-foreground text-sm">1 / 8</span>
        </div>
      </header>
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-20 sm:px-10 sm:py-28">
        <h1 className="font-semibold text-3xl tracking-[-0.04em] sm:text-4xl">
          Set up your profile
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Add the details teammates will see across the workspace.
        </p>
        <div className="mt-16">
          <ProfileForm />
        </div>
      </section>
      <footer className="flex justify-end border-border border-t px-6 py-6 sm:px-10">
        <ContinueButton>Next step</ContinueButton>
      </footer>
    </main>
  );
}
