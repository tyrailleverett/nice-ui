import type { Meta, StoryFn } from "@storybook/react-vite";
import { Notification2 } from "./notification-2";
export default {
  parameters: { layout: "fullscreen" },
  title: "App/Notifications",
} satisfies Meta;
export const Feed: StoryFn = () => <Notification2 />;
