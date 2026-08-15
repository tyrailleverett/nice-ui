import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";

import "../src/index.css";

const unframedMarketingTitles = new Set([
  "Marketing/Header",
  "Marketing/Logo",
  "Marketing/Decor Icon",
  "Marketing/Full Width Divider",
  "Marketing/Cookie Consent",
]);

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      parentSelector: "html",
      themes: {
        dark: "dark",
        light: "",
      },
    }),
    (Story, { title }) => {
      const isFramedMarketing =
        title.startsWith("Marketing/") && !unframedMarketingTitles.has(title);

      if (!isFramedMarketing) {
        return createElement(Story);
      }

      return createElement(
        "div",
        { className: "border-border border-x" },
        createElement(Story)
      );
    },
  ],
  parameters: {
    a11y: {
      config: {
        rules: [
          { enabled: false, id: "landmark-one-main" },
          { enabled: false, id: "page-has-heading-one" },
          { enabled: false, id: "region" },
        ],
      },
    },
    backgrounds: {
      disabled: true,
    },
  },
};

export default preview;
