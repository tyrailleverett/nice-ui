import type { Meta, StoryFn } from "@storybook/react-vite";

import { Waitlist2 as Waitlist2Block } from "./waitlist-2";

export default {
  title: "Marketing/Waitlist",
} satisfies Meta;

export const LaunchDispatch: StoryFn = () => <Waitlist2Block />;
