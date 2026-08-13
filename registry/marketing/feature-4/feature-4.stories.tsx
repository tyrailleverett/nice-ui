import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature4 as Feature4Block } from "./feature-4";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const BentoPipeline: StoryFn = () => <Feature4Block />;
