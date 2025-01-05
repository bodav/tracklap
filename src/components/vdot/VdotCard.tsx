import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
//import { useTrack } from "@/components/TrackProvider";
import TrainingTable from "./TrainingTable";
import RaceEquivalentTable from "./RaceEquivalentTable";

function VdotCard() {
  //const { track } = useTrack();

  const racePaces = [
    { distance: "5K", time: "20:00", pace: "4:00" },
    { distance: "10K", time: "40:00", pace: "4:00" },
    { distance: "Half Marathon", time: "1:30:00", pace: "4:15" },
    { distance: "Marathon", time: "3:00:00", pace: "4:15" }
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>VDOT</CardTitle>
          <CardDescription>vVo2Max estimate</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <span className="font-thin text-sm block">
                  VDOT - Effective VO2max
                </span>
                <span className="font-bold block text-2xl">44.11</span>
              </div>
              <div className="text-center">
                <span className="font-thin text-sm block">
                  Percent of Max Oxygen Uptake
                </span>
                <span className="font-bold block text-2xl">55%</span>
              </div>
              <div className="text-center">
                <span className="font-thin text-sm block">
                  Oxygen Cost (ml/kg/min)
                </span>
                <span className="font-bold block text-2xl">44.11</span>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-20 mt-12">
                <div className="mx-8">
                  <div className="text-2xl font-semibold leading-none tracking-tight mb-2">
                    Training Paces
                  </div>
                  <TrainingTable segments={[]} />
                </div>
                <div className="mx-8">
                  <div className="text-2xl font-semibold leading-none tracking-tight mb-2">
                    Equivalent Race Performances
                  </div>
                  <RaceEquivalentTable racePaces={racePaces} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default VdotCard;
