import type { Meta, StoryFn } from "@storybook/react-vite";

import { Stats3 as Stats3Block } from "./stats-3";

export default {
  title: "Marketing/Stats",
} satisfies Meta;

export const SplitHeadlineProof: StoryFn = () => <Stats3Block />;
