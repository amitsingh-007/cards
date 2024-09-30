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
