import { Injectable } from "@angular/core";
import { TrackSegment } from "./segment.service";

export interface ChartData {
  distance: string;
  speed: number;
}

@Injectable({
  providedIn: "root"
})
export class ChartService {
  constructor() {}

  getChartData(
    segment: TrackSegment | undefined,
    options: {
      removeOutliers?: boolean;
      outlierMethod?: "iqr" | "zscore" | "percentile";
      smoothingWindow?: number;
    } = {}
  ): ChartData[] {
    if (!segment) {
      return [];
    }

    const {
      removeOutliers = true,
      outlierMethod = "iqr",
      smoothingWindow = 5
    } = options;

    const rawData = segment.trackPoints.map((tp) => ({
      distance: Math.round(tp.distanceTraveledUntilThisPoint || 0).toString(),
      speed: tp.speedInMetersPerSecond || 0
    }));

    if (removeOutliers) {
      const cleanedData = this.removeSpeedOutliers(rawData, outlierMethod);
      return this.smoothSpeed(cleanedData, smoothingWindow);
    } else {
      return this.smoothSpeed(rawData, smoothingWindow);
    }
  }

  private removeSpeedOutliers(
    data: ChartData[],
    method: "iqr" | "zscore" | "percentile" = "iqr"
  ): ChartData[] {
    if (data.length === 0) return data;

    const speeds = data.map((d) => d.speed);

    switch (method) {
      case "iqr":
        return this.removeOutliersIQR(data, speeds);
      case "zscore":
        return this.removeOutliersZScore(data, speeds);
      case "percentile":
        return this.removeOutliersPercentile(data, speeds);
      default:
        return data;
    }
  }

  private removeOutliersIQR(data: ChartData[], speeds: number[]): ChartData[] {
    const sorted = [...speeds].sort((a, b) => a - b);
    const q1Index = Math.floor(sorted.length * 0.25);
    const q3Index = Math.floor(sorted.length * 0.75);

    const q1 = sorted[q1Index];
    const q3 = sorted[q3Index];
    const iqr = q3 - q1;

    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return data.filter((d) => d.speed >= lowerBound && d.speed <= upperBound);
  }

  private removeOutliersZScore(
    data: ChartData[],
    speeds: number[],
    threshold: number = 2.5
  ): ChartData[] {
    const mean = speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;
    const variance =
      speeds.reduce((sum, speed) => sum + Math.pow(speed - mean, 2), 0) /
      speeds.length;
    const stdDev = Math.sqrt(variance);

    return data.filter((d) => {
      const zScore = Math.abs((d.speed - mean) / stdDev);
      return zScore <= threshold;
    });
  }

  private removeOutliersPercentile(
    data: ChartData[],
    speeds: number[],
    lowerPercentile: number = 5,
    upperPercentile: number = 95
  ): ChartData[] {
    const sorted = [...speeds].sort((a, b) => a - b);
    const lowerIndex = Math.floor(sorted.length * (lowerPercentile / 100));
    const upperIndex = Math.floor(sorted.length * (upperPercentile / 100));

    const lowerBound = sorted[lowerIndex];
    const upperBound = sorted[upperIndex];

    return data.filter((d) => d.speed >= lowerBound && d.speed <= upperBound);
  }

  private smoothSpeed(data: ChartData[], windowSize: number): ChartData[] {
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
}
