import { MailIcon, UserIcon } from "lucide-react";
import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useCallback,
} from "react";

import { LogoIcon } from "@/components/logo";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface RegisterFormLink {
  href: string;
  label: string;
}

export interface RegisterFormProps {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  googleLabel?: string;
  idPrefix?: string;
  logo?: ReactNode;
  namePlaceholder?: string;
  onGoogleContinue?: () => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  passwordPlaceholder?: string;
  primaryAction?: string;
  showStrengthIndicator?: boolean;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  title?: string;
}

export const defaultRegisterLegalLinks: RegisterFormLink[] = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Help" },
];

const defaultLogo = (
  <LogoIcon aria-hidden="true" className="mb-8 size-8 text-foreground" />
);

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

function OrDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-3 text-muted-foreground text-xs">
          or
        </span>
      </div>
    </div>
  );
}

export function RegisterLegalNav({
  className,
  links = defaultRegisterLegalLinks,
}: {
  className?: string;
  links?: RegisterFormLink[];
}) {
  if (!links.length) {
    return null;
  }

  return (
    <nav
      aria-label="Legal"
      className={cn(
        "flex items-center justify-center gap-5 pt-8 text-muted-foreground text-sm",
        className
      )}
    >
      {links.map((link) => (
        <a className="hover:text-foreground" href={link.href} key={link.label}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function RegisterForm({
  className,
  description = "Create your account",
  emailPlaceholder = "Enter your email",
  googleLabel = "Continue with Google",
  idPrefix = "register",
  logo = defaultLogo,
  namePlaceholder = "Enter your name",
  onGoogleContinue,
  onSubmit,
  passwordPlaceholder = "Enter your password",
  primaryAction = "Create account",
  showStrengthIndicator = true,
  signInHref = "#",
  signInLabel = "Sign in",
  signInPrompt = "Already have an account?",
  title = "Create account",
}: RegisterFormProps) {
  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;
  const passwordId = `${idPrefix}-password`;

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit]
  );

  return (
    <div className={cn("w-full max-w-sm", className)}>
      {logo}
      <div className="space-y-1">
        <h1 className="font-semibold text-3xl tracking-tight">{title}</h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Button
          className="h-10 w-full"
          onClick={onGoogleContinue}
          type="button"
          variant="outline"
        >
          <GoogleIcon className="size-4" />
          {googleLabel}
        </Button>

        <OrDivider />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={nameId}>Name</Label>
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
              <InputGroupAddon>
                <UserIcon aria-hidden="true" data-icon="inline-start" />
              </InputGroupAddon>
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
              <InputGroupAddon>
                <MailIcon aria-hidden="true" data-icon="inline-start" />
              </InputGroupAddon>
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

        <p className="text-center text-muted-foreground text-sm">
          {signInPrompt}{" "}
          <a className="text-primary hover:text-primary/80" href={signInHref}>
            {signInLabel}
          </a>
        </p>
      </form>
    </div>
  );
}
