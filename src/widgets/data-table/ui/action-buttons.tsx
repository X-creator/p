import { GridActionsCellItem } from "@mui/x-data-grid";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { amber, blueGrey, grey, red, teal } from "@mui/material/colors";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

interface ActionButtonsProps {
  isIdle?: boolean;
  onClick: () => void;
}

export const EditButton = ({ isIdle, onClick }: ActionButtonsProps) => (
  <GridActionsCellItem
    icon={<EditRoundedIcon />}
    label="Edit"
    sx={{
      color: isIdle ? grey[400] : amber[400],
    }}
    onClick={onClick}
  />
);

export const DeleteButton = ({ isIdle, onClick }: ActionButtonsProps) => (
  <GridActionsCellItem
    icon={<DeleteRoundedIcon />}
    label="Delete"
    sx={{
      color: isIdle ? grey[400] : red[600],
    }}
    onClick={onClick}
  />
);

export const SaveButton = ({ onClick }: ActionButtonsProps) => (
  <GridActionsCellItem
    icon={<SaveRoundedIcon />}
    label="Save"
    sx={{
      color: teal[400],
    }}
    onClick={onClick}
  />
);

export const CancelSaveButton = ({ onClick }: ActionButtonsProps) => (
  <GridActionsCellItem
    icon={<CloseRoundedIcon />}
    label="CancelSave"
    sx={{
      color: blueGrey.A100,
    }}
    onClick={onClick}
  />
);

export const ConfirmDeleteButton = ({ onClick }: ActionButtonsProps) => (
  <GridActionsCellItem
    icon={<DeleteForeverRoundedIcon />}
    label="ConfirmDelete"
    sx={{
      color: red[700],
    }}
    onClick={onClick}
  />
);

export const CancelDeleteButton = ({ onClick }: ActionButtonsProps) => (
  <GridActionsCellItem
    key="CancelDelete"
    icon={<CloseRoundedIcon />}
    label="CancelDelete"
    sx={{
      color: blueGrey.A100,
    }}
    onClick={onClick}
  />
);
