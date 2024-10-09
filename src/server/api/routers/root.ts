import { protectedProcedure, publicProcedure } from "../procedures";
import { t } from "../trpc";

const extensionRouter = t.router({
  hello: protectedProcedure.query(() => {
    return {
      text: "Hello World!",
    };
  }),
});

export const appRouter = t.router({
  extension: extensionRouter,
});

export type AppRouter = typeof appRouter;
