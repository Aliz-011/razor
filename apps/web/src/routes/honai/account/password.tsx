import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { PasswordForm } from './-components/password-form'

export const Route = createFileRoute('/honai/account/password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  )
}
