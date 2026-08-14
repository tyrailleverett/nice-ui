import { BanIcon, ShieldCheckIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const events = [
  {
    body: "Beacon traffic from N11 crossed the watched threshold.",
    id: "evt-1",
    initials: "SYS",
    name: "Cluster monitor",
    time: "12:04",
  },
  {
    body: "Auth vector on the same node jumped to 56 watched sessions.",
    id: "evt-2",
    initials: "SYS",
    name: "Auth sensor",
    time: "12:07",
  },
  {
    body: "Isolated N11 from the public webhook pool. Internal API still live.",
    id: "evt-3",
    initials: "AO",
    name: "Amara Ortiz",
    time: "12:11",
  },
  {
    body: "Waiting on a contain-or-restore decision before 12:40.",
    id: "evt-4",
    initials: "LH",
    name: "Lena Hoffman",
    time: "12:18",
  },
] as const;

export interface Detail3Props {
  className?: string;
  onContain?: () => void;
  onRestore?: () => void;
}

export function Detail3({ className, onContain, onRestore }: Detail3Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Security</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Active lanes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>INC-2041</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="border-destructive/30">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="destructive">Open decision</Badge>
              <Badge variant="outline">Cluster N11</Badge>
            </div>
            <CardTitle className="text-2xl">
              Beacon on N11 still needs a contain-or-restore call
            </CardTitle>
            <CardDescription>
              Public webhooks are already isolated. Internal API traffic is
              still flowing through the node.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button onClick={onRestore} type="button" variant="outline">
              <ShieldCheckIcon data-icon="inline-start" />
              Restore node
            </Button>
            <Button onClick={onContain} type="button" variant="destructive">
              <BanIcon data-icon="inline-start" />
              Contain N11
            </Button>
          </CardFooter>
        </Card>

        <ol className="flex flex-col">
          {events.map((event, index) => (
            <li className="grid grid-cols-[auto_1fr] gap-4" key={event.id}>
              <div className="flex flex-col items-center">
                <span className="font-mono text-muted-foreground text-xs tabular-nums">
                  {event.time}
                </span>
                {index < events.length - 1 ? (
                  <Separator className="mt-2 flex-1" orientation="vertical" />
                ) : null}
              </div>
              <article className="pb-8">
                <div className="flex items-center gap-2">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[10px]">
                      {event.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-medium text-sm">{event.name}</h2>
                </div>
                <p className="mt-2 text-sm">{event.body}</p>
                {index < events.length - 1 ? (
                  <Separator className="mt-6 lg:hidden" />
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
