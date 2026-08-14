/* biome-ignore-all lint/performance/noJsxPropsBind: Key rows close over copy, reveal, rotate, and revoke actions. */
import {
  BracesIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  RefreshCwIcon,
  ShieldAlertIcon,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  FormHeading,
  FormPage,
  StatusBadge,
  type StatusTone,
} from "@/components/app/forms-shared";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type KeyStatus = "Active" | "Rotating" | "Restricted";
interface ApiKey {
  id: string;
  lastUsed: string;
  meta: string;
  name: string;
  prefix: string;
  revealable: boolean;
  secret: string;
  status: KeyStatus;
}

const STACKS = ["Next.js", "Vite", "Laravel"] as const;

const INITIAL_KEYS: ApiKey[] = [
  {
    id: "pk-live",
    lastUsed: "Last used 4m ago",
    meta: "Frontend Platform • Production • Next.js",
    name: "Browser publishable key",
    prefix: "pk_live",
    revealable: false,
    secret: "ui7xM9k2Qd2a",
    status: "Active",
  },
  {
    id: "sk-live",
    lastUsed: "Last used 12m ago",
    meta: "API Platform • Production • Next.js",
    name: "Server secret key",
    prefix: "sk_live",
    revealable: true,
    secret: "n4rthst4r8c9",
    status: "Active",
  },
  {
    id: "sk-rotate",
    lastUsed: "Last used 1h ago",
    meta: "API Platform • Production • Next.js",
    name: "Webhook signing secret",
    prefix: "whsec",
    revealable: true,
    secret: "k3yR0tat3now",
    status: "Rotating",
  },
  {
    id: "pk-restricted",
    lastUsed: "Last used 3d ago",
    meta: "Frontend Platform • Preview • Vite",
    name: "Preview publishable key",
    prefix: "pk_test",
    revealable: false,
    secret: "prev9viewQd",
    status: "Restricted",
  },
];

const statusTone: Record<KeyStatus, StatusTone> = {
  Active: "success",
  Restricted: "accent",
  Rotating: "warning",
};

const maskSecret = (value: string, revealed: boolean) =>
  revealed ? value : "•".repeat(Math.max(8, value.length));

const formatKey = (key: ApiKey, revealed: boolean) => {
  if (!key.revealable) {
    return `${key.prefix}_${key.secret.slice(0, 6)}...${key.secret.slice(-4)}`;
  }

  return `${key.prefix}_${maskSecret(key.secret, revealed)}`;
};

export interface Form3Props {
  className?: string;
}

