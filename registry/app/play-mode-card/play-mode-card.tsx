import { ZapIcon } from "lucide-react";

import "@/components/app/cards-shared";
import { Button } from "@/components/ui/button";

export interface PlayModeCardProps {
  onTryDemo?: () => void;
}

export function PlayModeCard({ onTryDemo }: PlayModeCardProps) {
  return (
    <article className="showcase-card play-card">
      <div className="play-art">
        <span />
        <span />
      </div>
      <span className="outline-pill">Play mode</span>
      <h3>Practice trading safely</h3>
      <p>
        Analyze live market data to identify patterns
        <br />
        and respond with precision
      </p>
      <Button className="play-button" onClick={onTryDemo} type="button">
        <ZapIcon data-icon="inline-start" /> Try demo trading
      </Button>
    </article>
  );
}
