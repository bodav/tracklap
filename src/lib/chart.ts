import { TrackSegment } from "@/lib/segment";

interface ChartData {
  distance: number;
  speed: number;
}

function getChartData(segment: TrackSegment | undefined): ChartData[] {
  if (!segment) {
    return [];
  }

  const rawData = segment.trackPoints.map((tp) => ({
    distance: tp.distanceTraveledUntilThisPoint || 0,
    speed: tp.speedInMetersPerSecond || 0
  }));

  const smoothedData = smoothSpeed(rawData, 10);

  return smoothedData;
}

function smoothSpeed(data: ChartData[], windowSize: number): ChartData[] {
  const smoothedData: ChartData[] = [];

  for (let i = 0; i < data.length; i++) {
    let sumSpeed = 0;
    let count = 0;

    for (let j = i; j < i + windowSize && j < data.length; j++) {
      sumSpeed += data[j].speed;
      count++;
    }

    const averageSpeed = sumSpeed / count;
    smoothedData.push({
      distance: data[i].distance,
      speed: averageSpeed
    });
  }

  return smoothedData;
}

export { getChartData };
export type { ChartData };
