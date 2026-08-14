import type { Meta, StoryFn } from "@storybook/react-vite";

import { TwoFactor3 as TwoFactor3Block } from "./two-factor-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Two Factor",
} satisfies Meta;

export const Simple: StoryFn = () => <TwoFactor3Block />;
