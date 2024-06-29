import { z } from "zod";
import { QUERY_KEYS } from "../lib/react-query.ts";
import { Doc, DocSchema } from "../model/schema.ts";
import { queryOptions } from "@tanstack/react-query";

export const ORIGIN = "https://test.v5.pryaniky.com";
export const AUTH_HEADER = "custom";
export const TOKENIFY_HEADER = "x-auth";
export const CHECK_AUTH_HEADER = "check-auth";

const checkAuth = async () => {
  const response = await fetch(`${ORIGIN}/ru`, {
    headers: { [CHECK_AUTH_HEADER]: "" },
  });
  return response.ok;
};

export const checkAuthQuery = queryOptions({
  queryKey: [QUERY_KEYS.checkAuth] as const,
  queryFn: checkAuth,
  staleTime: 20 * 60 * 1000,
});

const getDocs = async () => {
  const response = await fetch(`${ORIGIN}/ru/data/v3/testmethods/docs/userdocs/get`, {
    headers: { [TOKENIFY_HEADER]: "" },
  });
  const { data } = (await response.json()) as { data: Doc[] };
  return z.array(DocSchema).parse(data);
};

export const docsQuery = queryOptions({
  queryKey: [QUERY_KEYS.docs] as const,
  queryFn: getDocs,
  staleTime: 20 * 60 * 1000,
  structuralSharing: false,
});

export const createDoc = async (doc: Omit<Doc, "id">) => {
  const response = await fetch(`${ORIGIN}/ru/data/v3/testmethods/docs/userdocs/create`, {
    method: "POST",
    headers: {
      [TOKENIFY_HEADER]: "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doc),
  });
  const { data } = (await response.json()) as { data: Doc };
  return DocSchema.parse(data);
};

export const updateDoc = async (doc: Doc) => {
  const response = await fetch(`${ORIGIN}/ru/data/v3/testmethods/docs/userdocs/set/${doc.id}`, {
    method: "POST",
    headers: {
      [TOKENIFY_HEADER]: "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doc),
  });
  const { data } = (await response.json()) as { data: Doc };
  return DocSchema.parse(data);
};

export const deleteDoc = async (docId: Doc["id"]) => {
  const response = await fetch(`${ORIGIN}/ru/data/v3/testmethods/docs/userdocs/delete/${docId}`, {
    method: "POST",
    headers: {
      [TOKENIFY_HEADER]: "",
    },
  });
  return (await response.json()) as { error_code: number };
};
