import { z } from "zod";

export const CardBrandEnum = z.enum([
  "icici",
  "hdfc",
  "sbi",
  "kotak",
  "axis",
  "indusind",
  "hsbc",
  "niyo",
  "onecard",
]);

export type TCardBrand = z.infer<typeof CardBrandEnum>;

export const CardDataSchema = z.object({
  cardBrand: CardBrandEnum,
  cardName: z.string(),
  cardLastDigits: z.number(),
  cardBillingDate: z.number(),
});

export type TCardData = z.infer<typeof CardDataSchema>;

export const CardDataRecordSchema = z.record(z.string(), CardDataSchema);

export const CardTransactionFormSchema = z.object({
  cardId: z.string(),
  amount: z.number(),
  date: z.date(),
});

export type TCardTransactionForm = z.infer<typeof CardTransactionFormSchema>;

export const CardTransactionSchema = z.object({
  __shortKey: z.string(),
  __fullKey: z.string(),
  cardId: z.string(),
  amount: z.number(),
  date: z.number(),
});

export type TCardTransaction = z.infer<typeof CardTransactionSchema>;

export const CardTransactionRecordSchema = z.record(
  z.string(),
  CardTransactionSchema
);
