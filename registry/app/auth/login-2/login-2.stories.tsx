import type { Meta, StoryFn } from "@storybook/react-vite";

import { Login2 as Login2Block } from "./login-2";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Login",
} satisfies Meta;

export const Card: StoryFn = () => <Login2Block />;
