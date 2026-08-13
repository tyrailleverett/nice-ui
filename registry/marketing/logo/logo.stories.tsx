import type { Story } from "@ladle/react";

import { Logo, LogoIcon } from "./logo";

export const Wordmark: Story = () => (
  <Logo aria-label="Nice UI" className="h-6 w-auto" />
);

export const Icon: Story = () => (
  <LogoIcon aria-label="Nice UI" className="size-8" />
);

export const Sizes: Story = () => (
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
