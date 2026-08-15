import type { Meta, StoryFn } from "@storybook/react-vite";

import { TermsOfService1 as TermsOfService1Block } from "./terms-of-service-1";

export default {
  title: "Marketing/Legal",
} satisfies Meta;

export const TermsOfService: StoryFn = () => <TermsOfService1Block />;

export const TermsOfServiceStandard: StoryFn = () => (
  <TermsOfService1Block variant="standard" />
);

export const TermsOfServiceSectionGrid: StoryFn = () => (
  <TermsOfService1Block variant="compact" />
);

export const TermsOfServiceFramedRail: StoryFn = () => (
  <TermsOfService1Block variant="wide" />
);
