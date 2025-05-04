import { useEffect } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { AppSidebar } from './-components/app-sidebar'
import { SiteHeader } from './-components/site-header'

import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/honai')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = Route.useNavigate();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!session && !isPending) {
            navigate({
                to: "/login",
            });
        }
    }, [session, isPending]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <SidebarProvider>
            <AppSidebar variant='inset' />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <ThemeProvider defaultTheme="light" storageKey="honai-ui-theme">
                                <Outlet />
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
