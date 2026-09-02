import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { FeedbackRoadmap } from "./feedback-roadmap";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App / Feedback Roadmap",
} satisfies Meta<typeof FeedbackRoadmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomerRoadmap: Story = {
  play: async ({ canvas }) => {
    const voteButton = canvas.getByRole("button", {
      name: "Vote for Granular roles and permissions",
    });
    await userEvent.click(voteButton);
    await expect(voteButton).toHaveAttribute("aria-pressed", "true");
    await expect(voteButton).toHaveTextContent("Voted");

    await userEvent.click(
      canvas.getByRole("button", { name: "Submit feedback" })
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Request title" }),
      "Bring saved views to the mobile app"
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "How would this help?" }),
      "Our team checks key metrics on the go and needs the same saved filters."
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Send feedback" })
    );
    await expect(
      canvas.getByRole("heading", {
        name: "Thanks for the thoughtful feedback",
      })
    ).toBeVisible();
  },
  render: () => <FeedbackRoadmap />,
};
