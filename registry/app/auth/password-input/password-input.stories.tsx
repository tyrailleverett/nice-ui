import type { Meta, StoryFn } from "@storybook/react-vite";

import { PasswordInput } from "./password-input";

export default {
  title: "App/Auth/Password Input",
} satisfies Meta;

export const Default: StoryFn = () => (
  <div className="mx-auto w-full max-w-sm p-6">
    <PasswordInput />
  </div>
);

export const StrengthIndicator: StoryFn = () => (
  <div className="mx-auto w-full max-w-sm p-6">
    <PasswordInput autoComplete="new-password" showStrengthIndicator />
  </div>
);
