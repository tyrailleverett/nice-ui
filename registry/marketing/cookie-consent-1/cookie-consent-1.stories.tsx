import type { Meta, StoryFn } from "@storybook/react-vite";

import { CookieConsent1 as CookieConsent1Block } from "./cookie-consent-1";

export default {
  title: "Marketing/Cookie Consent",
} satisfies Meta;

export const BottomBar: StoryFn = () => (
  <div className="relative min-h-[24rem]">
    <CookieConsent1Block />
  </div>
);
