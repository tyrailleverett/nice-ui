import type { Meta, StoryFn } from "@storybook/react-vite";

import { Bento3 as Bento3Block } from "./bento-3";

export default {
  title: "Marketing/Bento",
} satisfies Meta;

export const FramedMosaic: StoryFn = () => <Bento3Block />;
