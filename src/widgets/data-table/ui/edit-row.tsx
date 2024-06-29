import { useState } from "react";
import { GridState, useGridApiContext, useGridApiEventHandler } from "@mui/x-data-grid";
import {
  CancelDeleteButton,
  CancelSaveButton,
  ConfirmDeleteButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from "./action-buttons.tsx";
import { ROW_MODE } from "../lib/auxiliary.ts";
import { useIsPending } from "../lib/useIsPending.ts";
import { Doc } from "shared/model/schema.ts";

interface EditRowProps {
  row: Doc & { mode?: (typeof ROW_MODE)[keyof typeof ROW_MODE] };
}

export const EditRow = ({ row }: EditRowProps) => {
  const apiRef = useGridApiContext();
  const isPending = useIsPending(row.id);
  const [isGlobalEditing, setIsGlobalEditing] = useState<boolean>(false);

  useGridApiEventHandler(apiRef, "stateChange", (state: GridState) => {
    const currentRow = state.rows.dataRowIdToModelLookup[row.id] as EditRowProps["row"];

    if (currentRow && currentRow.mode === ROW_MODE.default && state.editRows[row.id]) {
      apiRef.current.updateRows([
        {
          id: row.id,
          mode: ROW_MODE.update,
        },
      ]);
    }
    if (currentRow && currentRow.mode === ROW_MODE.update && !state.editRows[row.id]) {
      apiRef.current.updateRows([
        {
          id: row.id,
          mode: ROW_MODE.default,
        },
      ]);
    }
    setIsGlobalEditing(Object.values(state.editRows).length > 0);
  });

  const onEdit = () => {
    if (isGlobalEditing || isPending) return;
    apiRef.current.startRowEditMode({ id: row.id, fieldToFocus: "documentName" });
  };

  const onDelete = () => {
    if (isPending) return;
    apiRef.current.updateRows([{ id: row.id, mode: ROW_MODE.delete }]);
  };

  const onSave = () => {
    apiRef.current.stopRowEditMode({ id: row.id });
  };

  const onCancelSave = () => {
    apiRef.current.stopRowEditMode({ id: row.id, ignoreModifications: true });
  };

  const onConfirmDelete = () => {
    apiRef.current.startRowEditMode({ id: row.id });
    queueMicrotask(() => {
      apiRef.current.stopRowEditMode({ id: row.id });
    });
  };

  const onCancelDelete = () => {
    apiRef.current.updateRows([{ id: row.id, mode: ROW_MODE.default }]);
  };

  const onDenial = () => {
    apiRef.current.stopRowEditMode({ id: row.id, ignoreModifications: true });
    apiRef.current.updateRows([{ id: row.id, _action: "delete" }]);
  };

  if (row.mode === ROW_MODE.default)
    return [
      <EditButton key="Edit" isIdle={isGlobalEditing || isPending} onClick={onEdit} />,
      <DeleteButton key="Delete" isIdle={isPending} onClick={onDelete} />,
    ];

  if (row.mode === ROW_MODE.add)
    return [
      <SaveButton key="Save" onClick={onSave} />,
      <ConfirmDeleteButton key="ConfirmDelete" onClick={onDenial} />,
    ];

  if (row.mode === ROW_MODE.update)
    return [
      <SaveButton key="Save" onClick={onSave} />,
      <CancelSaveButton key="CancelSave" onClick={onCancelSave} />,
    ];

  if (row.mode === ROW_MODE.delete)
    return [
      <ConfirmDeleteButton key="ConfirmDelete" onClick={onConfirmDelete} />,
      <CancelDeleteButton key="CancelDelete" onClick={onCancelDelete} />,
    ];
};
