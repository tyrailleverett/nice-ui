import type { Meta, StoryFn } from "@storybook/react-vite";

import { Onboarding1 } from "../onboarding-1/onboarding-1";
import { Onboarding2 } from "../onboarding-2/onboarding-2";
import { Onboarding3 } from "../onboarding-3/onboarding-3";
import { Onboarding4 } from "../onboarding-4/onboarding-4";
import { Onboarding5 } from "../onboarding-5/onboarding-5";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Onboarding",
} satisfies Meta;

export const SplitPreview: StoryFn = () => <Onboarding1 />;
export const SidebarRail: StoryFn = () => <Onboarding2 />;
export const DottedRail: StoryFn = () => <Onboarding3 />;
export const Modal: StoryFn = () => <Onboarding4 />;
export const MinimalFlow: StoryFn = () => <Onboarding5 />;
