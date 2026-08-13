import { ArrowRightIcon, AtSignIcon } from "lucide-react";
import { type FormEvent, type ReactNode, useCallback } from "react";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export interface Cta5Avatar {
  alt: string;
  src: string;
}

export interface Cta5Props {
  attribution?: ReactNode;
  avatars?: Cta5Avatar[];
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  onSubscribe?: (email: string) => void;
  subscribeLabel?: string;
  title?: string;
}

const defaultAvatars: Cta5Avatar[] = [
  {
    alt: "Avatar 01",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=72",
  },
  {
    alt: "Avatar 02",
    src: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?q=80&w=72",
  },
  {
    alt: "Avatar 03",
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=72",
  },
  {
    alt: "Avatar 04",
    src: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=72",
  },
];

export function Cta5({
  title = "Subscribe to our newsletter",
  description = "Get the latest updates and insights delivered right to your inbox.",
  emailPlaceholder = "Enter your email",
  subscribeLabel = "Subscribe",
  onSubscribe,
  attribution = (
    <>
      Written by{" "}
      <span className="font-medium text-foreground">real humans</span> (we
      swear).
    </>
  ),
  avatars = defaultAvatars,
  className,
}: Cta5Props) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "");
      onSubscribe?.(email);
    },
    [onSubscribe]
  );

  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x px-2 py-8 md:px-4",
        className
      )}
    >
      <FullWidthDivider position="top" />

      <div className="space-y-1">
        <h2 className="text-center font-semibold text-2xl tracking-tight md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <form
        className="flex items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <InputGroup className="max-w-[280px] bg-card">
          <InputGroupInput
            name="email"
            placeholder={emailPlaceholder}
            type="email"
          />
          <InputGroupAddon>
            <AtSignIcon data-icon="inline-start" />
          </InputGroupAddon>
        </InputGroup>

        <Button type="submit">
          {subscribeLabel} <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </form>
      {attribution || avatars.length ? (
        <div className="flex items-center justify-center gap-2">
          {attribution ? (
            <p className="text-muted-foreground text-sm">{attribution}</p>
          ) : null}
          {avatars.length ? (
            <div className="flex -space-x-[0.45rem] *:rounded-full *:ring-2 *:ring-background">
              {avatars.map((avatar) => (
                <img
                  alt={avatar.alt}
                  height={24}
                  key={avatar.src}
                  src={avatar.src}
                  width={24}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <FullWidthDivider position="bottom" />
    </section>
  );
}
