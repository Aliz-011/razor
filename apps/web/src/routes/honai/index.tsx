import { createFileRoute } from '@tanstack/react-router'

import { SectionCards } from '@/routes/-components/section-cards'
import { ChartAreaInteractive } from '@/routes/-components/chart-area-interactive'

export const Route = createFileRoute('/honai/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (<>
        <SectionCards />
        <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
        </div>
    </>)
}
