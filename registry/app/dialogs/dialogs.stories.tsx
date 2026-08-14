/* biome-ignore-all lint/performance/noJsxPropsBind: Story triggers open dialogs from example buttons. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddWorkspaceAppDialog } from "../add-workspace-app-dialog/add-workspace-app-dialog";
import { CancelPlanDialog } from "../cancel-plan-dialog/cancel-plan-dialog";
import { ConnectGmailDialog } from "../connect-gmail-dialog/connect-gmail-dialog";
import { CreateEntryDialog } from "../create-entry-dialog/create-entry-dialog";
import { InviteTeammatesDialog } from "../invite-teammates-dialog/invite-teammates-dialog";
import { LaunchChecklistDialog } from "../launch-checklist-dialog/launch-checklist-dialog";
import { SelectDurationDialog } from "../select-duration-dialog/select-duration-dialog";
import { SetupHelpDialog } from "../setup-help-dialog/setup-help-dialog";

type DialogComponent = (props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => React.ReactNode;

const dialogExamples: [string, DialogComponent][] = [
  ["Select duration", SelectDurationDialog],
  ["Invite teammates", InviteTeammatesDialog],
  ["Cancel your plan", CancelPlanDialog],
  ["Launch checklist", LaunchChecklistDialog],
  ["Add a workspace app", AddWorkspaceAppDialog],
  ["Setup help", SetupHelpDialog],
  ["Create entry", CreateEntryDialog],
  ["Connect Gmail", ConnectGmailDialog],
];

function OpenDialog({ Component }: { Component: DialogComponent }) {
  const [open, setOpen] = useState(true);
  return <Component onOpenChange={setOpen} open={open} />;
}

const meta = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8 text-foreground">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "fullscreen" },
  title: "App / Dialogs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectDuration: Story = {
  render: () => <OpenDialog Component={SelectDurationDialog} />,
};
export const InviteTeammates: Story = {
  render: () => <OpenDialog Component={InviteTeammatesDialog} />,
};
export const CancelYourPlan: Story = {
  render: () => <OpenDialog Component={CancelPlanDialog} />,
};
export const LaunchChecklist: Story = {
  render: () => <OpenDialog Component={LaunchChecklistDialog} />,
};
export const AddWorkspaceApp: Story = {
  render: () => <OpenDialog Component={AddWorkspaceAppDialog} />,
};
export const SetupHelp: Story = {
  render: () => <OpenDialog Component={SetupHelpDialog} />,
};
export const CreateEntry: Story = {
  render: () => <OpenDialog Component={CreateEntryDialog} />,
};
export const ConnectGmail: Story = {
  render: () => <OpenDialog Component={ConnectGmailDialog} />,
};

export const AllDialogs: Story = {
  render: () => (
    <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
      {dialogExamples.map(([name, Component]) => (
        <OpenDialogButton Component={Component} key={name} name={name} />
      ))}
    </div>
  ),
};

function OpenDialogButton({
  Component,
  name,
}: {
  Component: (props: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => React.ReactNode;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        {name}
      </Button>
      <Component onOpenChange={setOpen} open={open} />
    </>
  );
}
