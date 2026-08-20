import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { MembersManagement } from "./members-management";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Members Management",
} satisfies Meta<typeof MembersManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "Search members" }),
      "Maya"
    );
    await expect(canvas.getByText("Maya Chen")).toBeVisible();
    await expect(canvas.queryByText("Jon Bell")).not.toBeInTheDocument();
  },
  render: () => <MembersManagement />,
};

export const EmptyDirectory: Story = {
  render: () => <MembersManagement invites={[]} members={[]} />,
};

export const EnrollmentComplete: Story = {
  render: () => <MembersManagement invites={[]} />,
};
