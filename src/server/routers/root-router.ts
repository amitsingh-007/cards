import cardRouter from "./card-router";
import { t } from "./trpc";

export const rootRouter = t.router({
  card: cardRouter,
});

export type AppRouter = typeof rootRouter;
