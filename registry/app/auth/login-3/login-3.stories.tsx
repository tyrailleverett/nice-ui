import type { Meta, StoryFn } from "@storybook/react-vite";

import { Login3 as Login3Block } from "./login-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Login",
} satisfies Meta;

export const Simple: StoryFn = () => <Login3Block />;
