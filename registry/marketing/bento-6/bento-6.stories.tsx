import type { Meta, StoryFn } from "@storybook/react-vite";

import { Bento6 as Bento6Block } from "./bento-6";

export default {
  title: "Marketing/Bento",
} satisfies Meta;

export const AsymmetricFieldNotes: StoryFn = () => <Bento6Block />;
