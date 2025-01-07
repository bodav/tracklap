interface RaceEquivalentPace {
  distance: string;
  time: string;
  pace: string;
}

interface TrainingPace {
  zone: string;
  zoneMin: number;
  zoneMax: number;
  paceMin: string;
  paceMax: string;
}

interface Vdot {
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

function calculateVdot(distanceInMeters: number, durationMilis: number): Vdot {
  const durationMinutes = durationMilis / 60000;
  const velocity = distanceInMeters / durationMinutes;
  const percentMax = calculatePercentMax(durationMinutes);
  const oxygenCost = calculateOxygenCost(velocity);
  const vdot = parseFloat((oxygenCost / percentMax).toFixed(2));

  const trainingPaces = calculateTrainingPaces(vdot, distanceInMeters);

  return {
    vdot: vdot,
    percentMax: percentMax,
    oxygenCost: oxygenCost,
    trainingPaces: trainingPaces,
    racePaces: []
  };
}

function calculateRacePaces(): RaceEquivalentPace[] {}

function calculateRacePrediction(
  approximation: number,
  distMeters: number,
  vdot: number,
  vdotMax: number
): number {
  // Newton-Raphson algorithm

  const real =
    (0.000104 * Math.pow(distMeters, 2) * Math.pow(approximation, -2) +
      0.182258 * distMeters * Math.pow(approximation, -1) -
      4.6) /
      (0.2989558 * Math.exp(-0.1932605 * approximation) +
        0.1894393 * Math.exp(-0.012778 * approximation) +
        0.8) -
    vdotMax;

  const derivative =
    ((0.2989558 * Math.exp(-0.1932605 * approximation) +
      0.1894393 * Math.exp(-0.012778 * approximation) +
      0.8) *
      (-0.000208 * Math.pow(distMeters, 2) * Math.pow(approximation, -3)) -
      0.182258 * distMeters * Math.pow(approximation, -2) -
      vdot *
        (0.2989558 * Math.exp(-0.1932605 * approximation) +
          0.1894393 * Math.exp(-0.012778 * approximation))) /
    Math.pow(
      0.2989558 * Math.exp(-0.1932605 * approximation) +
        0.1894393 * Math.exp(-0.012778 * approximation) +
        0.8,
      2
    );

  const result = approximation - real / derivative;
  return result;
}

function calculateTrainingPaces(
  vdot: number,
  distanceInMeters: number
): TrainingPace[] {
  return trainingZones.map((zone) => {
    const paceMin = calculateTargetPace(vdot, distanceInMeters, zone.zoneMin);
    const paceMax = calculateTargetPace(vdot, distanceInMeters, zone.zoneMax);

    return {
      zone: zone.zone,
      zoneMin: zone.zoneMin,
      zoneMax: zone.zoneMax,
      paceMin: paceMin,
      paceMax: paceMax
    };
  });
}

function calculateTargetPace(
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

function calculatePercentMax(raceDurationMinutes: number): number {
  return (
    0.8 +
    0.1894393 * Math.exp(-0.012778 * raceDurationMinutes) +
    0.2989558 * Math.exp(-0.1932605 * raceDurationMinutes)
  );
}

function calculateOxygenCost(velocity: number): number {
  return -4.6 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
}

export { calculateVdot };
export type { RaceEquivalentPace, TrainingPace, Vdot };
