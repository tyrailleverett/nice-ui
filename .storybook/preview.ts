import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";

import "../src/index.css";

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
