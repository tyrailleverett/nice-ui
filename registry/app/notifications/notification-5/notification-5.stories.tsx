import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Notification5 } from "./notification-5";

const unreadFilterName = /Unread/;

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Notifications/Center",
} satisfies Meta<typeof Notification5>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Center: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: unreadFilterName })
    );
    await expect(canvas.getByText("Maya Chen")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Mark notification from Maya Chen as read",
      })
    );
    await expect(
      canvas.queryByRole("button", {
        name: "Mark notification from Maya Chen as read",
      })
    ).not.toBeInTheDocument();
  },
  render: () => <Notification5 />,
};

export const Empty: Story = {
  render: () => <Notification5 defaultItems={[]} />,
};
