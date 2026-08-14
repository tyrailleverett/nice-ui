import { Clock3Icon, Globe2Icon, MailIcon } from "lucide-react";
import { AvatarStack } from "@/components/app/cards-shared";

export interface DataRowCardProps {
  branch?: string;
  domain?: string;
  email?: string;
  name?: string;
  onPreview?: () => void;
}

export function DataRowCard({
  branch = "Main",
  domain = "reui.io",
  email = "Preview",
  name = "Conhodler",
  onPreview,
}: DataRowCardProps) {
  return (
    <article className="showcase-card data-row-card">
      <div className="data-row-inner">
        <div>
          <span className="data-label">Created</span>
          <strong className="data-primary">
            <span className="data-gem" />
            {name} <em>24m ago</em>
          </strong>
        </div>
        <div>
          <span className="data-label">Status</span>
          <strong className="data-primary">
            <span className="status-dot" />
            Ready
          </strong>
        </div>
        <div>
          <span className="data-label">Mobile</span>
          <strong className="data-primary">
            <Clock3Icon aria-hidden="true" />
            49s <em>24m ago</em>
          </strong>
        </div>
        <div>
          <span className="data-label">Email</span>
          <button className="data-link" onClick={onPreview} type="button">
            <MailIcon aria-hidden="true" />
            {email}
          </button>
        </div>
        <div>
          <span className="data-label">Domain</span>
          <strong className="data-primary">
            <Globe2Icon aria-hidden="true" />
            {domain} <span className="branch-badge">{branch}</span>
          </strong>
        </div>
        <div>
          <span className="data-label">Team</span>
          <AvatarStack count={4} />
        </div>
      </div>
    </article>
  );
}
