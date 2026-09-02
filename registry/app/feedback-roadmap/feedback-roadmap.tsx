/* biome-ignore-all lint/performance/noJsxPropsBind: Board and dialog handlers intentionally close over local feedback state. */
import {
  ArrowUpIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  type Clock3Icon,
  LightbulbIcon,
  MessageSquareTextIcon,
  PlusIcon,
  SendIcon,
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RoadmapStatus = "Planned" | "In progress" | "Shipped";
type Priority = "High" | "Medium" | "Low";

interface FeedbackRequest {
  description: string;
  id: string;
  priority: Priority;
  status: RoadmapStatus;
  title: string;
  votes: number;
}

const initialRequests: FeedbackRequest[] = [
  {
    description:
      "Give every teammate a clear view of what changed and why, right from the workspace.",
    id: "release-notes",
    priority: "High",
    status: "In progress",
    title: "Share release notes with the whole team",
    votes: 148,
  },
  {
    description:
      "Let admins control exactly which projects each role can see and manage.",
    id: "roles",
    priority: "High",
    status: "Planned",
    title: "Granular roles and permissions",
    votes: 96,
  },
  {
    description:
      "Keep important account events in one searchable, exportable activity log.",
    id: "audit-log",
    priority: "Medium",
    status: "Planned",
    title: "Audit log for workspace activity",
    votes: 72,
  },
  {
    description:
      "Connect your favorite tools and automate the handoffs that slow your team down.",
    id: "integrations",
    priority: "Medium",
    status: "Shipped",
    title: "More integrations for your stack",
    votes: 214,
  },
  {
    description:
      "See the metrics that matter most to your team without assembling a report first.",
    id: "dashboard",
    priority: "Low",
    status: "Shipped",
    title: "A dashboard for your team's health",
    votes: 184,
  },
];

const columns: {
  description: string;
  icon: typeof Clock3Icon;
  name: RoadmapStatus;
}[] = [
  {
    description: "Ideas we are evaluating next",
    icon: LightbulbIcon,
    name: "Planned",
  },
  {
    description: "What the team is actively building",
    icon: SparklesIcon,
    name: "In progress",
  },
  {
    description: "Recently delivered to customers",
    icon: CheckCircle2Icon,
    name: "Shipped",
  },
];

const priorityVariant = {
  High: "destructive",
  Low: "secondary",
  Medium: "outline",
} as const;

export function FeedbackRoadmap() {
  const [requests, setRequests] = useState(initialRequests);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const toggleVote = (id: string) => {
    const hasVoted = votedIds.includes(id);
    setVotedIds((current) =>
      hasVoted ? current.filter((votedId) => votedId !== id) : [...current, id]
    );
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? { ...request, votes: request.votes + (hasVoted ? -1 : 1) }
          : request
      )
    );
  };

  const submitFeedback = () => {
    if (!(title.trim() && description.trim())) {
      return;
    }
    setSubmitted(true);
  };

  const resetDialog = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSubmitted(false);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <header className="flex flex-col gap-5 border-border border-b pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <div className="flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
              <CircleDotIcon className="size-3.5 text-chart-2" />
              Product feedback
            </div>
            <h1 className="font-heading font-semibold text-3xl tracking-tight sm:text-4xl">
              Help shape what comes next
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Vote for the improvements that matter most to your team. We will
              keep this board up to date as ideas move from conversation to
              shipped.
            </p>
          </div>
          <SubmitFeedbackDialog
            description={description}
            dialogOpen={dialogOpen}
            onDescriptionChange={setDescription}
            onOpenChange={resetDialog}
            onSubmit={submitFeedback}
            onTitleChange={setTitle}
            submitted={submitted}
            title={title}
          />
        </header>

        <section
          aria-label="Roadmap summary"
          className="grid gap-4 sm:grid-cols-3"
        >
          <SummaryCard
            detail="Since your last visit"
            label="Requests shipped"
            value="12"
          />
          <SummaryCard
            detail="Across 28 active requests"
            label="Community votes"
            value="2.4k"
          />
          <SummaryCard
            detail="We publish progress every week"
            label="Next update"
            value="Friday"
          />
        </section>

        <section
          aria-label="Product roadmap"
          className="grid items-start gap-5 lg:grid-cols-3"
        >
          {columns.map((column) => {
            const Icon = column.icon;
            const columnRequests = requests.filter(
              (request) => request.status === column.name
            );
            return (
              <div className="flex min-w-0 flex-col gap-4" key={column.name}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h2 className="font-heading font-semibold text-base">
                        {column.name}
                      </h2>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {column.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{columnRequests.length}</Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {columnRequests.map((request) => (
                    <FeedbackCard
                      key={request.id}
                      onVote={() => toggleVote(request.id)}
                      request={request}
                      voted={votedIds.includes(request.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <Card className="gap-0 py-0 shadow-none ring-border/70">
      <CardHeader className="gap-1 p-5 pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl tracking-tight">{value}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 text-muted-foreground text-xs">
        {detail}
      </CardContent>
    </Card>
  );
}

function FeedbackCard({
  onVote,
  request,
  voted,
}: {
  onVote: () => void;
  request: FeedbackRequest;
  voted: boolean;
}) {
  return (
    <Card className="gap-0 py-0 shadow-none ring-border/70 transition-colors hover:ring-foreground/25">
      <CardHeader className="gap-3 p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={priorityVariant[request.priority]}>
              {request.priority} priority
            </Badge>
            {request.status === "Shipped" && (
              <Badge variant="secondary">Live</Badge>
            )}
          </div>
          <MessageSquareTextIcon
            aria-hidden="true"
            className="size-4 text-muted-foreground"
          />
        </div>
        <CardTitle className="text-[15px] leading-snug">
          {request.title}
        </CardTitle>
        <CardDescription className="text-[13px] leading-relaxed">
          {request.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3 border-border border-t px-5 py-3">
        <span className="text-muted-foreground text-xs">
          {request.votes} votes
        </span>
        <Button
          aria-label={`${voted ? "Remove vote from" : "Vote for"} ${request.title}`}
          aria-pressed={voted}
          onClick={onVote}
          size="sm"
          variant={voted ? "default" : "outline"}
        >
          <ArrowUpIcon data-icon="inline-start" />
          {voted ? "Voted" : "Vote"}
        </Button>
      </CardContent>
    </Card>
  );
}

function SubmitFeedbackDialog({
  description,
  dialogOpen,
  onDescriptionChange,
  onOpenChange,
  onSubmit,
  onTitleChange,
  submitted,
  title,
}: {
  description: string;
  dialogOpen: boolean;
  onDescriptionChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onTitleChange: (value: string) => void;
  submitted: boolean;
  title: string;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={dialogOpen}>
      <DialogTrigger render={<Button className="sm:mb-1" />}>
        <PlusIcon data-icon="inline-start" />
        Submit feedback
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-7 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-chart-2/15 text-chart-2">
              <CheckCircle2Icon className="size-6" />
            </span>
            <DialogHeader className="items-center">
              <DialogTitle>Thanks for the thoughtful feedback</DialogTitle>
              <DialogDescription>
                We added your request to our review queue. We will let you know
                when it gains momentum.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="w-full sm:justify-center">
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>What should we build next?</DialogTitle>
              <DialogDescription>
                Share a clear idea and a little context. Other customers can
                vote on it once it is reviewed.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="feedback-title">Request title</Label>
                <Input
                  id="feedback-title"
                  onChange={(event) => onTitleChange(event.target.value)}
                  placeholder="e.g. Schedule reports to arrive in Slack"
                  value={title}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="feedback-description">
                  How would this help?
                </Label>
                <Textarea
                  id="feedback-description"
                  onChange={(event) => onDescriptionChange(event.target.value)}
                  placeholder="Tell us about the workflow or problem you are trying to solve."
                  rows={4}
                  value={description}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Cancel
              </Button>
              <Button
                disabled={!(title.trim() && description.trim())}
                onClick={onSubmit}
              >
                <SendIcon data-icon="inline-start" />
                Send feedback
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
