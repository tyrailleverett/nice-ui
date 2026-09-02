import type { Meta, StoryFn } from "@storybook/react-vite";
import { CookieConsent3 } from "./cookie-consent-3";
export default { title: "Marketing/Cookie Consent" } satisfies Meta;
export const CompactNotice: StoryFn = () => (
  <div className="min-h-72">
    <CookieConsent3 />
  </div>
);
