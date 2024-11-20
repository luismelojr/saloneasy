import DashboardLayout from '@/components/layouts/dashboard-layout';
import DataTable from '@/components/shared/DataTable';
import { columns } from '@/Pages/Dashboard/Services/Tables/ServiceColumns';
import { ServiceAndPaginationInterface } from '@/Pages/Dashboard/Services/Types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ServiceProps {
    services: ServiceAndPaginationInterface;
    params: any;
}
export default function Index({ services, params }: ServiceProps) {
    const [loading, setLoading] = useState(false);
    const handleFetchData = (params: any) => {
        const sorting = JSON.stringify(params?.sorting);
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
            <h1>Servicos sdsd</h1>
            <div className={'mt-10'}>
                <DataTable
                    columns={columns}
                    data={services.data}
                    fetchData={handleFetchData}
                    initialSorting={params.sorting}
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
