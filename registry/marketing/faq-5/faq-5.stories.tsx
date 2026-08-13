import type { Meta, StoryFn } from "@storybook/react-vite";

import { Faq5 as Faq5Block } from "./faq-5";

export default {
  title: "Marketing/FAQ",
} satisfies Meta;

export const GroupedCategories: StoryFn = () => <Faq5Block />;
