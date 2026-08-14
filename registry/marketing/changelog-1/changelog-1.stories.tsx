import type { Meta, StoryFn } from "@storybook/react-vite";

import { Changelog1 as Changelog1Block } from "./changelog-1";

export default {
  title: "Marketing/Changelog",
} satisfies Meta;

export const SplitVersionTimeline: StoryFn = () => <Changelog1Block />;
