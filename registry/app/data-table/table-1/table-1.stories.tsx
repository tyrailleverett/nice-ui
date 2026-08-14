import type { Meta, StoryFn } from "@storybook/react-vite";
import { Table1 } from "./table-1";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Data Tables",
} satisfies Meta;
export const Members: StoryFn = () => <Table1 />;
