import { MoreVerticalIcon } from "lucide-react";
import { type AvatarItem, AvatarStack } from "@/components/app/cards-shared";
import { Button } from "@/components/ui/button";

export interface MeetingCardProps {
  attendeeCount?: number;
  attendees?: AvatarItem[];
  category?: string;
  description?: string;
  duration?: string;
  onJoin?: () => void;
  time?: string;
  title?: string;
}

export function MeetingCard({
  attendees,
  attendeeCount = 6,
  category = "Client meeting",
  description = "Collaborative sprint planning to address blockers, assign tasks, and refine deliverables for the upcoming development phase.",
  duration = "30 min",
  onJoin,
  time = "09:00 AM CET",
  title = "Apollo CRM – Sprint Planning",
}: MeetingCardProps) {
  return (
    <article className="showcase-card meeting-card">
      <div className="card-heading">
        <span>Meeting</span>
        <Button
          aria-label="More meeting options"
          size="icon"
          type="button"
          variant="ghost"
        >
          <MoreVerticalIcon />
        </Button>
      </div>
      <div className="meeting-panel">
        <div className="meeting-body">
          <div className="card-row card-row-between">
            <h3>{title}</h3>
            <span className="card-pill">{duration}</span>
          </div>
          <p className="card-time">{time}</p>
          <p className="card-description">{description}</p>
          <div className="meeting-meta">
            <AvatarStack avatars={attendees} count={attendeeCount} />
            <span className="card-pill">{category}</span>
          </div>
        </div>
        <Button
          className="h-auto min-h-14 w-full justify-start rounded-none px-6"
          onClick={onJoin}
          type="button"
          variant="ghost"
        >
          <span aria-hidden="true" className="meet-mark">
            <VideoMark />
          </span>
          Join meeting
        </Button>
      </div>
    </article>
  );
}

function VideoMark() {
  return (
    <span className="video-mark">
      <i />
      <b />
    </span>
  );
}
