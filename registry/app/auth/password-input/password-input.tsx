import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon, XIcon } from "lucide-react";
import {
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
] as const;

const maxPasswordStrength = passwordRequirements.length;

export interface PasswordInputProps {
  autoComplete?: string;
  className?: string;
  forgotPasswordHref?: string;
  forgotPasswordLabel?: string;
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  showStrengthIndicator?: boolean;
}

function getPasswordStrength(password: string) {
  return passwordRequirements.map((requirement) => ({
    met: requirement.regex.test(password),
    text: requirement.text,
  }));
}

function getPasswordStrengthColor(score: number) {
  if (score === 0) {
    return "bg-border";
  }
  if (score <= 1) {
    return "bg-red-500";
  }
  if (score <= 2) {
    return "bg-orange-500";
  }
  if (score <= 4) {
    return "bg-amber-500";
  }
  return "bg-emerald-500";
}

function getPasswordStrengthText(score: number) {
  if (score === 0) {
    return "Enter a password";
  }
  if (score <= 2) {
    return "Weak password";
  }
  if (score <= 4) {
    return "Medium password";
  }
  return "Strong password";
}

export function PasswordInput({
  autoComplete = "current-password",
  className,
  forgotPasswordHref,
  forgotPasswordLabel = "Forgot password?",
  id = "password",
  label = "Password",
  name = "password",
  placeholder = "Enter your password",
  required = true,
  showStrengthIndicator = false,
}: PasswordInputProps) {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const descriptionId = `${id}-description`;
  const requirementsId = `${id}-requirements`;
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const strengthScore = strength.filter(
    (requirement) => requirement.met
  ).length;
  const showIndicator = showStrengthIndicator && isFocused;

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    const nextFocused = event.relatedTarget;
    if (
      nextFocused instanceof Node &&
      event.currentTarget.parentElement?.contains(nextFocused)
    ) {
      return;
    }
    setIsFocused(false);
  }, []);

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const toggleVisibility = useCallback(() => {
    setIsVisible((visible) => !visible);
  }, []);

  const preventInputBlur = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {forgotPasswordHref ? (
          <a
            className="text-muted-foreground text-sm hover:text-foreground"
            href={forgotPasswordHref}
          >
            {forgotPasswordLabel}
          </a>
        ) : null}
      </div>
      <div>
        <InputGroup className="h-10">
          <InputGroupAddon>
            <LockIcon aria-hidden="true" data-icon="inline-start" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={showStrengthIndicator ? descriptionId : undefined}
            aria-invalid={
              showStrengthIndicator && password.length > 0
                ? strengthScore < maxPasswordStrength
                : undefined
            }
            autoCapitalize="off"
            autoComplete={autoComplete}
            autoCorrect="off"
            className={cn(
              "h-10",
              !isVisible && "[-webkit-text-security:disc] [text-security:disc]"
            )}
            id={id}
            name={name}
            onBlur={handleBlur}
            onChange={handlePasswordChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            required={required}
            spellCheck={false}
            type="text"
            value={password}
          />
          <button
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            className="flex h-full w-9 shrink-0 items-center justify-center text-muted-foreground/80 outline-none transition hover:text-foreground focus-visible:text-foreground"
            onBlur={handleBlur}
            onClick={toggleVisibility}
            onFocus={handleFocus}
            onMouseDown={preventInputBlur}
            type="button"
          >
            {isVisible ? (
              <EyeOffIcon aria-hidden="true" className="size-4" />
            ) : (
              <EyeIcon aria-hidden="true" className="size-4" />
            )}
          </button>
        </InputGroup>

        {showStrengthIndicator ? (
          <div
            aria-hidden={!showIndicator}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
              showIndicator
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
            inert={!showIndicator}
          >
            <div className="overflow-hidden">
              <div
                className={cn(
                  "space-y-2 pt-3",
                  !showIndicator && "pointer-events-none"
                )}
              >
                <div
                  aria-label="Password strength"
                  aria-valuemax={maxPasswordStrength}
                  aria-valuemin={0}
                  aria-valuenow={strengthScore}
                  className="h-1 w-full overflow-hidden rounded-full bg-border"
                  role="progressbar"
                >
                  <div
                    className={cn(
                      "h-full transition-all duration-500 ease-out",
                      getPasswordStrengthColor(strengthScore)
                    )}
                    style={{
                      width: `${(strengthScore / maxPasswordStrength) * 100}%`,
                    }}
                  />
                </div>
                <p className="font-medium text-sm" id={descriptionId}>
                  {getPasswordStrengthText(strengthScore)}. Must contain:
                </p>
                <ul
                  aria-label="Password requirements"
                  className="space-y-1.5"
                  id={requirementsId}
                >
                  {strength.map((requirement) => (
                    <li
                      className="flex items-center gap-2"
                      key={requirement.text}
                    >
                      {requirement.met ? (
                        <CheckIcon
                          aria-hidden="true"
                          className="size-4 text-emerald-500"
                        />
                      ) : (
                        <XIcon
                          aria-hidden="true"
                          className="size-4 text-muted-foreground/80"
                        />
                      )}
                      <span
                        className={cn(
                          "text-xs",
                          requirement.met
                            ? "text-emerald-500"
                            : "text-muted-foreground/80"
                        )}
                      >
                        {requirement.text}
                      </span>
                      <span className="sr-only">
                        {requirement.met
                          ? "- Requirement met"
                          : "- Requirement not met"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
