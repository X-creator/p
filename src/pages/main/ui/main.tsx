import Box from "@mui/material/Box";
import DataTable from "widgets/data-table";

export const Main = () => (
  <Box
    component="main"
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100dvh",
      minWidth: 320,
      padding: "1rem 2rem",
    }}
  >
    <DataTable />
  </Box>
);
