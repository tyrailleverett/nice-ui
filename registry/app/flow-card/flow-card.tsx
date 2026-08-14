import { FileTextIcon, ShoppingCartIcon, ZapIcon } from "lucide-react";

import "@/components/app/cards-shared";
import { cn } from "@/lib/utils";

export interface FlowCardProps {
  accent?: "purple" | "blue" | "green";
  description: string;
  label: string;
  tier: "premium" | "regular" | "enterprise";
  title: string;
}

export function FlowCard({
  accent = "purple",
  description,
  label,
  tier,
  title,
}: FlowCardProps) {
  return (
    <article className="showcase-card flow-card">
      <div className="flow-visual">
        <span className="flow-node">
          <ShoppingCartIcon aria-hidden="true" />
        </span>
        <span className={cn("flow-node flow-node-center", `flow-${accent}`)}>
          {accent === "purple" ? <span className="resend-mark">R</span> : null}
          {accent === "blue" ? <span className="paypal-mark">P</span> : null}
          {accent === "green" ? <ZapIcon aria-hidden="true" /> : null}
        </span>
        <span className="flow-node">
          <FileTextIcon aria-hidden="true" />
        </span>
      </div>
      <div className="flow-copy">
        <h3>{title}</h3>
        <span className={cn("tier-badge", `tier-${tier}`)}>{label}</span>
      </div>
      <p className="card-description">{description}</p>
    </article>
  );
}
