import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useMemo, useState } from "react";

interface Alert {
  title?: string;
  content?: string;
}

export default function useAlert() {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<Alert>({
    title: "",
    content: "",
  });

  const onAlert = useCallback((title: string, content: string) => {
    setText({ title, content });
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setText({
      title: "",
      content: "",
    });
  }, []);

  const alert = useMemo(
    () => (
      <Dialog
        open={open}
        onClose={onClose}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{text.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [open, text, onClose],
  );

  return [alert, onAlert] as const;
}
