import type { Meta, StoryFn } from "@storybook/react-vite";

import { MarketingSection } from "./marketing-section";

export default {
  title: "Marketing/Marketing Section",
} satisfies Meta;

export const FramedColumn: StoryFn = () => (
  <MarketingSection padded>
    <p className="text-muted-foreground text-sm">
      Section content sits in a max-width column with a top hairline.
    </p>
  </MarketingSection>
);