export function Form3({ className }: Form3Props) {
  const [stack, setStack] = useState<string>("Next.js");
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  const publishable = keys.find((key) => key.id === "pk-live");
  const secret = keys.find((key) => key.id === "sk-live");

  const envLines = useMemo(() => {
    const pub = publishable
      ? formatKey(publishable, true)
      : "pk_live_unavailable";
    const sec = secret
      ? `${secret.prefix}_${maskSecret(secret.secret, false)}`
      : "sk_live_unavailable";

    if (stack === "Laravel") {
      return [
        `REUI_PUBLISHABLE_KEY=${pub}`,
        `REUI_SECRET_KEY=${sec}`,
        "REUI_WEBHOOK_TOLERANCE=300",
      ];
    }

    if (stack === "Vite") {
      return [
        `VITE_REUI_PUBLISHABLE_KEY=${pub}`,
        `REUI_SECRET_KEY=${sec}`,
        "REUI_WEBHOOK_TOLERANCE=300",
      ];
    }

    return [
      `NEXT_PUBLIC_REUI_PUBLISHABLE_KEY=${pub}`,
      `REUI_SECRET_KEY=${sec}`,
      "REUI_WEBHOOK_TOLERANCE=300",
    ];
  }, [publishable, secret, stack]);

  const copyText = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard can be unavailable in some preview sandboxes.
    }
    setCopied(id);
  };

  return (
    <FormPage className={className}>
      <FormHeading
        action={
          <>
            <p className="text-muted-foreground text-sm">{keys.length} keys</p>
            <Button type="button">
              <PlusIcon data-icon="inline-start" />
              Create Key
            </Button>
          </>
        }
        description="Manage credentials and copy stack-ready environment values."
        title="API Keys"
      />

      <Card>
        <CardHeader>
          <CardTitle>Quick Copy</CardTitle>
          <CardDescription>
            Choose a stack and paste the environment block.
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <Select onValueChange={setStack} value={stack}>
              <SelectTrigger aria-label="Stack" className="w-40">
                <BracesIcon />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STACKS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={() => copyText("env", envLines.join("\n"))}
              type="button"
              variant="outline"
            >
              <CopyIcon data-icon="inline-start" />
              {copied === "env" ? "Copied" : "Copy"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ol className="overflow-x-auto rounded-lg bg-muted/40 p-4 font-mono text-sm ring-1 ring-foreground/10">
            {envLines.map((line, index) => {
              const [name, value] = line.split("=");
              return (
                <li className="flex gap-4" key={name}>
                  <span className="w-4 text-right text-muted-foreground">
                    {index + 1}
                  </span>
                  <span>
                    <span className="text-primary">{name}</span>
                    <span className="text-muted-foreground">=</span>
                    <span>{value}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keys</CardTitle>
          <CardDescription>
            Copy, reveal, rotate, or revoke workspace keys.
          </CardDescription>
          <CardAction>
            <Button type="button" variant="outline">
              <PlusIcon data-icon="inline-start" />
              Add Key
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col">
          {keys.map((key, index) => {
            const isRevealed = revealed.includes(key.id);
            const display = formatKey(key, isRevealed);

            return (
              <div className="flex flex-col" key={key.id}>
                {index > 0 ? <Separator /> : null}
                <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{key.name}</p>
                      <StatusBadge tone={statusTone[key.status]}>
                        {key.status}
                      </StatusBadge>
                    </div>
                    <p className="text-muted-foreground text-sm">{key.meta}</p>
                  </div>
                  <div className="flex min-w-0 flex-col gap-2 sm:items-end">
                    <div className="flex flex-wrap items-center gap-2">
                      <code
                        className={cn(
                          "rounded-md bg-muted px-2 py-1 font-mono text-xs ring-1 ring-foreground/10"
                        )}
                      >
                        {display}
                      </code>
                      <Button
                        aria-label={`Copy ${key.name}`}
                        onClick={() =>
                          copyText(key.id, `${key.prefix}_${key.secret}`)
                        }
                        size="icon-sm"
                        type="button"
                        variant="ghost"
                      >
                        <CopyIcon />
                      </Button>
                      {key.revealable ? (
                        <Button
                          aria-label={
                            isRevealed
                              ? `Hide ${key.name}`
                              : `Reveal ${key.name}`
                          }
                          onClick={() =>
                            setRevealed((current) =>
                              current.includes(key.id)
                                ? current.filter((id) => id !== key.id)
                                : [...current, key.id]
                            )
                          }
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                        >
                          {isRevealed ? <EyeOffIcon /> : <EyeIcon />}
                        </Button>
                      ) : null}
                      <Button
                        aria-label={`Rotate ${key.name}`}
                        onClick={() =>
                          setKeys((current) =>
                            current.map((item) =>
                              item.id === key.id
                                ? { ...item, status: "Rotating" }
                                : item
                            )
                          )
                        }
                        size="icon-sm"
                        type="button"
                        variant="ghost"
                      >
                        <RefreshCwIcon />
                      </Button>
                      <Button
                        aria-label={`Revoke ${key.name}`}
                        onClick={() =>
                          setKeys((current) =>
                            current.filter((item) => item.id !== key.id)
                          )
                        }
                        size="icon-sm"
                        type="button"
                        variant="destructive"
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {copied === key.id ? "Copied just now" : key.lastUsed}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {showAlert ? (
        <Alert variant="destructive">
          <ShieldAlertIcon />
          <AlertTitle>Keep secret keys server-side</AlertTitle>
          <AlertDescription>
            Rotate immediately if a key appears in client code, logs, or shared
            screenshots.
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => setShowAlert(false)}
              size="sm"
              type="button"
              variant="ghost"
            >
              Dismiss
            </Button>
          </AlertAction>
        </Alert>
      ) : null}
    </FormPage>
  );
}
