import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar6 } from "./calendar-6";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Calendar/Availability",
} satisfies Meta<typeof Calendar6>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Availability: Story = { render: () => <Calendar6 /> };
