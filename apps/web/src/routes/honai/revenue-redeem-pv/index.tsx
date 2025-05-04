import { useSelectDate } from '@/hooks/use-select-date'
import { useTRPC } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Filters } from '../-components/filters'
import { DataTable } from '../-components/data-table'

export const Route = createFileRoute('/honai/revenue-redeem-pv/')({
    component: RouteComponent,
})

function RouteComponent() {
    const trpc = useTRPC()
    const { date } = useSelectDate()
    const { data, isLoading, isRefetching, refetch } = useQuery(trpc.redeemPv.redeemPVPrabayar.queryOptions({ date }, {
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 60 * 1000 * 60,
        gcTime: 60 * 1000 * 10,
    }))
    return <div className="px-4 lg:px-6">
        <div className="overflow-hidden min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
            <Filters daysBehind={3} />
            <DataTable refetch={refetch} data={data} latestUpdatedData={3} title="Revenue Redeem PV" date={date} isLoading={isLoading || isRefetching} />
        </div>
    </div>
}
