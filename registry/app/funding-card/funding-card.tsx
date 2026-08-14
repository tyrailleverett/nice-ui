import {
  BarChart3Icon,
  CheckIcon,
  CircleDollarSignIcon,
  MessageSquareIcon,
  WalletCardsIcon,
} from "lucide-react";

import "@/components/app/cards-shared";
import { Button } from "@/components/ui/button";

export interface FundingCardProps {
  onProposal?: () => void;
}

export function FundingCard({ onProposal }: FundingCardProps) {
  const funds = [
    ["Northline Ventures", "$7,840,000", BarChart3Icon],
    ["Bluepeak Capital", "$3,260,000", WalletCardsIcon],
    ["Everfield Equity", "$1,180,000", CircleDollarSignIcon],
  ] as const;
  return (
    <article className="showcase-card funding-card">
      <div className="funding-profile">
        <span className="profile-photo">MA</span>
        <div>
          <h3>Mara Alves</h3>
          <span className="open-badge">
            <CheckIcon aria-hidden="true" /> Open to proposals
          </span>
          <p>malves@reui-capital.io</p>
        </div>
      </div>
      <div className="funding-stats">
        <span>
          <b>87</b>Deals
        </span>
        <span>
          <b>$7.2M</b>Avg. ticket
        </span>
        <span>
          <b>$415M</b>Total fund
        </span>
      </div>
      <div className="funding-list">
        {funds.map(([name, amount, IconComponent]) => (
          <div className="funding-row" key={name}>
            <span className="fund-icon">
              <IconComponent aria-hidden="true" />
            </span>
            <strong>{name}</strong>
            <b>{amount}</b>
          </div>
        ))}
      </div>
      <Button
        className="h-auto min-h-14 w-full rounded-none"
        onClick={onProposal}
        type="button"
        variant="ghost"
      >
        <MessageSquareIcon data-icon="inline-start" /> Send funding proposal
      </Button>
    </article>
  );
}
