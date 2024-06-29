import { ReactElement } from "react";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { AddRow } from "../ui/add-row.tsx";
import { EditRow } from "../ui/edit-row.tsx";
import { Doc } from "shared/model/schema.ts";

export const renderDownloadLink = (params: GridRenderCellParams<object, string>) => (
  <Tooltip title={params.value}>
    <Button component="a" sx={{ textTransform: "none" }}>
      {params.value}
    </Button>
  </Tooltip>
);

export const renderAddRowAction = () => <AddRow />;

export const renderEditRowAction = (params: GridRowParams<Doc>): ReactElement[] => [
  <EditRow key="edit" row={params.row} />,
];
