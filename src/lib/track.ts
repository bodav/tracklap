import { parseGPXFile, TrackPoint } from "@/lib/parser";
import { sumTrackSegment, TrackSegment } from "@/lib/segment";

interface TrackOptions {
  gpx: File;
  trimStart: number;
  trimEnd: number;
}

interface TrackPointWithMetadata extends TrackPoint {
  distanceFromLastPoint?: number;
  distanceTraveledUntilThisPoint?: number;
  speedInMetersPerSecond?: number;
  pace?: string;
  paceInMinutesPerKm?: number;
}

interface Track {
  name: string;
  type: string;
  time?: Date;
  sum: TrackSegment;
  segments: TrackSegment[];
}

async function getTrack(options: TrackOptions): Promise<Track> {
  const result = await parseGPXFile(options.gpx);
  let trackPoints = calculateTrackPointMetadata(result.trackPoints);

  if (options.trimStart || options.trimEnd) {
    trackPoints = trimTrackPoints(
      trackPoints,
      options.trimStart,
      options.trimEnd
    );
  }

  const summary = sumTrackSegment(trackPoints);
  return {
    name: result.name,
    type: result.type,
    time: result.time,
    sum: summary,
    segments: [summary]
  };
}

function calculateTrackPointMetadata(
  trackPoints: TrackPointWithMetadata[]
): TrackPointWithMetadata[] {
  trackPoints.reduce((prev, next) => {
    const distanceTraveledInMeters = haversineDistance(prev, next);
    next.distanceFromLastPoint = distanceTraveledInMeters;
    next.distanceTraveledUntilThisPoint =
      (prev.distanceTraveledUntilThisPoint || 0) + distanceTraveledInMeters;

    const timeInSeconds = (next.time.getTime() - prev.time.getTime()) / 1000;
    const speed = distanceTraveledInMeters / timeInSeconds;
    next.speedInMetersPerSecond = speed;

    const timeInMinutes = timeInSeconds / 60;
    const paceInMinutesPerKm =
      timeInMinutes / (distanceTraveledInMeters / 1000); // minutes per kilometer

    next.paceInMinutesPerKm = paceInMinutesPerKm;

    if (next.distanceFromLastPoint !== 0) {
      const paceMinutes = Math.floor(paceInMinutesPerKm);
      const paceSeconds = Math.floor((paceInMinutesPerKm - paceMinutes) * 60);
      next.pace = `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} min/km`;
    }

    return next;
  });

  trackPoints.shift(); // remove the first point, as it has no distance from the previous point
  return trackPoints;
}

function haversineDistance(coord1: TrackPoint, coord2: TrackPoint): number {
  const R = 6371.0 * 1000; // Radius of the Earth in meters
  const rlat1 = coord1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = coord2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (coord2.lon - coord1.lon) * (Math.PI / 180); // Radian difference (longitudes)

  const a =
    Math.sin(difflat / 2) * Math.sin(difflat / 2) +
    Math.cos(rlat1) *
      Math.cos(rlat2) *
      Math.sin(difflon / 2) *
      Math.sin(difflon / 2);
  const c = 2 * Math.asin(Math.sqrt(a));

  return R * c; // Distance in meters
}

function trimTrackPoints(
  trackPoints: TrackPointWithMetadata[],
  trimStart: number,
  trimEnd: number
): TrackPointWithMetadata[] {
  const totalDistance =
    trackPoints[trackPoints.length - 1].distanceTraveledUntilThisPoint || 0;

  const startIndex = trackPoints.findIndex(
    (point) => point.distanceTraveledUntilThisPoint! >= trimStart
  );

  const endIndex = trackPoints.findIndex(
    (point) => point.distanceTraveledUntilThisPoint! >= totalDistance - trimEnd
  );

  return trackPoints.slice(startIndex, endIndex + 1);
}

export default getTrack;
export type { Track, TrackSegment, TrackPointWithMetadata };
