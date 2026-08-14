import { CheckIcon, MoreVerticalIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AvatarStack } from "@/components/app/cards-shared";

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
        <button
          aria-label="More integration options"
          className="icon-button"
          type="button"
        >
          <MoreVerticalIcon aria-hidden="true" />
        </button>
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
          <button
            className="card-action card-action-center"
            onClick={onGuide}
            type="button"
          >
            Integration guide
          </button>
        </div>
      </div>
    </article>
  );
}
