import { CardDataRecordSchema } from "@/types/card";
import { getAllCards } from "../services/card-service";
import { protectedProcedure } from "./procedures";
import { t } from "./trpc";

const cardRouter = t.router({
  getAll: protectedProcedure
    .output(CardDataRecordSchema)
    .query(async ({ ctx }) => getAllCards(ctx.user)),
});

export default cardRouter;
