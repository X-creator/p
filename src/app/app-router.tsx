import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AppLayout } from "./app-layout.tsx";
import { ErrorPage } from "./error-page.tsx";
import { authLoader } from "pages/auth";
import { mainLoader } from "pages/main";
import { queryClient } from "shared/lib/react-query.ts";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route
        index
        loader={mainLoader(queryClient)}
        lazy={async () => ({ Component: (await import("pages/main")).default })}
      />
      <Route
        path="auth"
        loader={authLoader(queryClient)}
        lazy={async () => ({ Component: (await import("pages/auth")).default })}
      />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Route>,
  ),
);
