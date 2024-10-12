import { z } from 'zod';

export const formSchema = z.object({
  cardId: z.string(),
  amount: z.string().transform((val, ctx) => {
    const parsed = Number(val);
    if (Number.isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter valid amount',
      });
      return z.NEVER;
    }
    return parsed;
  }),
  date: z.date(),
});
