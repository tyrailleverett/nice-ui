import type { Meta, StoryFn } from "@storybook/react-vite";
import { Notification3 } from "./notification-3";
export default {
  parameters: { layout: "centered" },
  title: "App/Notifications",
} satisfies Meta;
export const Pipeline: StoryFn = () => <Notification3 />;
