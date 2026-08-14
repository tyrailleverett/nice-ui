import {
  BanknoteIcon,
  Laptop2Icon,
  MapPinIcon,
  SparklesIcon,
} from "lucide-react";

import "@/components/app/cards-shared";
import { Button } from "@/components/ui/button";

export interface RecommendedRoleCardProps {
  company?: string;
  description?: string;
  location?: string;
  onApply?: () => void;
  onDetails?: () => void;
  salary?: string;
  title?: string;
  workMode?: string;
}

export function RecommendedRoleCard({
  company = "Resend",
  description = "Join the engineering team at CloudCore to build scalable cloud platforms. Collaborate on backend systems, APIs, and modern infrastructure to deliver enterprise solutions worldwide.",
  location = "Berlin, Germany",
  onApply,
  onDetails,
  salary = "$60–75k/year",
  title = "Software Engineer",
  workMode = "Hybrid",
}: RecommendedRoleCardProps) {
  return (
    <article className="showcase-card role-card">
      <div className="role-label">
        <SparklesIcon aria-hidden="true" /> Recommended role, based on your
        profile
      </div>
      <div className="role-body">
        <div className="role-intro">
          <span className="role-logo">
            <span className="resend-mark">R</span>
          </span>
          <div>
            <h3>{title}</h3>
            <p>{company}</p>
          </div>
        </div>
        <div className="role-facts">
          <span>
            <MapPinIcon aria-hidden="true" />
            {location}
          </span>
          <span>
            <Laptop2Icon aria-hidden="true" />
            {workMode}
          </span>
          <span>
            <BanknoteIcon aria-hidden="true" />
            {salary}
          </span>
        </div>
        <p className="card-description">{description}</p>
        <div className="role-actions">
          <Button onClick={onApply} type="button">
            Quick apply
          </Button>
          <Button onClick={onDetails} type="button" variant="outline">
            View details
          </Button>
        </div>
      </div>
    </article>
  );
}
