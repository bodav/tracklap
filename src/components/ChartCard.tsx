import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useTrack } from "@/components/TrackProvider";
import { getChartData } from "@/lib/chart";
import SegmentsTable from "./SegmentsTable";

const chartConfig = {
  speed: {
    label: "#1",
    color: "hsl(var(--chart-1))"
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

export default function ChartCard() {
  const { track } = useTrack();

  const chartData = track ? getChartData(track.sum) : [];
  const segments = track ? track.segments : [];

  // https://recharts.org/en-US/examples/CustomContentOfTooltip

  return (
    <Card>
      <CardHeader>
        <CardTitle>Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] xl:h-[400px] 2xl:h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}>
            <CartesianGrid />
            <XAxis
              dataKey="distance"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={50}
              allowDuplicatedCategory={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="speed"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <SegmentsTable segments={segments} />
      </CardFooter>
    </Card>
  );
}
