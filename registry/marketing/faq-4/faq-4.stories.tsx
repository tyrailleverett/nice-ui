import type { Meta, StoryFn } from "@storybook/react-vite";

import { Faq4 as Faq4Block } from "./faq-4";

export default {
  title: "Marketing/FAQ",
} satisfies Meta;

export const SearchableCategories: StoryFn = () => <Faq4Block />;
