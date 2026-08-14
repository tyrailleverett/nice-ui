import type { Meta, StoryFn } from "@storybook/react-vite";

import { TwoFactor2 as TwoFactor2Block } from "./two-factor-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Two Factor",
} satisfies Meta;

export const Card: StoryFn = () => <TwoFactor2Block />;
