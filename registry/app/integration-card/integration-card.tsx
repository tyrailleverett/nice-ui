import { CheckIcon, MoreVerticalIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AvatarStack } from "@/components/app/cards-shared";
import { Button } from "@/components/ui/button";

export interface IntegrationCardProps {
  description?: string;
  icon?: ReactNode;
  name?: string;
  onGuide?: () => void;
  status?: string;
}

export function IntegrationCard({
  description = "Sync contacts, track opportunities, and forecast deals in one unified workspace.",
  icon,
  name = "LeadForge CRM",
  onGuide,
  status = "Installed",
}: IntegrationCardProps) {
  return (
    <article className="showcase-card integration-card">
      <div className="integration-visual">
        <span className="card-status">
          <CheckIcon aria-hidden="true" /> Live
        </span>
        <Button
          aria-label="More integration options"
          size="icon"
          type="button"
          variant="ghost"
        >
          <MoreVerticalIcon />
        </Button>
        {icon ? <span className="integration-logo">{icon}</span> : null}
      </div>
      <div className="integration-panel">
        <div className="integration-content">
          <div className="card-row card-row-between">
            <h3>{name}</h3>
            <span className="card-pill">{status}</span>
          </div>
          <p className="card-description">{description}</p>
          <AvatarStack count={6} />
        </div>
        <div className="integration-footer">
          <Button
            className="h-auto min-h-14 w-full rounded-none"
            onClick={onGuide}
            type="button"
            variant="ghost"
          >
            Integration guide
          </Button>
        </div>
      </div>
    </article>
  );
}
