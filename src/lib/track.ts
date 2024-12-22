import { parseGPXFile, TrackPoint } from "@/lib/parser";

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

interface TrackSegment {
  distanceAtStart: number;
  distanceAtEnd: number;
  totalDistance: number;
  startTime: string;
  endTime: string;
  duration: string;
  averageHeartRate: number;
  averageCadence: number;
  averagePower: number;
  averagePace: string;
}

interface Track {
  name: string;
  type: string;
  time?: Date;
  sum: TrackSegment;
  segments?: TrackSegment[];
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

function sumTrackSegment(trackPoints: TrackPointWithMetadata[]): TrackSegment | undefined {
  if (!trackPoints || trackPoints.length === 0) {
    return undefined;
  }

  const totalDistance = trackPoints.reduce(
    (sum, tp) => sum + (tp.distanceFromLastPoint || 0),
    0
  );

  const startTime = trackPoints[0].time;
  const endTime = trackPoints[trackPoints.length - 1].time;
  const durationInSeconds = (endTime.getTime() - startTime.getTime()) / 1000; // duration in seconds

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const averageHeartRate =
    trackPoints.reduce((sum, tp) => sum + (tp.hr || 0), 0) / trackPoints.length;
  const averageCadence =
    trackPoints.reduce((sum, tp) => sum + (tp.cad || 0), 0) /
    trackPoints.length;
  const averagePower =
    trackPoints.reduce((sum, tp) => sum + (tp.power || 0), 0) /
    trackPoints.length;

  return {
    distanceAtStart: Math.round(trackPoints[0].distanceTraveledUntilThisPoint || 0),
    distanceAtEnd:
      Math.round(trackPoints[trackPoints.length - 1].distanceTraveledUntilThisPoint || 0),
    totalDistance: totalDistance,
    startTime: startTime.toTimeString().split(" ")[0],
    endTime: endTime.toTimeString().split(" ")[0],
    duration: duration,
    averageHeartRate: Math.round(averageHeartRate),
    averageCadence: Math.round(averageCadence),
    averagePower: Math.round(averagePower),
    averagePace: calculateAveragePace(trackPoints)
  };
}

function calculateAveragePace(trackPoints: TrackPointWithMetadata[]): string {
  let totalDistanceInMeters = 0;
  let totalTimeInMinutes = 0;

  let previousPoint: TrackPointWithMetadata | null = null;

  for (const point of trackPoints) {
    if (previousPoint) {
      totalDistanceInMeters += point.distanceFromLastPoint || 0;
      totalTimeInMinutes +=
        (point.time.getTime() - previousPoint.time.getTime()) / 60000; // convert milliseconds to minutes
    }
    previousPoint = point;
  }

  if (totalDistanceInMeters === 0) {
    return "00:00:00";
  }

  const averagePaceInMinutesPerKm =
    totalTimeInMinutes / (totalDistanceInMeters / 1000);
  const minutes = Math.floor(averagePaceInMinutesPerKm % 60);
  const seconds = Math.floor((averagePaceInMinutesPerKm * 60) % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function calculateTotalDistance(trackPoints: TrackPointWithMetadata[]): number {
  return trackPoints.reduce(
    (total, tp) => total + (tp.distanceFromLastPoint || 0),
    0
  );
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
