import { z } from 'zod';
import { addCard, getAllCards } from '../services/card-service';
import { protectedProcedure } from './procedures';
import { t } from './trpc';
import { CardFormSchema } from '@/types/form';
import { CardSchema } from '@/types/firestore';

const cardRouter = t.router({
  getAll: protectedProcedure
    .output(z.array(CardSchema))
    .query(async ({ ctx }) => getAllCards(ctx.user)),

  add: protectedProcedure
    .input(CardFormSchema)
    .mutation(async ({ ctx, input }) => addCard(ctx.user, input)),
});

export default cardRouter;
