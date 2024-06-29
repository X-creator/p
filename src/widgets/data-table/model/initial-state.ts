import { GridInitialState } from "@mui/x-data-grid";

export const initialState: GridInitialState = {
  sorting: {
    sortModel: [
      {
        field: "employeeSigDate",
        sort: "desc",
      },
    ],
  },
};
