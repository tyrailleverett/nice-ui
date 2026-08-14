import { ApertureIcon, ZapIcon } from "lucide-react";
import type { ReactNode } from "react";

import "@/components/app/cards-shared";

export interface PartnerCardProps {
  icon?: ReactNode;
  name: string;
}

export function PartnerCard({
  icon = <span className="resend-mark">R</span>,
  name,
}: PartnerCardProps) {
  return (
    <article className="showcase-card partner-card">
      <span className="partner-logo">{icon}</span>
      <h3>{name}</h3>
    </article>
  );
}

export function PartnerCards() {
  return (
    <div className="partner-grid">
      <PartnerCard name="Resend" />
      <PartnerCard icon={<span className="stripe-mark" />} name="Stripe" />
      <PartnerCard icon={<ZapIcon aria-hidden="true" />} name="Supabase" />
      <PartnerCard icon={<ApertureIcon aria-hidden="true" />} name="OpenAI" />
      <PartnerCard
        icon={<span className="anthropic-mark">AI</span>}
        name="Anthropic"
      />
    </div>
  );
}
