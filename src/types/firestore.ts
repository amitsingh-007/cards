import { z } from 'zod';
import { CardBrandEnum } from '.';

export const CardSchema = z.object({
  id: z.string(),
  cardBrand: CardBrandEnum,
  cardName: z.string(),
  cardLastDigits: z.number(),
  cardBillingDate: z.number(),
});
export type TCard = z.infer<typeof CardSchema>;

export const CardTransactionSchema = z.object({
  id: z.string(),
  cardId: z.string(),
  amount: z.number(),
  date: z.number(),
});
export type TCardTransaction = z.infer<typeof CardTransactionSchema>;
