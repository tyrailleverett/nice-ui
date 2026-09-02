import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form5 } from "./form-5";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Forms/Editor",
} satisfies Meta<typeof Form5>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Editor: Story = { render: () => <Form5 /> };
