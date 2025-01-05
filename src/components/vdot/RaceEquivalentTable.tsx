import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@/components/ui/table";
import { RaceEquivalentPace } from "@/lib/vdot";

interface RaceEquivalentTableProps {
  racePaces: RaceEquivalentPace[];
}

const RaceEquivalentTable: React.FC<RaceEquivalentTableProps> = ({
  racePaces
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Distance</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Pace</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {racePaces?.map((race, index) => (
          <TableRow key={index}>
            <TableCell>{race.distance}</TableCell>
            <TableCell>{race.time}</TableCell>
            <TableCell>{race.pace} /km</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RaceEquivalentTable;
