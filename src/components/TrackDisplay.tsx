import React from "react";
import { useTrack } from "@/components/TrackProvider";

interface TrackDisplayProps {
  children: React.ReactNode;
}

const TrackDisplay: React.FC<TrackDisplayProps> = ({ children }) => {
  const { track } = useTrack();

  if (track) {
    return <>{children}</>;
  }

  return null;
};

export default TrackDisplay;
