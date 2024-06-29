import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const AppLoader = () => {
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  if (!isMutating && !isFetching) return null;

  return (
    <Backdrop sx={{ color: "rgba(255, 255, 255, 0.7)" }} open={isMutating > 0 || isFetching > 0}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
