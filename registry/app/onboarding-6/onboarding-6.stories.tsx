import type { Meta, StoryObj } from "@storybook/react-vite";

import { Onboarding6 } from "./onboarding-6";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Onboarding/Workspace Checklist",
} satisfies Meta<typeof Onboarding6>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Onboarding6 /> };
