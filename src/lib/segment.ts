import { TrackPointWithMetadata } from "@/lib/track";

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
  trackPoints: TrackPointWithMetadata[];
}

function sumTrackSegment(trackPoints: TrackPointWithMetadata[]): TrackSegment {
  if (!trackPoints || trackPoints.length === 0) {
    throw new Error("No track points provided");
  }

  const totalDistance = calculateTotalDistance(trackPoints);

  const startTime = trackPoints[0].time;
  const endTime = trackPoints[trackPoints.length - 1].time;
  const durationInSeconds = (endTime.getTime() - startTime.getTime()) / 1000; // duration in seconds

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  const duration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const averageHeartRate =
    trackPoints.reduce((sum, tp) => sum + (tp.hr || 0), 0) / trackPoints.length;
  const averageCadence =
    trackPoints.reduce((sum, tp) => sum + (tp.cad || 0), 0) /
    trackPoints.length;
  const averagePower =
    trackPoints.reduce((sum, tp) => sum + (tp.power || 0), 0) /
    trackPoints.length;

  return {
    distanceAtStart: Math.round(
      trackPoints[0].distanceTraveledUntilThisPoint || 0
    ),
    distanceAtEnd: Math.round(
      trackPoints[trackPoints.length - 1].distanceTraveledUntilThisPoint || 0
    ),
    totalDistance: Math.round(totalDistance),
    startTime: startTime.toTimeString().split(" ")[0],
    endTime: endTime.toTimeString().split(" ")[0],
    duration: duration,
    averageHeartRate: Math.round(averageHeartRate),
    averageCadence: Math.round(averageCadence),
    averagePower: Math.round(averagePower),
    averagePace: calculateAveragePace(trackPoints),
    trackPoints: trackPoints
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

export { sumTrackSegment, calculateAveragePace, calculateTotalDistance };
export type { TrackSegment };
