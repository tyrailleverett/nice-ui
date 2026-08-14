import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  BellIcon,
  Building2Icon,
  CreditCardIcon,
  Globe2Icon,
  KeyRoundIcon,
  PlugZapIcon,
  Settings2Icon,
  SlidersHorizontalIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
import { useState } from "react";
import {
  SettingsLayout,
  SettingsModalLayout,
  type SettingsNavItem,
  SettingsPanel,
  SettingsRow,
} from "@/components/app/settings-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const accountNavigation: SettingsNavItem[] = [
  { icon: UserRoundIcon, id: "profile", label: "Profile" },
  { icon: Building2Icon, id: "workspace", label: "Workspace" },
  { icon: UsersRoundIcon, id: "team", label: "Team" },
  { icon: CreditCardIcon, id: "billing", label: "Billing" },
  { icon: SlidersHorizontalIcon, id: "preferences", label: "Preferences" },
];

const adminNavigation: SettingsNavItem[] = [
  { icon: Settings2Icon, id: "general", label: "General" },
  { icon: UserRoundIcon, id: "profile", label: "Profile" },
  { icon: UsersRoundIcon, id: "members", label: "Members" },
  { icon: KeyRoundIcon, id: "permissions", label: "Permissions" },
  { icon: BellIcon, id: "notifications", label: "Notifications" },
  { icon: PlugZapIcon, id: "integrations", label: "Integrations" },
];

function handleModalClose() {
  // Keep the static story frame open for inspection.
}

function ProfileContent() {
  return (
    <SettingsPanel
      description="Personal account information."
      title="Profile details"
    >
      <SettingsRow
        description="Shown in comments and mentions."
        label="Profile photo"
      >
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <Button variant="outline">Change photo</Button>
          <Button variant="ghost">Remove</Button>
        </div>
      </SettingsRow>
      <SettingsRow description="Used across your workspace." label="Full name">
        <Input defaultValue="Ava Chen" />
      </SettingsRow>
      <SettingsRow description="Primary sign-in email." label="Email address">
        <Input defaultValue="ava@example.com" type="email" />
      </SettingsRow>
      <SettingsRow description="Used in mentions and links." label="Username">
        <Input defaultValue="@avachen" />
      </SettingsRow>
      <SettingsRow description="Shown across your workspace." label="Role">
        <Select defaultValue="lead">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lead">Staff product lead</SelectItem>
            <SelectItem value="designer">Product designer</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>
    </SettingsPanel>
  );
}

function ProfilePreview({ modal = false }: { modal?: boolean }) {
  const [activeItem, setActiveItem] = useState("profile");
  const content = <ProfileContent />;

  if (modal) {
    return (
      <SettingsModalLayout
        activeItem={activeItem}
        description="Manage your account identity."
        navigation={accountNavigation}
        onClose={handleModalClose}
        onItemChange={setActiveItem}
        title="Profile"
      >
        {content}
      </SettingsModalLayout>
    );
  }

  return (
    <SettingsLayout
      activeItem={activeItem}
      description="Update your account, workspace, team, and billing."
      navigation={accountNavigation}
      onItemChange={setActiveItem}
      title="Account settings"
    >
      {content}
    </SettingsLayout>
  );
}

function AdminPreview() {
  const [activeItem, setActiveItem] = useState("general");
  return (
    <SettingsLayout
      activeItem={activeItem}
      description="Manage your profile, workspace defaults, access, and connected tools."
      headerActions={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Update</Button>
        </>
      }
      navigation={adminNavigation}
      onItemChange={setActiveItem}
      title="Admin settings"
      variant="tabs"
    >
      <div className="space-y-8">
        <SettingsPanel
          description="Keep your workspace identity and invite defaults tidy."
          title="Workspace basics"
        >
          <SettingsRow
            description="Used in shared pages and invites."
            label="Workspace name"
          >
            <Input defaultValue="Harbor Ops" />
          </SettingsRow>
          <SettingsRow
            description="Allow signups from trusted company domains."
            label="Invite domains"
          >
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">harborops.app</Button>
              <Button variant="outline">+ Add domain</Button>
            </div>
          </SettingsRow>
          <SettingsRow
            description="Use one color for key status and links."
            label="Accent color"
          >
            <div className="flex gap-2">
              <span className="size-7 rounded-full bg-muted ring-2 ring-ring ring-offset-2 ring-offset-card" />
              <span className="size-7 rounded-full bg-chart-2" />
              <span className="size-7 rounded-full bg-chart-4" />
              <span className="size-7 rounded-full bg-chart-5" />
            </div>
          </SettingsRow>
        </SettingsPanel>
        <SettingsPanel
          description="Choose how dates, language, and time are displayed."
          title="Regional preferences"
        >
          <SettingsRow
            description="Keep the workspace readable for the whole team."
            label="Language"
          >
            <div className="flex items-center gap-2">
              <Globe2Icon className="size-4 text-muted-foreground" />
              <span>English · Chicago</span>
            </div>
          </SettingsRow>
        </SettingsPanel>
      </div>
    </SettingsLayout>
  );
}

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Settings Layout",
} satisfies Meta;
export const AccountPage: StoryFn = () => <ProfilePreview />;
export const AdminTabs: StoryFn = () => <AdminPreview />;
export const ProfileModal: StoryFn = () => <ProfilePreview modal />;
