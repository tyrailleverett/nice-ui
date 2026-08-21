import type { Meta, StoryFn } from "@storybook/react-vite";

import { Waitlist1 as Waitlist1Block } from "./waitlist-1";

export default {
  title: "Marketing/Waitlist",
} satisfies Meta;

export const EditorialBand: StoryFn = () => <Waitlist1Block />;
