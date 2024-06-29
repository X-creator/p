import { DocSchema } from "shared/model/schema.ts";
import { z } from "zod";

export const ValidDocSchema = DocSchema.extend({
  companySignatureName: z.string().trim().min(1),
  documentName: z.string().trim().min(1),
  documentStatus: z.string().trim().min(1),
  documentType: z.string().trim().min(1),
  employeeNumber: z.string().trim().min(1),
  employeeSignatureName: z.string().trim().min(1),
}).strip();

export const NewDocSchema = ValidDocSchema.omit({ id: true });
