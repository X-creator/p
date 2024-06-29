import { redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { checkAuthQuery, docsQuery } from "shared/api/api.ts";

export const loader = (queryClient: QueryClient) => async () => {
  if (!navigator.serviceWorker.controller) return redirect("/auth");

  const isAuth = await queryClient.fetchQuery(checkAuthQuery);
  if (!isAuth) return redirect("/auth");

  return queryClient.fetchQuery(docsQuery);
};
