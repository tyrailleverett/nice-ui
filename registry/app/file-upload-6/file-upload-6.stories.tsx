import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileUpload6 } from "./file-upload-6";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/File Upload/Import Wizard",
} satisfies Meta<typeof FileUpload6>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadyToReview: Story = {
  render: () => <FileUpload6 />,
};

export const Empty: Story = {
  render: () => <FileUpload6 defaultFile={null} />,
};
