import "./cards.css";
import { cn } from "@/lib/utils";

export interface AvatarItem {
  initials: string;
  tone?: string;
}

interface AvatarStackProps {
  avatars?: AvatarItem[];
  count?: number;
}

export function AvatarStack({
  avatars = [
    { initials: "MA", tone: "coral" },
    { initials: "JK", tone: "sand" },
    { initials: "RS", tone: "sky" },
  ],
  count = 3,
}: AvatarStackProps) {
  return (
    <div
      aria-label={`${count} participants`}
      className="card-avatar-stack"
      role="img"
    >
      {avatars.slice(0, 3).map((avatar) => (
        <span
          className={cn("card-avatar", `card-avatar-${avatar.tone ?? "blue"}`)}
          key={avatar.initials}
        >
          {avatar.initials}
        </span>
      ))}
      {count > 3 ? (
        <span className="card-avatar card-avatar-more">+{count - 3}</span>
      ) : null}
    </div>
  );
}
