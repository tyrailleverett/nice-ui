import type { Meta, StoryFn } from "@storybook/react-vite";

import { Notification4 } from "./notification-4";

export default {
  parameters: { layout: "centered" },
  title: "App/Notifications",
} satisfies Meta;

export const Activity: StoryFn = () => <Notification4 />;
