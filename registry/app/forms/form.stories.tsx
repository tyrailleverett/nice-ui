import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Form1 } from "../form-1/form-1";
import { Form2 } from "../form-2/form-2";
import { Form3 } from "../form-3/form-3";
import { Form4 } from "../form-4/form-4";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Forms",
} satisfies Meta;

export const CheckoutSetup: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Ask for company name" })
    );
    await expect(
      canvas.getByRole("checkbox", { name: "Ask for company name" })
    ).toBeChecked();
  },
  render: () => <Form1 />,
};

export const InvoiceDetails: StoryFn = () => <Form2 />;

export const ApiKeys: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(
      canvas.queryByText("Keep secret keys server-side")
    ).not.toBeInTheDocument();
  },
  render: () => <Form3 />,
};

export const BusinessVerification: StoryFn = () => <Form4 />;
