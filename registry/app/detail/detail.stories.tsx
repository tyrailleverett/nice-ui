import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Detail1 } from "./detail-1/detail-1";
import { Detail2 } from "./detail-2/detail-2";
import { Detail3 } from "./detail-3/detail-3";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Detail",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExceptionInspector: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("radio", { name: "People activity" })
    );
    await expect(canvas.getByText("Lena Hoffman")).toBeVisible();
    await expect(
      canvas.queryByText("Fulfillment autopilot")
    ).not.toBeInTheDocument();
  },
  render: () => <Detail1 />,
};

export const AccountWorkspace: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Worklog" }));
    await expect(canvas.getByRole("tab", { name: "Worklog" })).toHaveAttribute(
      "data-state",
      "active"
    );
    await expect(canvas.getByText("Client hours")).toBeVisible();
  },
  render: () => <Detail2 />,
};

export const IncidentTimeline: StoryFn = () => <Detail3 />;
