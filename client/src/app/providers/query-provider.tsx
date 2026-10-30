import type {
  ReactNode,
} from "react";

import {
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  queryClient,
} from "../../lib/react-query/react-query";

/* ==========================================================
   Props
========================================================== */

interface QueryProviderProps {
  children: ReactNode;
}

/* ==========================================================
   Provider
========================================================== */

export default function QueryProvider({
  children,
}: QueryProviderProps) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  );
}