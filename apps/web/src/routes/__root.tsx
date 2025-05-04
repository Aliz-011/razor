import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import appCss from "../index.css?url";
import Loader from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";

import type { AppRouter } from "../../../server/src/routers";

export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "My App",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.bunny.net'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.bunny.net/css?family=dm-sans:100,200,300,400,500,600,700,800,900|ibm-plex-mono:100,200,300,400,500,600,700|lora:400,500,600,700'
      }
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {isFetching ? (
          <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
            <Loader />
          </div>
        ) : <Outlet />}
        <Toaster richColors />
        {/* <TanStackRouterDevtools position="bottom-left" /> */}
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
