import type { FormEvent, ReactNode } from "react";

import {
  defaultLoginLegalLinks,
  LoginForm,
  type LoginFormLink,
  LoginLegalNav,
} from "@/components/login-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Login1Avatar {
  alt: string;
  fallback: string;
  src: string;
}

export interface Login1Image {
  alt: string;
  src: string;
}

export interface Login1Testimonial {
  avatar?: Login1Avatar;
  name?: string;
  quote?: ReactNode;
  role?: string;
}

export interface Login1TrustedByLogo {
  alt: string;
  label?: string;
  src: string;
}

export interface Login1TrustedBy {
  logos: Login1TrustedByLogo[];
  title: string;
}

export interface Login1Props {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  googleLabel?: string;
  legalLinks?: LoginFormLink[];
  logo?: ReactNode;
  onGoogleContinue?: () => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  panelImage?: Login1Image;
  passwordPlaceholder?: string;
  primaryAction?: string;
  showStrengthIndicator?: boolean;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  testimonial?: Login1Testimonial;
  title?: string;
  trustedBy?: Login1TrustedBy | null;
}

const defaultTestimonial: Login1Testimonial = {
  avatar: {
    alt: "shadcn profile picture",
    fallback: "SC",
    src: "https://github.com/shadcn.png",
  },
  name: "Shadcn",
  quote: "Looks really good. Did you design in code or Figma first?",
  role: "Creator of shadcn/ui",
};

const defaultPanelImage: Login1Image = {
  alt: "Starry night sky over a desert horizon",
  src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2000",
};

const defaultTrustedBy: Login1TrustedBy = {
  logos: [
    {
      alt: "OpenAI",
      src: "https://storage.efferd.com/logo/openai-wordmark.svg",
    },
    {
      alt: "Stripe",
      src: "https://storage.efferd.com/logo/stripe-wordmark.svg",
    },
    {
      alt: "Supabase",
      src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
    },
    {
      alt: "Slack",
      label: "slack",
      src: "https://cdn.simpleicons.org/slack/ffffff",
    },
  ],
  title: "Trusted by leading teams",
};

export function Login1({
  className,
  description,
  emailPlaceholder,
  googleLabel,
  legalLinks = defaultLoginLegalLinks,
  logo,
  onGoogleContinue,
  onSubmit,
  panelImage = defaultPanelImage,
  passwordPlaceholder,
  primaryAction,
  showStrengthIndicator,
  signInHref,
  signInLabel,
  signInPrompt,
  testimonial = defaultTestimonial,
  title,
  trustedBy = defaultTrustedBy,
}: Login1Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="grid min-h-svh lg:grid-cols-[3fr_2fr]">
        <div className="relative flex min-h-svh flex-col px-6 py-8 md:px-10">
          <div className="flex flex-1 items-center justify-center">
            <LoginForm
              description={description}
              emailPlaceholder={emailPlaceholder}
              googleLabel={googleLabel}
              idPrefix="login-1"
              logo={logo}
              onGoogleContinue={onGoogleContinue}
              onSubmit={onSubmit}
              passwordPlaceholder={passwordPlaceholder}
              primaryAction={primaryAction}
              showStrengthIndicator={showStrengthIndicator}
              signInHref={signInHref}
              signInLabel={signInLabel}
              signInPrompt={signInPrompt}
              title={title}
            />
          </div>
          <LoginLegalNav links={legalLinks} />
        </div>

        <div className="relative hidden lg:block">
          <div className="relative h-full min-h-svh overflow-hidden">
            <img
              alt={panelImage.alt}
              className="absolute inset-0 size-full object-cover"
              height={1600}
              src={panelImage.src}
              width={1200}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-black/35" />

            <div className="relative flex h-full flex-col items-center justify-center px-12 text-center text-white">
              {testimonial.quote ? (
                <figure className="max-w-md space-y-6">
                  <blockquote className="text-balance font-medium text-lg leading-snug">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="flex flex-col items-center gap-3">
                    {testimonial.avatar ? (
                      <Avatar className="size-10">
                        <AvatarImage
                          alt={testimonial.avatar.alt}
                          src={testimonial.avatar.src}
                        />
                        <AvatarFallback>
                          {testimonial.avatar.fallback}
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                    <div className="space-y-0.5">
                      {testimonial.name ? (
                        <cite className="block font-medium not-italic">
                          {testimonial.name}
                        </cite>
                      ) : null}
                      {testimonial.role ? (
                        <p className="text-sm text-white/70">
                          {testimonial.role}
                        </p>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              ) : null}
            </div>

            {trustedBy ? (
              <div className="absolute inset-x-8 bottom-8 text-left md:inset-x-12 md:bottom-10">
                <p className="mb-5 font-medium text-sm text-white/80">
                  {trustedBy.title}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  {trustedBy.logos.map((trustedLogo) => (
                    <span
                      className="flex items-center gap-1.5 text-white"
                      key={trustedLogo.alt}
                    >
                      <img
                        alt={trustedLogo.alt}
                        className={cn(
                          "h-5 w-auto object-contain",
                          !trustedLogo.label && "max-w-24 brightness-0 invert"
                        )}
                        height={20}
                        loading="lazy"
                        src={trustedLogo.src}
                        width={trustedLogo.label ? 20 : 96}
                      />
                      {trustedLogo.label ? (
                        <span className="font-semibold text-xl tracking-tight">
                          {trustedLogo.label}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
