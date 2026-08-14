import type { Meta, StoryFn } from "@storybook/react-vite";
import { Notification1 } from "./notification-1";

export default {
  parameters: { layout: "centered" },
  title: "App/Notifications",
} satisfies Meta;
export const Inbox: StoryFn = () => <Notification1 />;
