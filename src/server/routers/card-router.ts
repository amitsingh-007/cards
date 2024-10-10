import { CardDataRecordSchema } from "@/types/card";
import { getAllCards } from "../services/cards-service";
import { protectedProcedure } from "./procedures";
import { t } from "./trpc";

const cardRouter = t.router({
  getAll: protectedProcedure
    .output(CardDataRecordSchema)
    .query(async ({ ctx }) => {
      return getAllCards(ctx.user);
    }),
});

export default cardRouter;
