import { GridComparatorFn, GridSortDirection } from "@mui/x-data-grid";
import { NEW_ROW_TEMPORARY_ID } from "./auxiliary.ts";
import { Doc } from "shared/model/schema.ts";

export const customSortComparator: (sortDirection: GridSortDirection) => GridComparatorFn<Doc> =
  (sortDirection) => (v1, v2, cellParams1, cellParams2) => {
    if (cellParams1.id === NEW_ROW_TEMPORARY_ID) return -1;
    if (cellParams2.id === NEW_ROW_TEMPORARY_ID) return 1;

    const xFactor = sortDirection === "asc" ? 1 : -1;
    return v1 > v2 ? xFactor : v1 < v2 ? -xFactor : 0;
  };
