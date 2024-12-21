import { z } from 'zod';
import { CardBrandEnum } from '.';

export const CardFormSchema = z.object({
  cardBrand: CardBrandEnum,
  cardName: z.string(),
  cardLastDigits: z.number(),
  cardBillingDate: z.number(),
});
export type TCardForm = z.infer<typeof CardFormSchema>;

export const CardTransactionFormSchema = z.object({
  cardId: z.string(),
  amount: z.number(),
  date: z.number(),
});
export type TCardTransactionForm = z.infer<typeof CardTransactionFormSchema>;
