import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { Doc } from "shared/model/schema.ts";

export const ROW_MODE = {
  add: "add",
  delete: "delete",
  update: "update",
  default: undefined,
} as const;

export const NEW_ROW_TEMPORARY_ID = "newRow";

export const CELL_CLASS_NAMES = {
  employeeNumber: "employeeNumber",
  date: "date",
} as const;

type CellClassNames = typeof CELL_CLASS_NAMES;

export const COLUMN_GROUPS = {
  left: "document",
  center: "employee",
  right: "company",
} as const;

type ColumnGroups = typeof COLUMN_GROUPS;

export type ColumnGroupingModel = GridColumnGroupingModel &
  {
    groupId: ColumnGroups[keyof ColumnGroups];
    children: { field: keyof Doc }[];
  }[];

export type Columns = (GridColDef & {
  field: keyof Doc | "actions";
  cellClassName?: CellClassNames[keyof CellClassNames];
})[];
