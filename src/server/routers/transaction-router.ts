import {
  CardTransactionFormSchema,
  CardTransactionRecordSchema,
} from '@/types/card';
import { z } from 'zod';
import { protectedProcedure } from './procedures';
import { t } from './trpc';
import {
  getPaginatedTransactions,
  getTransactionsByMonthYear,
  saveTransaction,
} from '../services/transaction-service';

const transactionRouter = t.router({
  getByMonthYear: protectedProcedure
    .input(z.object({ month: z.number(), year: z.number() }))
    .output(CardTransactionRecordSchema)
    .query(async ({ ctx, input }) =>
      getTransactionsByMonthYear(ctx.user, input.month, input.year)
    ),

  getByPagination: protectedProcedure
    .input(z.object({ cursor: z.number() }))
    .output(CardTransactionRecordSchema.optional())
    .query(async ({ ctx, input }) =>
      getPaginatedTransactions(ctx.user, input.cursor)
    ),

  add: protectedProcedure
    .input(CardTransactionFormSchema)
    .mutation(async ({ ctx, input }) => saveTransaction(ctx.user, input)),
});

export default transactionRouter;
