import { TRPCError, initTRPC } from "@trpc/server";
// import { ITRPCContext } from "./@types/trpc";
// import {
//   getFirebaseUser,
//   verifyAuthToken,
// } from "./services/firebaseAdminService";
// import { getAuthBearer, getIpAddress } from "./utils/headers";

interface ITRPCContext {}

// const getLoggedInUser = async (idToken: string | undefined) => {
//   if (!idToken) {
//     return null;
//   }
//   try {
//     const { uid } = await verifyAuthToken(idToken, true);
//     return await getFirebaseUser(uid);
//   } catch (error) {
//     console.error(error);
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//       message: "Firebase authorization failed",
//     });
//   }
// };

const getAuthBearer = (req: Request) =>
  req.headers.get("authorization")?.split?.("Bearer ")?.[1];

export const createTRPCContext = async (
  req: Request
): Promise<ITRPCContext> => {
  const { headers } = req;
  const bearerToken = getAuthBearer(req);
  // const user = await getLoggedInUser(bearerToken);

  return {
    // user,
  };
};

export const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    errorFormatter({ shape }) {
      return shape;
    },
  });
