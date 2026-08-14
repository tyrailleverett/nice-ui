import type { Meta, StoryFn } from "@storybook/react-vite";

import { CookieConsent2 as CookieConsent2Block } from "./cookie-consent-2";

export default {
  title: "Marketing/Cookie Consent",
} satisfies Meta;

export const CornerCard: StoryFn = () => (
  <div className="relative min-h-[24rem]">
    <CookieConsent2Block />
  </div>
);
