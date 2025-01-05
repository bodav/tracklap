import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@/components/ui/table";
import { TrackSegment } from "@/lib/segment";

interface SegmentsTableProps {
  segments: TrackSegment[];
}

const TrainingTable: React.FC<SegmentsTableProps> = ({ segments }) => {
  const trainingPaces = [
    { zone: "Easy (59 - 74 %vVO2max)", pace: "5:00 - 5:30" },
    { zone: "Marathon (59 - 74 %vVO2max)", pace: "4:30 - 4:45" },
    { zone: "Threshold (59 - 74 %vVO2max)", pace: "4:00 - 4:15" },
    { zone: "Interval (59 - 74 %vVO2max)", pace: "3:30 - 3:45" },
    { zone: "Repetition (59 - 74 %vVO2max)", pace: "3:00 - 3:15" }
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zone</TableHead>
          <TableHead>Pace</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trainingPaces?.map((train, index) => (
          <TableRow key={index}>
            <TableCell>{train.zone}</TableCell>
            <TableCell>{train.pace} /km</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TrainingTable;
