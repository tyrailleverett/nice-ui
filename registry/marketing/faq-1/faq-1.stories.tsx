import type { Meta, StoryFn } from "@storybook/react-vite";

import { Faq1 as Faq1Block } from "./faq-1";

export default {
  title: "Marketing/FAQ",
} satisfies Meta;

export const CenteredAccordion: StoryFn = () => <Faq1Block />;
