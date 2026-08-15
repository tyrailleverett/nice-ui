import type { Meta, StoryFn } from "@storybook/react-vite";

import { Changelog2 as Changelog2Block } from "./changelog-2";

export default {
  title: "Marketing/Changelog",
} satisfies Meta;

export const EditorialGrid: StoryFn = () => <Changelog2Block />;
