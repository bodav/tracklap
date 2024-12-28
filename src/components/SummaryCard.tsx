import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { useTrack } from "@/components/TrackProvider";

function SummaryCard() {
  const { track } = useTrack();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>
            {track?.name ? track.name : ""}{" "}
            {track?.time ? `- ${track.time.toLocaleString()}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <span className="font-thin text-sm block">Duration</span>
              <span className="font-bold block text-2xl">
                {track?.sum?.duration}
              </span>
            </div>
            <div className="text-center">
              <span className="font-thin text-sm block">Distance</span>
              <span className="font-bold block text-2xl">{`${(track?.sum?.distanceAtEnd || 0) / 1000} km`}</span>
            </div>
            <div className="text-center">
              <span className="font-thin text-sm block">Avg. Pace</span>
              <span className="font-bold block text-2xl">{`${track?.sum?.averagePace || ""}/min`}</span>
            </div>
            <div className="text-center">
              <span className="font-thin text-sm block">Avg. Heartrate</span>
              <span className="font-bold block text-2xl">
                {track?.sum?.averageHeartRate}
              </span>
            </div>
            <div className="text-center">
              <span className="font-thin text-sm block">Avg. Cadance</span>
              <span className="font-bold block text-2xl">
                {track?.sum?.averageCadence}
              </span>
            </div>
            <div className="text-center">
              <span className="font-thin text-sm block">Avg. Power</span>
              <span className="font-bold block text-2xl">{`${track?.sum?.averagePower || ""} W`}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default SummaryCard;
