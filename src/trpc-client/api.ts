import { getClientIdToken } from "@/helpers/firebase/auth";
import { AppRouter } from "@/server/api/routers/root";
import env from "@/server/env.mjs";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  return env.VERCEL_URL;
};

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) => {
        if (env.NEXT_PUBLIC_VERCEL_ENV === "development") {
          return true;
        }
        return opts.direction === "down" && opts.result instanceof Error;
      },
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      headers: async () => ({
        authorization: `Bearer ${await getClientIdToken()}`,
      }),
    }),
  ],
});
