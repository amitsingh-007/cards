import { TRPCError, initTRPC } from '@trpc/server';
import { getFirebaseUser, verifyAuthToken } from '../firebase-admin/auth';
import { ITRPCContext } from '@/types/trpc';

const getAuthBearer = (req: Request) =>
  req.headers.get('authorization')?.split('Bearer ')[1];

const getLoggedInUser = async (idToken: string | undefined) => {
  if (!idToken) {
    return null;
  }
  try {
    const { uid } = await verifyAuthToken(idToken, true);
    return await getFirebaseUser(uid);
  } catch (error) {
    console.error('Error in getLoggedInUser:', error);
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Firebase authorization failed',
    });
  }
};

export const createTRPCContext = async (
  req: Request
): Promise<ITRPCContext> => {
  const bearerToken = getAuthBearer(req);
  const user = await getLoggedInUser(bearerToken);

  return {
    user,
  };
};

export const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    errorFormatter({ shape }) {
      return shape;
    },
  });
