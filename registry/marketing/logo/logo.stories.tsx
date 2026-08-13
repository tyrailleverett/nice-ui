import type { Meta, StoryFn } from "@storybook/react-vite";

import { Logo, LogoIcon } from "./logo";

export default {
  title: "Marketing/Logo",
} satisfies Meta;

export const Wordmark: StoryFn = () => (
  <Logo aria-label="Nice UI" className="h-6 w-auto" />
);

export const Icon: StoryFn = () => (
  <LogoIcon aria-label="Nice UI" className="size-8" />
);

export const Sizes: StoryFn = () => (
  <div className="flex flex-col gap-8">
    <div className="flex items-center gap-6">
      <Logo aria-hidden="true" className="h-4 w-auto" />
      <Logo aria-hidden="true" className="h-6 w-auto" />
      <Logo aria-hidden="true" className="h-8 w-auto" />
    </div>
    <div className="flex items-center gap-6">
      <LogoIcon aria-hidden="true" className="size-5" />
      <LogoIcon aria-hidden="true" className="size-8" />
      <LogoIcon aria-hidden="true" className="size-12" />
    </div>
  </div>
);
