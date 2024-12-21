import { createContext, useState, use, ReactNode } from "react";
import { Track } from "@/lib/track";

interface TrackContextType {
  track: Track | null;
  setTrack: (track: Track) => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<Track | null>(null);

  return <TrackContext value={{ track, setTrack }}>{children}</TrackContext>;
};

export const useTrack = (): TrackContextType => {
  const context = use(TrackContext);
  if (context === undefined) {
    throw new Error("useTrack must be used within a TrackProvider");
  }
  return context;
};
