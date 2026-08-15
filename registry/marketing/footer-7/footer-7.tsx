import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useCallback,
} from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/github_light.svg"
        width="100%"
      />
    </svg>
  );
}

export function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image height="100%" href="https://svgl.app/library/x.svg" width="100%" />
    </svg>
  );
}

export function LinkedinIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/linkedin.svg"
        width="100%"
      />
    </svg>
  );
}

export interface Footer7Link {
  href: string;
  label: string;
}

export interface Footer7LinkGroup {
  links: Footer7Link[];
  title: string;
}

export interface Footer7SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export type Footer7Theme = "system" | "light" | "dark";

export interface Footer7Props {
  className?: string;
  copyright?: string;
  emailPlaceholder?: string;
  groups: Footer7LinkGroup[];
  newsletterTitle?: string;
  onSubscribe?: (email: string) => void;
  onThemeChange?: (theme: Footer7Theme) => void;
  socialLinks?: Footer7SocialLink[];
  statusLabel?: string;
  subscribeLabel?: string;
  theme?: Footer7Theme;
}

function ThemeSwitcher({
  theme = "system",
  onThemeChange,
}: {
  theme?: Footer7Theme;
  onThemeChange?: (theme: Footer7Theme) => void;
}) {
  const options: { value: Footer7Theme; label: string; icon: ReactNode }[] = [
    { icon: <MonitorIcon />, label: "System", value: "system" },
    { icon: <SunIcon />, label: "Light", value: "light" },
    { icon: <MoonIcon />, label: "Dark", value: "dark" },
  ];

  const handleValueChange = useCallback(
    ([value]: string[]) => {
      if (value === "system" || value === "light" || value === "dark") {
        onThemeChange?.(value);
      }
    },
    [onThemeChange]
  );

  return (
    <ToggleGroup
      className="rounded-full border p-0.5"
      onValueChange={handleValueChange}
      spacing={0}
      value={[theme]}
      variant="solid"
    >
      {options.map((option) => (
        <ToggleGroupItem
          aria-label={option.label}
          className="size-7 rounded-full p-0"
          key={option.value}
          value={option.value}
        >
          {option.icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function Footer7({
  groups,
  socialLinks,
  copyright = `Copyright © ${new Date().getFullYear()} Nice UI, Inc.`,
  newsletterTitle = "Get updates",
  emailPlaceholder = "Your email",
  subscribeLabel = "Subscribe",
  onSubscribe,
  statusLabel = "operational",
  theme = "system",
  onThemeChange,
  className,
}: Footer7Props) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      onSubscribe?.(String(formData.get("email") ?? ""));
    },
    [onSubscribe]
  );

  return (
    <MarketingSection as="footer" className={className}>
      <div className="bg-background text-foreground">
        <div className="grid border-t md:grid-cols-3 md:divide-x">
          {groups.map((group) => (
            <div
              className="border-b px-6 py-8 last:border-b-0 md:border-b-0"
              key={group.title}
            >
              <h3 className="mb-4 font-semibold text-sm">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-muted-foreground text-sm hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid border-t md:grid-cols-3 md:divide-x">
          <div className="flex flex-col justify-between gap-6 border-b px-6 py-8 md:border-b-0">
            {socialLinks?.length ? (
              <div className="flex items-center gap-2">
                {socialLinks.map((item) => (
                  <Button
                    key={item.label}
                    nativeButton={false}
                    render={<a aria-label={item.label} href={item.href} />}
                    size="icon"
                    variant="outline"
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>
            ) : null}
            <p className="text-muted-foreground text-xs">{copyright}</p>
          </div>

          <div className="flex flex-col justify-center gap-3 border-b px-6 py-8 md:border-b-0">
            <p className="font-semibold text-sm">{newsletterTitle}</p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <Input
                className="h-9"
                name="email"
                placeholder={emailPlaceholder}
                type="email"
              />
              <Button className="h-9" type="submit" variant="outline">
                {subscribeLabel}
              </Button>
            </form>
          </div>

          <div className="flex items-end justify-between gap-4 px-6 py-8">
            <p className="inline-flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-emerald-400" />
              {statusLabel}
            </p>
            <ThemeSwitcher onThemeChange={onThemeChange} theme={theme} />
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
