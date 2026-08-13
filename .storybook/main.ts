import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  addons: ["@storybook/addon-themes", "@storybook/addon-mcp"],
  framework: "@storybook/react-vite",
  stories: ["../registry/**/*.stories.tsx"],
};

export default config;
