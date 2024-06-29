import {
  GridEventListener,
  GridRowClassNameParams,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { NEW_ROW_TEMPORARY_ID } from "./auxiliary.ts";

export const getRowClassName = (params: GridRowClassNameParams) =>
  params.id === NEW_ROW_TEMPORARY_ID ? NEW_ROW_TEMPORARY_ID : "";

export const onRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
  if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    event.defaultMuiPrevented = true;
  }
};

export const onCellDoubleClick: GridEventListener<"cellDoubleClick"> = (_, event) => {
  event.defaultMuiPrevented = true;
};

export const onCellKeyDown: GridEventListener<"cellKeyDown"> = (_, event) => {
  event.defaultMuiPrevented = true;
};
