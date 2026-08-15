import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Tone = "accent" | "default" | "success" | "warning";

export function MessageMark() {
  return <span className="font-bold text-success">✣</span>;
}

export function SectionHeading({
  description,
  title,
}: {
  description?: string;
  title: string;
}) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="font-heading font-semibold text-title sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl bg-card text-card-foreground ring-1 ring-foreground/10",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SettingsSwitch({
  defaultChecked,
  label,
}: {
  defaultChecked?: boolean;
  label: string;
}) {
  return <Switch aria-label={label} defaultChecked={defaultChecked} />;
}

export function SelectField({
  defaultValue,
  items,
  label,
}: {
  defaultValue: string;
  items: string[];
  label: string;
}) {
  return (
    <Select
      defaultValue={defaultValue}
      items={items.map((item) => ({ label: item, value: item }))}
    >
      <SelectTrigger aria-label={label} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SettingsTag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <Badge
      className={cn(
        tone === "success" && "border-success/40 bg-success/10 text-success",
        tone === "warning" &&
          "border-amber-700/40 bg-amber-700/10 text-amber-700",
        tone === "accent" &&
          "border-violet-700/40 bg-violet-700/10 text-violet-700"
      )}
      variant="outline"
    >
      {children}
    </Badge>
  );
}

export function PreferenceSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-0">
      <div className="flex items-center justify-between rounded-t-2xl bg-card px-6 py-5 font-semibold text-lg ring-1 ring-foreground/10">
        <span>{title}</span>
        <ChevronDownIcon className="text-muted-foreground" />
      </div>
      <Panel className="rounded-t-none">{children}</Panel>
    </section>
  );
}

export function SecurityGroup({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-0">
      <div className="rounded-t-2xl bg-card px-7 py-6 ring-1 ring-foreground/10">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <Panel className="rounded-t-none">{children}</Panel>
    </section>
  );
}
