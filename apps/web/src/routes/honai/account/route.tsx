import { Separator } from '@/components/ui/separator'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarNav } from './-components/sidebar-nav'

export const Route = createFileRoute('/honai/account')({
  component: RouteComponent,
})

const sidebarNavItems = [
  {
    title: "Account",
    href: "/honai/account",
  },
  {
    title: "Password",
    href: "/honai/account/password",
  },
  {
    title: "Appearance",
    href: "/honai/account/appearance",
  }
]

function RouteComponent() {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl w-full"><Outlet /></div>
      </div>
    </div>
  )
}
