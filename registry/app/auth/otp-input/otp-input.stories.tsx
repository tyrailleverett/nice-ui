import type { Meta, StoryFn } from "@storybook/react-vite";

import { OtpInput } from "./otp-input";

export default {
  title: "App/Auth/OTP Input",
} satisfies Meta;

export const Default: StoryFn = () => (
  <div className="mx-auto w-full max-w-sm p-6">
    <OtpInput />
  </div>
);
