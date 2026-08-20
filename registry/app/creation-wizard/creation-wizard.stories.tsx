import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { CreationWizard } from "./creation-wizard";

const projectNamePattern = /Project name/;
const gitLabPattern = /GitLab repository/;

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Creation Wizard",
} satisfies Meta<typeof CreationWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateProject: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(canvas.getByText("Add a name to continue.")).toBeVisible();

    await userEvent.type(
      canvas.getByRole("textbox", { name: projectNamePattern }),
      "Signal room"
    );
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(canvas.getByText("Where should we look?")).toBeVisible();

    await userEvent.click(canvas.getByRole("radio", { name: gitLabPattern }));
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(canvas.getByText("Ready to make it real?")).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Create project" })
    );
    await expect(canvas.getByText("Signal room is ready.")).toBeVisible();
  },
  render: () => <CreationWizard />,
};

export const Details: Story = {
  render: () => <CreationWizard />,
};
