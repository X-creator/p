import { Outlet } from "react-router-dom";
import { AppLoader } from "./app-loader";

export const AppLayout = () => {
  return (
    <>
      <Outlet />
      <AppLoader />
    </>
  );
};
