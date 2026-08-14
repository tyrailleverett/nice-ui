import type { Meta, StoryFn } from "@storybook/react-vite";
import { Table3 } from "./table-3";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Data Tables",
} satisfies Meta;
export const TaskDelivery: StoryFn = () => <Table3 />;
