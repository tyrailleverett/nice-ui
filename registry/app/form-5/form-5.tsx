import { CheckCircle2Icon, EyeIcon, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fields = [
  { label: "Project name", value: "Q3 planning" },
  { label: "Owner email", value: "maya@niceui.dev" },
];
export function Form5() {
  return (
    <main className="min-h-screen bg-muted/20 p-5 text-foreground sm:p-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-background">
        <header className="flex items-center gap-3 border-border border-b p-5">
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">
              Forms / Project intake
            </p>
            <h1 className="mt-1 font-semibold text-lg">Edit form</h1>
          </div>
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <CheckCircle2Icon className="size-4 text-primary" />
            All changes saved
          </span>
          <Button variant="outline">
            <EyeIcon data-icon="inline-start" />
            Preview
          </Button>
          <Button>
            <SaveIcon data-icon="inline-start" />
            Publish
          </Button>
        </header>
        <div className="grid lg:grid-cols-2">
          <section className="border-border border-b p-5 sm:p-7 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Fields</h2>
              <Button size="sm" variant="outline">
                Add field
              </Button>
            </div>
            <div className="mt-5 grid gap-4">
              {fields.map((field) => (
                <div
                  className="rounded-lg border border-border p-4"
                  key={field.label}
                >
                  <Label>{field.label}</Label>
                  <Input className="mt-2" defaultValue={field.value} />
                  <p className="mt-2 text-muted-foreground text-xs">
                    Required · Single line
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-muted/20 p-5 sm:p-7">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
              Live preview
            </p>
            <div className="mx-auto mt-5 max-w-sm rounded-xl border border-border bg-background p-5">
              <h2 className="font-semibold text-xl">
                Tell us about your project
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                A short form helps us route your request.
              </p>
              <div className="mt-6 grid gap-4">
                {fields.map((field) => (
                  <div key={field.label}>
                    <Label>{field.label}</Label>
                    <div className="mt-2 h-10 rounded-md border border-input bg-background" />
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full">Submit request</Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
