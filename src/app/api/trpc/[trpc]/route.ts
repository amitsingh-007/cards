import { appRouter } from "@/server/api/routers/root";
import { createTRPCContext } from "@/server/api/trpc";
import env from "@/server/env.mjs";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext(req),
    onError:
      env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? undefined
        : ({ path, error }) => {
            console.error(`tRPC failed on ${path}: ${error}`);
          },
  });
};
export { handler as GET, handler as POST };
