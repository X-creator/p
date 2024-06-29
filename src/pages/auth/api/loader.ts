import { redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { checkAuthQuery } from "shared/api/api.ts";

export const loader = (queryClient: QueryClient) => async () => {
  if (!navigator.serviceWorker.controller) return null;

  const isAuth = await queryClient.fetchQuery(checkAuthQuery);
  return isAuth ? redirect("/") : null;
};
