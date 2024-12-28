import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrack } from "@/components/TrackProvider";
import { Fragment } from "react/jsx-runtime";

function SegmentsCard() {
  const { track } = useTrack();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="grid grid-cols-5 gap-2 my-2">
              {track?.segments?.map((seg, idx) => (
                <Fragment key={idx}>
                  <div className="text-left">
                    <span className="font-thin mr-4">{`#${idx + 1}`}</span>
                  </div>
                  <div className="text-right">
                    <span className="mr-1">{seg?.distanceAtEnd}</span>
                    <span className="text-sm font-thin">m</span>
                  </div>
                  <div className="text-right">
                    <span className="mr-1">{seg?.averagePace}</span>
                    <span className="text-sm font-thin">/min</span>
                  </div>
                  <div className="text-right">
                    <span className="mr-1">{seg?.averagePower}</span>
                    <span className="text-sm font-thin">w</span>
                  </div>
                  <div className="text-right">
                    <span className="mr-1">{seg?.averageHeartRate}</span>
                    <span className="text-sm font-thin">hr</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default SegmentsCard;
