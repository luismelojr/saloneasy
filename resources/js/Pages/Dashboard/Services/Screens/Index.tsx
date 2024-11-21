import DashboardLayout from '@/components/layouts/dashboard-layout';
import DataTable from '@/components/shared/DataTable';
import { columns } from '@/Pages/Dashboard/Services/Tables/ServiceColumns';
import ServiceFilters from '@/Pages/Dashboard/Services/Tables/ServicesFilters';
import { ServiceAndPaginationInterface } from '@/Pages/Dashboard/Services/Types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ServiceProps {
    services: ServiceAndPaginationInterface;
    query: any;
}
export default function Index({ services, query }: ServiceProps) {
    const [loading, setLoading] = useState(false);
    const handleFetchData = (params: any) => {
        const sorting = JSON.stringify(params?.sorting);
        delete params?.sorting;
        router.get(
            route('services.index', [{ ...params, sorting: sorting }]),
            {
                preserveState: true,
            },
            {
                onStart: () => {
                    setLoading(true);
                },
                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };
    return (
        <DashboardLayout title={'Serviços'}>
            <div
                className={
                    'flex w-full flex-col items-start justify-between md:flex-row md:items-center'
                }
            >
                <ServiceFilters fetchData={handleFetchData} params={query} />
                <div className={'hidden md:block'}>botoes de cadastros</div>
            </div>
            <div className={'mt-4'}>
                <DataTable
                    columns={columns}
                    data={services.data}
                    fetchData={handleFetchData}
                    initialSorting={query?.sorting || []}
                    isLoading={loading}
                    currentPage={services.current_page}
                    lastPage={services.last_page}
                    total={services.total}
                    from={services.from}
                    to={services.to}
                />
            </div>
        </DashboardLayout>
    );
}
