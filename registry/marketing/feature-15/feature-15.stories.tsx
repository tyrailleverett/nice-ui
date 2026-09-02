import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature15 as Feature15Block } from "./feature-15";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const EditorialProcessRail: StoryFn = () => <Feature15Block />;
