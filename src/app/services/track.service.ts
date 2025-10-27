import { Injectable, signal } from "@angular/core";
import { ParserService, GPXTrack, TrackPoint } from "./parser.service";
import {
  SegmentService,
  TrackSegment,
  TrackPointWithMetadata
} from "./segment.service";

export interface TrackOptions {
  gpx: File;
  trimStart: number;
  trimEnd: number;
}

export interface Track {
  name: string;
  type: string;
  time?: Date;
  sum: TrackSegment;
  segments: TrackSegment[];
}

@Injectable({
  providedIn: "root"
})
export class TrackService {
  track = signal<Track | null>(null);

  constructor(
    private parserService: ParserService,
    private segmentService: SegmentService
  ) {}

  async getTrack(options: TrackOptions): Promise<Track> {
    const result = await this.parserService.parseGPXFile(options.gpx);
    let trackPoints = this.calculateTrackPointMetadata(result.trackPoints);

    if (options.trimStart || options.trimEnd) {
      trackPoints = this.trimTrackPoints(
        trackPoints,
        options.trimStart,
        options.trimEnd
      );
    }

    const summary = this.segmentService.sumTrackSegment(trackPoints);
    const track: Track = {
      name: result.name,
      type: result.type,
      time: result.time,
      sum: summary,
      segments: [summary]
    };

    this.track.set(track);
    return track;
  }

  private calculateTrackPointMetadata(
    trackPoints: TrackPointWithMetadata[]
  ): TrackPointWithMetadata[] {
    trackPoints.reduce((prev, next) => {
      const distanceTraveledInMeters = this.haversineDistance(prev, next);
      next.distanceFromLastPoint = distanceTraveledInMeters;
      next.distanceTraveledUntilThisPoint =
        (prev.distanceTraveledUntilThisPoint || 0) + distanceTraveledInMeters;

      const timeInSeconds = (next.time.getTime() - prev.time.getTime()) / 1000;
      const speed = distanceTraveledInMeters / timeInSeconds;
      next.speedInMetersPerSecond = speed;

      const timeInMinutes = timeInSeconds / 60;
      const paceInMinutesPerKm =
        timeInMinutes / (distanceTraveledInMeters / 1000);

      next.paceInMinutesPerKm = paceInMinutesPerKm;

      if (next.distanceFromLastPoint !== 0) {
        const paceMinutes = Math.floor(paceInMinutesPerKm);
        const paceSeconds = Math.floor((paceInMinutesPerKm - paceMinutes) * 60);
        next.pace = `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} min/km`;
      }

      return next;
    });

    trackPoints.shift();
    return trackPoints;
  }

  private haversineDistance(coord1: TrackPoint, coord2: TrackPoint): number {
    const R = 6371.0 * 1000;
    const rlat1 = coord1.lat * (Math.PI / 180);
    const rlat2 = coord2.lat * (Math.PI / 180);
    const difflat = rlat2 - rlat1;
    const difflon = (coord2.lon - coord1.lon) * (Math.PI / 180);

    const a =
      Math.sin(difflat / 2) * Math.sin(difflat / 2) +
      Math.cos(rlat1) *
        Math.cos(rlat2) *
        Math.sin(difflon / 2) *
        Math.sin(difflon / 2);
    const c = 2 * Math.asin(Math.sqrt(a));

    return R * c;
  }

  private trimTrackPoints(
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
      (point) =>
        point.distanceTraveledUntilThisPoint! >= totalDistance - trimEnd
    );

    return trackPoints.slice(startIndex, endIndex + 1);
  }
}
