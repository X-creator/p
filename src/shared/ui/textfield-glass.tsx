import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TextFieldGlass = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "rgb(255 255 255 / 85%)",
    background: "rgba(255, 255, 255, 0.13)",
    border: "2px solid rgba(255, 255, 255, 0.22)",
    borderBottom: "3px solid rgba(255, 255, 255, 0.22)",
    fontSize: 18,
    letterSpacing: "0.04em",
    height: "2.75rem",
    paddingLeft: "0.75rem",
    paddingRight: "1rem",
    borderRadius: 6,
    transition: "all 0.2s ease-out",
    "&:focus-within": {
      borderColor: "rgb(255 255 255 / 60%)",
    },
    "& fieldset": {
      display: "none",
    },
  },
});
