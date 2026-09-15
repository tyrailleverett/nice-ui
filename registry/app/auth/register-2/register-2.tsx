import { type ComponentProps, type FormEvent, type ReactNode, useCallback } from "react";

import { LogoIcon } from "@/components/logo";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Register2Props {
  brandIcon?: ReactNode;
  brandName?: string;
  className?: string;
  dividerLabel?: string;
  emailPlaceholder?: string;
  githubLabel?: string;
  googleLabel?: string;
  namePlaceholder?: string;
  onGithubContinue?: () => void;
  onGoogleContinue?: () => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  passwordPlaceholder?: string;
  primaryAction?: string;
  showStrengthIndicator?: boolean;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  subtitle?: string;
  title?: string;
}

const defaultBrandIcon = <LogoIcon aria-hidden="true" className="size-5 text-foreground" />;

function GoogleIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function OrDivider({ label }: { label: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-card px-3 text-muted-foreground text-xs">{label}</span>
      </div>
    </div>
  );
}

export function Register2({
  brandIcon = defaultBrandIcon,
  brandName = "Auth",
  className,
  dividerLabel = "OR REGISTER WITH EMAIL",
  emailPlaceholder = "enter email...",
  githubLabel = "Sign up with GitHub",
  googleLabel = "Sign up with Google",
  namePlaceholder = "John Doe",
  onGithubContinue,
  onGoogleContinue,
  onSubmit,
  passwordPlaceholder = "create password...",
  primaryAction = "Create Account",
  showStrengthIndicator = true,
  signInHref = "#",
  signInLabel = "Sign in",
  signInPrompt = "Already have an account?",
  subtitle = "Join thousands of teams building with Nice UI",
  title = "Create an Account",
}: Register2Props) {
  const nameId = "register-2-name";
  const emailId = "register-2-email";
  const passwordId = "register-2-password";

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit],
  );

  return (
    <Card className={cn("w-full max-w-[27rem]", className)}>
      <CardHeader className="items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">{brandIcon}</span>
          <span className="font-heading font-semibold text-lg">{brandName}</span>
        </div>
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="text-balance text-muted-foreground text-sm">{subtitle}</p>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Button
              className="h-10 w-full"
              onClick={onGoogleContinue}
              type="button"
              variant="outline"
            >
              <GoogleIcon className="size-4" />
              {googleLabel}
            </Button>
            <Button
              className="h-10 w-full"
              onClick={onGithubContinue}
              type="button"
              variant="outline"
            >
              <GithubIcon aria-hidden="true" className="size-4" />
              {githubLabel}
            </Button>
          </div>

          <OrDivider label={dividerLabel} />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Full Name</Label>
              <InputGroup className="h-10">
                <InputGroupInput
                  autoComplete="name"
                  className="h-10"
                  id={nameId}
                  name="name"
                  placeholder={namePlaceholder}
                  required
                  type="text"
                />
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor={emailId}>Email</Label>
              <InputGroup className="h-10">
                <InputGroupInput
                  autoComplete="email"
                  className="h-10"
                  id={emailId}
                  name="email"
                  placeholder={emailPlaceholder}
                  required
                  type="email"
                />
              </InputGroup>
            </div>
            <PasswordInput
              autoComplete="new-password"
              id={passwordId}
              placeholder={passwordPlaceholder}
              showStrengthIndicator={showStrengthIndicator}
            />
          </div>

          <Button className="h-10 w-full" type="submit">
            {primaryAction}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t text-muted-foreground text-sm">
        {signInPrompt}{" "}
        <a
          className="pl-1 font-medium text-foreground underline-offset-4 hover:underline"
          href={signInHref}
        >
          {signInLabel}
        </a>
      </CardFooter>
    </Card>
  );
}
