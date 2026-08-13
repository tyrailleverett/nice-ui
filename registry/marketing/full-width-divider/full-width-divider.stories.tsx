import type { Meta, StoryFn } from "@storybook/react-vite";

import { FullWidthDivider } from "./full-width-divider";

export default {
  title: "Marketing/Full Width Divider",
} satisfies Meta;

export const Default: StoryFn = () => (
  <div className="relative mx-auto h-24 w-full max-w-3xl border-x">
    <FullWidthDivider position="top" />
    <FullWidthDivider position="bottom" />
  </div>
);

export const Contained: StoryFn = () => (
  <div className="relative mx-auto h-24 w-full max-w-3xl border">
    <FullWidthDivider contained position="top" />
    <FullWidthDivider contained position="bottom" />
  </div>
);
