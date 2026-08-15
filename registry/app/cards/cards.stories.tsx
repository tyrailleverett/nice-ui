import type { Meta, StoryFn } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { DataRowCard } from "../data-row-card/data-row-card";
import { FlowCard } from "../flow-card/flow-card";
import { FundingCard } from "../funding-card/funding-card";
import { IntegrationCard } from "../integration-card/integration-card";
import { MeetingCard } from "../meeting-card/meeting-card";
import { PlayModeCard } from "../play-mode-card/play-mode-card";
import { RecommendedRoleCard } from "../recommended-role-card/recommended-role-card";

import "../cards-shared/cards.css";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Cards",
} satisfies Meta;

function CardShowcase() {
  return (
    <main className="card-showcase">
      <MeetingCard />
      <IntegrationCard />
      <RecommendedRoleCard />
      <DataRowCard />
      <PlayModeCard />
      <div className="flow-grid">
        <FlowCard
          description="Transactional email delivery tuned for speed, observability, and reliable event handling."
          label="Premium"
          tier="premium"
          title="Resend email flow"
        />
        <FlowCard
          accent="blue"
          description="Optimized payment processing for speed, reliability, and global reach."
          label="Regular"
          tier="regular"
          title="PayPal checkout flow"
        />
        <FlowCard
          accent="green"
          description="Authentication and data access wired together for secure product onboarding and account..."
          label="Enterprise"
          tier="enterprise"
          title="Supabase auth integration"
        />
      </div>
      <FundingCard />
    </main>
  );
}

export const AllCards: StoryFn = () => <CardShowcase />;

const StoryFrame = ({
  children,
  size = "wide",
}: {
  children: ReactNode;
  size?: "compact" | "full" | "large" | "medium" | "wide";
}) => (
  <main className={`card-story-frame card-story-frame-${size}`}>
    {children}
  </main>
);

export const Meeting: StoryFn = () => (
  <StoryFrame>
    <MeetingCard />
  </StoryFrame>
);
export const Integration: StoryFn = () => (
  <StoryFrame size="medium">
    <IntegrationCard />
  </StoryFrame>
);
export const RecommendedRole: StoryFn = () => (
  <StoryFrame>
    <RecommendedRoleCard />
  </StoryFrame>
);
export const DataRow: StoryFn = () => (
  <StoryFrame size="full">
    <DataRowCard />
  </StoryFrame>
);
export const PlayMode: StoryFn = () => (
  <StoryFrame size="compact">
    <PlayModeCard />
  </StoryFrame>
);
export const Flows: StoryFn = () => (
  <StoryFrame size="full">
    <div className="flow-grid">
      <FlowCard
        description="Transactional email delivery tuned for speed, observability, and reliable event handling."
        label="Premium"
        tier="premium"
        title="Resend email flow"
      />
      <FlowCard
        accent="blue"
        description="Optimized payment processing for speed, reliability, and global reach."
        label="Regular"
        tier="regular"
        title="PayPal checkout flow"
      />
      <FlowCard
        accent="green"
        description="Authentication and data access wired together for secure product onboarding and account..."
        label="Enterprise"
        tier="enterprise"
        title="Supabase auth integration"
      />
    </div>
  </StoryFrame>
);
export const Funding: StoryFn = () => (
  <StoryFrame size="large">
    <FundingCard />
  </StoryFrame>
);
