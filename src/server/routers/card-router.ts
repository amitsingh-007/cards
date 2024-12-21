import { CardDataRecordSchema, CardDataSchema } from '@/types/firestore';
import { addCard, getAllCards } from '../services/card-service';
import { protectedProcedure } from './procedures';
import { t } from './trpc';

const cardRouter = t.router({
  getAll: protectedProcedure
    .output(CardDataRecordSchema)
    .query(async ({ ctx }) => getAllCards(ctx.user)),

  add: protectedProcedure
    .input(CardDataSchema)
    .mutation(async ({ ctx, input }) => addCard(ctx.user, input)),
});

export default cardRouter;
