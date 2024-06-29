import { useState } from "react";
import { GridRowModes, useGridApiContext, useGridApiEventHandler } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { grey, lightGreen } from "@mui/material/colors";
import { NEW_ROW_TEMPORARY_ID, ROW_MODE } from "../lib/auxiliary.ts";

export const AddRow = () => {
  const apiRef = useGridApiContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useGridApiEventHandler(apiRef, "rowModesModelChange", (modes) => {
    setIsEditing(Object.values(modes)?.some(({ mode }) => mode === GridRowModes.Edit));
  });

  const onAdd = () => {
    if (apiRef.current.getRow(NEW_ROW_TEMPORARY_ID) || isEditing) return;

    apiRef.current.updateRows([
      {
        id: NEW_ROW_TEMPORARY_ID,
        documentName: "",
        documentType: "",
        documentStatus: "",
        employeeNumber: "",
        employeeSigDate: new Date().toISOString(),
        employeeSignatureName: "",
        companySigDate: new Date().toISOString(),
        companySignatureName: "",
        mode: ROW_MODE.add,
      },
    ]);
    apiRef.current.startRowEditMode({ id: NEW_ROW_TEMPORARY_ID, fieldToFocus: "documentName" });
  };

  return (
    <IconButton
      onClick={onAdd}
      sx={{ color: isEditing ? grey[400] : lightGreen[700], fontSize: "2rem" }}
    >
      <AddRoundedIcon fontSize="inherit" />
    </IconButton>
  );
};
