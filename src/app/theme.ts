import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "glass" && {
            border: "1px solid rgba(255, 255, 255, 0.3)",
            background: "transparent",
            boxShadow: "-1px -1px 15px 0 white",
            backdropFilter: "blur(10px)",
            borderRadius: 10,
            backgroundImage: "radial-gradient(transparent, rgb(100 151 184 / 68%))",
            backgroundSize: 2,
            transform: "translateZ(0px)",
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "glass" && {
            background: "rgba(255, 255, 255, 0.13)",
            border: "2px solid rgba(255, 255, 255, 0.40)",
            minHeight: "2.75rem",
            letterSpacing: "0.1em",
            fontWeight: 600,
            color: "rgb(255 255 255 / 60%)",
            transition: "all 0.15s ease-out",
            boxShadow: "inset -3px -9px 13px rgb(255 255 255 / 60%)",
            "&:hover": {
              borderColor: "rgb(255 255 255 / 80%)",
              color: "rgb(255 255 255 / 80%)",
            },
            "&:active": {
              transitionDuration: "0.1s",
              scale: "0.98",
            },
          }),
        }),
      },
    },
  },
});
