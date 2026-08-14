import type { Meta, StoryFn } from "@storybook/react-vite";

import { Register3 as Register3Block } from "./register-3";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "App/Auth/Register",
} satisfies Meta;

export const Simple: StoryFn = () => <Register3Block />;
