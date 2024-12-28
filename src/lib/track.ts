import { parseGPXFile, TrackPoint } from "@/lib/parser";
import {
  calculateAveragePace,
  calculateTotalDistance,
  sumTrackSegment,
  TrackSegment
} from "@/lib/segment";

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
}

interface Track {
  name: string;
  type: string;
  time?: Date;
  sum: TrackSegment | undefined;
  segments?: Array<TrackSegment | undefined>;
}

async function getTrack(options: TrackOptions): Promise<Track> {
  const result = await parseGPXFile(options.gpx);
  calculateTrackPointMetadata(result.trackPoints);
  console.log(result);

  const totalDistance = calculateTotalDistance(result.trackPoints);
  console.log(`Total distance: ${totalDistance}`);

  const averagePace = calculateAveragePace(result.trackPoints);
  console.log(`Average Pace: ${averagePace} min/km`);

  const summary = sumTrackSegment(result.trackPoints);
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
): void {
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

    if (next.distanceFromLastPoint !== 0) {
      const paceMinutes = Math.floor(paceInMinutesPerKm);
      const paceSeconds = Math.floor((paceInMinutesPerKm - paceMinutes) * 60);
      next.pace = `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} min/km`;
      //console.log(`Speed: ${speed} m/s, Pace: ${next.pace}`);
    }

    return next;
  });

  trackPoints.shift(); // remove the first point, as it has no distance from the previous point
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

export default getTrack;
export type { Track, TrackSegment, TrackPointWithMetadata };
