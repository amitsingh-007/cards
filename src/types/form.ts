import { z } from 'zod';

export const CardTransactionFormSchema = z.object({
  cardId: z.string(),
  amount: z.number(),
  date: z.number(),
});
export type TCardTransactionForm = z.infer<typeof CardTransactionFormSchema>;
