import {
  DialogFrame,
  type DialogProps,
  Footer,
} from "@/components/app/dialogs-shared";
import { Dialog } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InviteTeammatesDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogFrame
        description="Add emails and choose the role they start with."
        title="Invite teammates"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="invite-email">Invite by email</FieldLabel>
            <Input id="invite-email" placeholder="name@company.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="invite-role">Invite as</FieldLabel>
            <Select
              defaultValue="core"
              items={[
                { label: "Core member", value: "core" },
                { label: "Guest", value: "guest" },
              ]}
            >
              <SelectTrigger className="w-full" id="invite-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="core">Core member</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <Footer action="Send invite" />
      </DialogFrame>
    </Dialog>
  );
}
