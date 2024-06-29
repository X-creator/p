import { z } from "zod";

export const DocSchema = z
  .object({
    id: z.string().uuid(),
    companySigDate: z.string().datetime(),
    companySignatureName: z.string(),
    documentName: z.string(),
    documentStatus: z.string(),
    documentType: z.string(),
    employeeNumber: z.string(),
    employeeSigDate: z.string().datetime(),
    employeeSignatureName: z.string(),
  })
  .strict();

export type Doc = z.infer<typeof DocSchema>;
