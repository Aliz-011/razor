import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const location = useLocation()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        location.href === item.href
                            ? "dark:bg-muted/50 bg-neutral-200 hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}