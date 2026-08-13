import type { Meta, StoryFn } from "@storybook/react-vite";

import { LogoCloud3 as LogoCloud3Block } from "./logo-cloud-3";

export default {
  title: "Marketing/Logo Cloud",
} satisfies Meta;

export const WrappingRow: StoryFn = () => <LogoCloud3Block />;
