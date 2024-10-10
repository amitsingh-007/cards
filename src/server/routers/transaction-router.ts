import { CardTransactionRecordSchema } from "@/types/card";
import { z } from "zod";
import { protectedProcedure } from "./procedures";
import { t } from "./trpc";
import { getTransactionsByMonthYear } from "../services/transaction-service";

const transactionRouter = t.router({
  getByMonthYear: protectedProcedure
    .input(z.object({ month: z.number(), year: z.number() }))
    .output(CardTransactionRecordSchema)
    .query(async ({ ctx, input }) =>
      getTransactionsByMonthYear(ctx.user, input.month, input.year)
    ),
});

export default transactionRouter;
