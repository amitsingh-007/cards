import { CardTransactionSchema } from '@/types/firestore';
import { z } from 'zod';
import { protectedProcedure } from './procedures';
import { t } from './trpc';
import {
  getAnnualSummary,
  getPaginatedTransactions,
  getTransactionsByMonthYear,
  saveTransaction,
} from '../services/transaction-service';
import { CardTransactionFormSchema } from '@/types/form';

const transactionRouter = t.router({
  getByMonthYear: protectedProcedure
    .input(z.object({ month: z.number(), year: z.number() }))
    .output(z.array(CardTransactionSchema))
    .query(async ({ ctx, input }) =>
      getTransactionsByMonthYear(ctx.user, input.month, input.year)
    ),

  getByPagination: protectedProcedure
    .input(z.object({ cursor: z.number() }))
    .output(z.array(CardTransactionSchema).optional())
    .query(async ({ ctx, input }) =>
      getPaginatedTransactions(ctx.user, input.cursor)
    ),

  getAnnualSummary: protectedProcedure
    .input(z.object({ year: z.number() }))
    .output(z.array(z.object({ month: z.string(), sum: z.number() })))
    .query(async ({ ctx, input }) => getAnnualSummary(ctx.user, input.year)),

  add: protectedProcedure
    .input(CardTransactionFormSchema)
    .mutation(async ({ ctx, input }) => saveTransaction(ctx.user, input)),
});

export default transactionRouter;
