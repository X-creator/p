import { Authentication, TokenProp } from "../model/schema.ts";
import { AUTH_HEADER, ORIGIN } from "shared/api/api.ts";

export const auth = async (data: Authentication, tokenProp: TokenProp) => {
  const response = await fetch(`${ORIGIN}/ru/data/v3/testmethods/docs/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [AUTH_HEADER]: JSON.stringify(tokenProp),
    },
    body: JSON.stringify(data),
  });
  return response.ok;
};
