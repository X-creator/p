declare global {
  declare module "@mui/material/Paper" {
    interface PaperPropsVariantOverrides {
      glass: true;
    }
  }

  declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
      glass: true;
    }
  }
}
