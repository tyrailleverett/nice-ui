/* biome-ignore-all lint/performance/noJsxPropsBind: Key rows close over local management actions. */
import {
  CheckIcon,
  ClipboardIcon,
  EllipsisIcon,
  KeyRoundIcon,
  PlusIcon,
  ShieldAlertIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import {
  FormHeading,
  FormPage,
  StatusBadge,
} from "@/components/app/forms-shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Environment = "Production" | "Test";

interface ApiKey {
  created: string;
  environment: Environment;
  id: string;
  lastUsed: string;
  name: string;
  secret: string;
}

const initialKeys: ApiKey[] = [
  {
    created: "Aug 18, 2026",
    environment: "Production",
    id: "prod-frontend",
    lastUsed: "2 min ago",
    name: "Frontend production",
    secret: "pk_live_51N8h2qA7wX4mP9c",
  },
  {
    created: "Aug 02, 2026",
    environment: "Production",
    id: "prod-backend",
    lastUsed: "12 min ago",
    name: "Backend production",
    secret: "sk_live_4nQ8vL2xR7kM5tC1",
  },
  {
    created: "Aug 21, 2026",
    environment: "Test",
    id: "test-ci",
    lastUsed: "Never",
    name: "CI test runner",
    secret: "sk_test_7pD3sK9mV2aF6jH4",
  },
  {
    created: "Jul 11, 2026",
    environment: "Test",
    id: "test-local",
    lastUsed: "Yesterday",
    name: "Local development",
    secret: "pk_test_3xW8qL1bN6rT9yM2",
  },
];

const maskSecret = (secret: string) =>
  `${secret.slice(0, 8)}${"•".repeat(12)}${secret.slice(-4)}`;

function KeyRow({
  keyData,
  onCopy,
  onRename,
  onRevoke,
  copied,
}: {
  copied: boolean;
  keyData: ApiKey;
  onCopy: (keyData: ApiKey) => void;
  onRename: (keyData: ApiKey) => void;
  onRevoke: (keyData: ApiKey) => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
          <KeyRoundIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium">{keyData.name}</p>
            <StatusBadge tone="success">Active</StatusBadge>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground text-xs">
            <span>Created {keyData.created}</span>
            <span aria-hidden="true">·</span>
            <span>Last used {keyData.lastUsed}</span>
          </div>
          <code className="mt-3 block truncate font-mono text-muted-foreground text-xs tracking-wide">
            {maskSecret(keyData.secret)}
          </code>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 self-end sm:self-auto">
        <Button
          aria-label={`Copy ${keyData.name}`}
          onClick={() => onCopy(keyData)}
          size="sm"
          type="button"
          variant="outline"
        >
          {copied ? (
            <CheckIcon data-icon="inline-start" />
          ) : (
            <ClipboardIcon data-icon="inline-start" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                aria-label={`Actions for ${keyData.name}`}
                size="icon-sm"
                type="button"
                variant="ghost"
              />
            }
          >
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onRename(keyData)}>
              Rename key
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onRevoke(keyData)}
            >
              <Trash2Icon />
              Revoke key
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function KeySection({
  environment,
  keys,
  copiedId,
  onCopy,
  onRename,
  onRevoke,
}: {
  copiedId: string | null;
  environment: Environment;
  keys: ApiKey[];
  onCopy: (keyData: ApiKey) => void;
  onRename: (keyData: ApiKey) => void;
  onRevoke: (keyData: ApiKey) => void;
}) {
  return (
    <Card>
      <CardHeader className="border-border/70 border-b">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{environment}</CardTitle>
              <Badge variant="secondary">{keys.length}</Badge>
            </div>
            <CardDescription className="mt-1">
              {environment === "Production"
                ? "Live traffic and customer data. Handle with care."
                : "Safe for local development and automated tests."}
            </CardDescription>
          </div>
          <div
            aria-hidden="true"
            className={`mt-1 size-2 rounded-full ${environment === "Production" ? "bg-emerald-500" : "bg-sky-500"}`}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col pt-0">
        {keys.length > 0 ? (
          keys.map((keyData, index) => (
            <div key={keyData.id}>
              {index > 0 ? <Separator /> : null}
              <KeyRow
                copied={copiedId === keyData.id}
                keyData={keyData}
                onCopy={onCopy}
                onRename={onRename}
                onRevoke={onRevoke}
              />
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-muted-foreground text-sm">
            No {environment.toLowerCase()} keys yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export interface ApiKeysProps {
  className?: string;
}

export function ApiKeys({ className }: ApiKeysProps) {
  const [keys, setKeys] = useState(initialKeys);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<"create" | "rename" | "revoke" | null>(
    null
  );
  const [activeKey, setActiveKey] = useState<ApiKey | null>(null);
  const [name, setName] = useState("");

  const openCreate = () => {
    setName("");
    setActiveKey(null);
    setDialog("create");
  };

  const openRename = (keyData: ApiKey) => {
    setName(keyData.name);
    setActiveKey(keyData);
    setDialog("rename");
  };

  const openRevoke = (keyData: ApiKey) => {
    setActiveKey(keyData);
    setDialog("revoke");
  };

  const copyKey = async (keyData: ApiKey) => {
    try {
      await navigator.clipboard.writeText(keyData.secret);
    } catch {
      // Clipboard can be unavailable in preview sandboxes.
    }
    setCopiedId(keyData.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  };

  const saveName = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }
    if (dialog === "create") {
      setKeys((current) => [
        ...current,
        {
          created: "Just now",
          environment: "Test",
          id: `test-${Date.now()}`,
          lastUsed: "Never",
          name: trimmedName,
          secret: "sk_test_new_key_8mP2qR7x",
        },
      ]);
    } else if (activeKey) {
      setKeys((current) =>
        current.map((keyData) =>
          keyData.id === activeKey.id
            ? { ...keyData, name: trimmedName }
            : keyData
        )
      );
    }
    setDialog(null);
  };

  const revokeKey = () => {
    if (activeKey) {
      setKeys((current) =>
        current.filter((keyData) => keyData.id !== activeKey.id)
      );
    }
    setDialog(null);
    setActiveKey(null);
  };

  const productionKeys = keys.filter(
    (keyData) => keyData.environment === "Production"
  );
  const testKeys = keys.filter((keyData) => keyData.environment === "Test");

  return (
    <FormPage className={className}>
      <FormHeading
        action={
          <Button onClick={openCreate} type="button">
            <PlusIcon data-icon="inline-start" />
            Create API key
          </Button>
        }
        description="Manage the credentials your apps use to connect to your workspace."
        title="API Keys"
      />

      <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm">
        <ShieldAlertIcon
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-amber-700"
        />
        <p className="text-muted-foreground">
          Keep secret keys private. You can copy a key again later, but the full
          secret is never shown after creation.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <KeySection
          copiedId={copiedId}
          environment="Production"
          keys={productionKeys}
          onCopy={copyKey}
          onRename={openRename}
          onRevoke={openRevoke}
        />
        <KeySection
          copiedId={copiedId}
          environment="Test"
          keys={testKeys}
          onCopy={copyKey}
          onRename={openRename}
          onRevoke={openRevoke}
        />
      </div>

      <Dialog
        onOpenChange={(open) => !open && setDialog(null)}
        open={dialog !== null}
      >
        <DialogContent className="sm:max-w-md" showCloseButton>
          {dialog === "revoke" ? (
            <>
              <DialogHeader>
                <DialogTitle>Revoke “{activeKey?.name}”?</DialogTitle>
                <DialogDescription>
                  Any application using this key will lose access immediately.
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-destructive text-sm">
                Revoke this key only if you have updated every integration that
                uses it.
              </div>
              <DialogFooter>
                <Button onClick={() => setDialog(null)} variant="outline">
                  Keep key
                </Button>
                <Button onClick={revokeKey} variant="destructive">
                  Revoke key
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  {dialog === "create" ? "Create an API key" : "Rename API key"}
                </DialogTitle>
                <DialogDescription>
                  {dialog === "create"
                    ? "Give this key a clear name so your team knows where it is used."
                    : "Use a name that makes the owning integration easy to identify."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <label className="font-medium text-sm" htmlFor="api-key-name">
                  Key name
                </label>
                <Input
                  autoFocus
                  id="api-key-name"
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && saveName()}
                  placeholder="e.g. Production backend"
                  value={name}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setDialog(null)} variant="outline">
                  Cancel
                </Button>
                <Button disabled={!name.trim()} onClick={saveName}>
                  {dialog === "create" ? "Create key" : "Save name"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </FormPage>
  );
}
