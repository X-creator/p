import { CSSProperties } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { amber, deepPurple, orange, teal } from "@mui/material/colors";
import { CELL_CLASS_NAMES, COLUMN_GROUPS } from "./auxiliary.ts";

const COLUMN_GROUPS_STYLES: CSSProperties = {
  [`.${COLUMN_GROUPS.left} .MuiDataGrid-withBorderColor`]: {
    borderColor: teal[300],
  },
  [`.${COLUMN_GROUPS.center} .MuiDataGrid-withBorderColor`]: {
    borderColor: orange[900],
  },
  [`.${COLUMN_GROUPS.right} .MuiDataGrid-withBorderColor`]: {
    borderColor: deepPurple[400],
  },
};

const CELL_STYLES: CSSProperties = {
  [`.${CELL_CLASS_NAMES.date}.MuiDataGrid-cell`]: {
    color: teal.A100,
    whiteSpace: "normal",
  },
  [`.${CELL_CLASS_NAMES.employeeNumber}.MuiDataGrid-cell`]: {
    color: amber[900],
  },
};

export const StyledDataTable = styled(DataGrid)({
  ...COLUMN_GROUPS_STYLES,
  ...CELL_STYLES,
  "& .MuiDataGrid-cell": {
    lineHeight: 1.8,
    display: "flex",
    alignItems: "center",
  },
});
