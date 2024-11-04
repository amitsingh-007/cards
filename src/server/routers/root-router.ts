import cardRouter from './card-router';
import transactionRouter from './transaction-router';
import { t } from './trpc';

export const rootRouter = t.router({
  card: cardRouter,
  transaction: transactionRouter,
});

export type AppRouter = typeof rootRouter;
