import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QUERY_KEYS = { checkAuth: "checkAuth", docs: "docs" } as const;

export const MUTATION_KEYS = {
  auth: "auth",
  createDoc: "createDoc",
  updateDoc: "updateDoc",
  deleteDoc: "deleteDoc",
} as const;
