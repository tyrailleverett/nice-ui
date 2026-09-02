import type { Meta, StoryFn } from "@storybook/react-vite";

import { Waitlist3 as Waitlist3Block } from "./waitlist-3";

export default {
  title: "Marketing/Waitlist",
} satisfies Meta;

export const EarlyAccessForm: StoryFn = () => <Waitlist3Block />;
