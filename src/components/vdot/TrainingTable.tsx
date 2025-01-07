import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@/components/ui/table";
import { TrainingPace } from "@/lib/vdot";

interface TrainingTableProps {
  trainingPaces: TrainingPace[];
}

const TrainingTable: React.FC<TrainingTableProps> = ({ trainingPaces }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zone</TableHead>
          <TableHead>Pace</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trainingPaces.map((train, index) => (
          <TableRow key={index}>
            <TableCell>
              {train.zone} ({train.zoneMin} - {train.zoneMax} %vVo2Max)
            </TableCell>
            <TableCell>
              {train.paceMin} - {train.paceMax} /km
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TrainingTable;
