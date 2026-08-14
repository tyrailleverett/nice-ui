import { useMemo, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface OtpInputProps {
  autoComplete?: string;
  className?: string;
  id?: string;
  label?: string;
  length?: number;
  name?: string;
}

export function OtpInput({
  autoComplete = "one-time-code",
  className,
  id = "otp",
  label = "Verification code",
  length = 6,
  name = "code",
}: OtpInputProps) {
  const [value, setValue] = useState("");

  const slots = useMemo(
    () =>
      Array.from({ length }, (_, index) => ({
        id: `${id}-${index}`,
        index,
      })),
    [id, length]
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <InputOTP
        autoComplete={autoComplete}
        id={id}
        maxLength={length}
        onChange={setValue}
        value={value}
      >
        <InputOTPGroup>
          {slots.map((slot) => (
            <InputOTPSlot
              className="size-10"
              index={slot.index}
              key={slot.id}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <input name={name} type="hidden" value={value} />
    </div>
  );
}
