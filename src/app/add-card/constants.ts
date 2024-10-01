import { CardBrandEnum, TCardBrand } from "@/types/card";
import { z } from "zod";

export const cardBrandList: { id: TCardBrand; name: string }[] = [
  {
    id: "icici",
    name: "ICICI",
  },
  {
    id: "hdfc",
    name: "HDFC",
  },
  {
    id: "sbi",
    name: "SBI",
  },
  {
    id: "kotak",
    name: "Kotak",
  },
  {
    id: "axis",
    name: "Axis",
  },
  {
    id: "indusind",
    name: "Indusind",
  },
  {
    id: "hsbc",
    name: "HSBC",
  },
  {
    id: "niyo",
    name: "Niyo",
  },
  {
    id: "onecard",
    name: "OneCard",
  },
];

export const getCardBrand = (brandName: string) =>
  cardBrandList.find((cardBrand) => cardBrand.id === brandName);

export const formSchema = z.object({
  cardBrand: CardBrandEnum,
  cardName: z.string().trim().min(1, "Card name is required"),
  cardLastDigits: z
    .string()
    .trim()
    .length(4, "Enter last 4 digits")
    .regex(/^\d+$/, "Card number should contain only digits")
    .transform((val) => Number(val)),
  cardBillingDate: z.string().transform((val, ctx) => {
    const parsed = Number(val);
    if (isNaN(parsed) || parsed < 1 || parsed > 31) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid date",
      });
      return z.NEVER;
    }
    return parsed;
  }),
});
