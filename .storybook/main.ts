import type { StorybookConfig } from "storybook-react-rsbuild";

const config: StorybookConfig = {
  addons: ["@storybook/addon-a11y", "@storybook/addon-themes", "@storybook/addon-mcp"],
  framework: "storybook-react-rsbuild",
  stories: ["../registry/**/*.stories.tsx"],
};

export default config;
