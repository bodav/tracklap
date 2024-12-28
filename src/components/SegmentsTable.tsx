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

const SegmentsTable: React.FC<SegmentsTableProps> = ({ segments }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
          <TableHead>Pace</TableHead>
          <TableHead>Power</TableHead>
          <TableHead>Heart Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {segments?.map((segment, index) => (
          <TableRow key={index}>
            <TableCell>#{index + 1}</TableCell>
            <TableCell>
              {(segment.distanceAtStart / 1000).toFixed(3)} km
            </TableCell>
            <TableCell>
              {(segment.distanceAtEnd / 1000).toFixed(3)} km
            </TableCell>
            <TableCell>{segment.averagePace}/min</TableCell>
            <TableCell>{segment.averagePower} W</TableCell>
            <TableCell>{segment.averageHeartRate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SegmentsTable;
