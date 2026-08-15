import type { Meta, StoryFn } from "@storybook/react-vite";

import { PrivacyPolicy1 as PrivacyPolicy1Block } from "./privacy-policy-1";

export default {
  title: "Marketing/Legal",
} satisfies Meta;

export const PrivacyPolicy: StoryFn = () => <PrivacyPolicy1Block />;

export const PrivacyPolicyStandard: StoryFn = () => (
  <PrivacyPolicy1Block variant="standard" />
);

export const PrivacyPolicySectionGrid: StoryFn = () => (
  <PrivacyPolicy1Block variant="compact" />
);

export const PrivacyPolicyFramedRail: StoryFn = () => (
  <PrivacyPolicy1Block variant="wide" />
);
