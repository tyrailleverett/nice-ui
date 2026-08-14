import type { Meta, StoryFn } from "@storybook/react-vite";
import { Table4 } from "./table-4";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Data Tables",
} satisfies Meta;
export const RoadmapQueue: StoryFn = () => <Table4 />;
