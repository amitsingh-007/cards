import { getClientIdToken } from '@/helpers/firebase/auth';
import type { AppRouter } from '@/server/routers/root-router';
import env from '@/server/env.mjs';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

const getBaseUrl = () => {
  // eslint-disable-next-line unicorn/prefer-global-this
  if (typeof window !== 'undefined') {
    return '';
  }
  return env.VERCEL_URL;
};

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: (opts) => {
        if (env.NEXT_PUBLIC_VERCEL_ENV === 'development') {
          return true;
        }
        return opts.direction === 'down' && opts.result instanceof Error;
      },
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      headers: async () => {
        const idToken = await getClientIdToken();
        return {
          authorization: idToken ? `Bearer ${idToken}` : undefined,
        };
      },
    }),
  ],
});
