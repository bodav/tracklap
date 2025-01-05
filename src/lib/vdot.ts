interface RaceEquivalentPace {
  distance: string;
  time: string;
  pace: string;
}

interface TrainingPace {
  distance: number;
  pace: string;
}

interface Vdot {
  vdot: number;
  percentMax: number;
  oxygenCost: number;
  trainingPaces: TrainingPace[];
  racePaces: RaceEquivalentPace[];
}

function calculateVdot(distance: number, timeInMinutes: number): Vdot {
  return {
    vdot: 0,
    percentMax: 0,
    oxygenCost: 0,
    trainingPaces: [],
    racePaces: []
  };
}

export { calculateVdot };
export type { RaceEquivalentPace };
