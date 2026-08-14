import type { Meta, StoryFn } from "@storybook/react-vite";
import { Table2 } from "./table-2";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Data Tables",
} satisfies Meta;
export const Invoices: StoryFn = () => <Table2 />;
