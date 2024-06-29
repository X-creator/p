import { z } from "zod";

export const AuthenticationSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^user\d+$/, { message: "username error" }),
    password: z
      .string()
      .trim()
      .regex(/^password$/, { message: "password error" }),
  })
  .strict();

export type Authentication = z.infer<typeof AuthenticationSchema>;

export const TokenPropSchema = z.string().array().nonempty();

export type TokenProp = z.infer<typeof TokenPropSchema>;
