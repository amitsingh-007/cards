"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./contexts/user-context";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        <UserContextProvider>{children}</UserContextProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
