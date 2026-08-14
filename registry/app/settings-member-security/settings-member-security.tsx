import {
  KeyRoundIcon,
  MailIcon,
  RefreshCcwIcon,
  SmartphoneIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { SettingsTag } from "@/components/app/settings-shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface MemberSecurityProps {
  className?: string;
  onResendInvite?: () => void;
  onResetTwoFactor?: () => void;
}

function AuthenticationFactorRow({
  description,
  icon: Icon,
  name,
  status,
}: {
  description: string;
  icon: ComponentType<{ className?: string }>;
  name: string;
  status: "Enabled" | "Off";
}) {
  return (
    <div className="flex min-h-24 items-center gap-4 px-4 py-5 sm:px-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{name}</p>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>
      {status === "Enabled" ? (
        <SettingsTag tone="success">{status}</SettingsTag>
      ) : (
        <Badge variant="secondary">{status}</Badge>
      )}
    </div>
  );
}

function SignInSecurityRow({
  description,
  label,
  status,
  value,
}: {
  description: string;
  label: string;
  status: "Connected" | "Enforced" | "Strong";
  value: string;
}) {
  return (
    <div className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="mt-1 font-medium">{value}</p>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="sm:pt-1">
        <SettingsTag tone={status === "Enforced" ? "accent" : "success"}>
          {status}
        </SettingsTag>
      </div>
    </div>
  );
}

export function MemberSecurity({
  className,
  onResendInvite,
  onResetTwoFactor,
}: MemberSecurityProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-8",
        className
      )}
    >
      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="gap-1 p-6">
          <CardTitle>Authentication factors</CardTitle>
          <CardDescription>2 of 3 factors enabled.</CardDescription>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <div className="rounded-xl border">
            <AuthenticationFactorRow
              description="Verified Apr 12, 2026"
              icon={SmartphoneIcon}
              name="Authenticator (TOTP)"
              status="Enabled"
            />
            <Separator />
            <AuthenticationFactorRow
              description="MacBook Pro, Touch ID"
              icon={KeyRoundIcon}
              name="Passkey"
              status="Enabled"
            />
            <Separator />
            <AuthenticationFactorRow
              description="Ends in 0188"
              icon={MailIcon}
              name="SMS backup"
              status="Off"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-end gap-2 p-4 sm:flex-row">
          <Button
            className="w-full sm:w-auto"
            onClick={onResendInvite}
            variant="outline"
          >
            <MailIcon data-icon="inline-start" />
            Resend invite
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={onResetTwoFactor}
            variant="secondary"
          >
            <RefreshCcwIcon data-icon="inline-start" />
            Reset 2FA
          </Button>
        </CardFooter>
      </Card>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="gap-1 p-6">
          <CardTitle>Sign-in security</CardTitle>
          <CardDescription>Password, SSO, and recovery state.</CardDescription>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <div className="rounded-xl border px-6">
            <SignInSecurityRow
              description="Last changed Apr 9, 2026, 67 days ago."
              label="Password"
              status="Strong"
              value="Set Mar 4, 2024"
            />
            <Separator />
            <SignInSecurityRow
              description="Provisioned via SCIM on the acmecloud.com directory."
              label="SSO connection"
              status="Connected"
              value="Okta"
            />
            <Separator />
            <SignInSecurityRow
              description="Authenticator and passkey cover sign-in for this member."
              label="Two-factor"
              status="Enforced"
              value="2 factors enrolled"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
