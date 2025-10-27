import { Injectable } from "@angular/core";

export interface RaceEquivalentPace {
  distance: string;
  time: string;
  pace: string;
}

export interface TrainingPace {
  zone: string;
  zoneMin: number;
  zoneMax: number;
  paceMin: string;
  paceMax: string;
}

export interface Vdot {
  vdot: number;
  percentMax: number;
  oxygenCost: number;
  trainingPaces: TrainingPace[];
  racePaces: RaceEquivalentPace[];
}

const trainingZones = [
  { zone: "Easy", zoneMin: 0.59, zoneMax: 0.74 },
  { zone: "Marathon", zoneMin: 0.75, zoneMax: 0.84 },
  { zone: "Threshold", zoneMin: 0.88, zoneMax: 0.92 },
  { zone: "Interval", zoneMin: 0.95, zoneMax: 1.0 },
  { zone: "Vo2Max", zoneMin: 0.975, zoneMax: 1.015 },
  { zone: "Repetition", zoneMin: 1.05, zoneMax: 1.1 },
  { zone: "Sprint", zoneMin: 1.1, zoneMax: 1.2 }
];

@Injectable({
  providedIn: "root"
})
export class VdotService {
  constructor() {}

  calculateVdot(distanceInMeters: number, durationMilis: number): Vdot {
    const durationMinutes = durationMilis / 60000;
    const velocity = distanceInMeters / durationMinutes;
    const percentMax = this.calculatePercentMax(durationMinutes);
    const oxygenCost = this.calculateOxygenCost(velocity);
    const vdot = parseFloat((oxygenCost / percentMax).toFixed(2));

    const trainingPaces = this.calculateTrainingPaces(vdot, distanceInMeters);

    return {
      vdot: vdot,
      percentMax: percentMax,
      oxygenCost: oxygenCost,
      trainingPaces: trainingPaces,
      racePaces: []
    };
  }

  private calculateTrainingPaces(
    vdot: number,
    distanceInMeters: number
  ): TrainingPace[] {
    return trainingZones.map((zone) => {
      const paceMin = this.calculateTargetPace(
        vdot,
        distanceInMeters,
        zone.zoneMin
      );
      const paceMax = this.calculateTargetPace(
        vdot,
        distanceInMeters,
        zone.zoneMax
      );

      return {
        zone: zone.zone,
        zoneMin: zone.zoneMin,
        zoneMax: zone.zoneMax,
        paceMin: paceMin,
        paceMax: paceMax
      };
    });
  }

  private calculateTargetPace(
    vdot: number,
    distanceInMeters: number,
    percentMax: number
  ): string {
    const targetPace =
      (distanceInMeters * 2 * 0.000104) /
      (-0.182258 +
        Math.sqrt(
          Math.pow(0.182258, 2) - 4 * 0.000104 * (-4.6 - percentMax * vdot)
        ));

    const pace = targetPace / (distanceInMeters / 1000);
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);

    return `${paceMinutes}:${paceSeconds < 10 ? "0" : ""}${paceSeconds}`;
  }

  private calculatePercentMax(raceDurationMinutes: number): number {
    return (
      0.8 +
      0.1894393 * Math.exp(-0.012778 * raceDurationMinutes) +
      0.2989558 * Math.exp(-0.1932605 * raceDurationMinutes)
    );
  }

  private calculateOxygenCost(velocity: number): number {
    return -4.6 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
  }
}
