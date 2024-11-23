import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import DataTable from '@/components/shared/DataTable';
import ButtonAction from '@/components/ui/button-action';
import { columns } from '@/Pages/Dashboard/Clients/Tables/Columns';
import Filters from '@/Pages/Dashboard/Clients/Tables/Filters';
import { ClientAndPaginationInterface } from '@/Pages/Dashboard/Services/Types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ServiceProps {
    clients: ClientAndPaginationInterface;
    query: any;
}

const menus = [
    {
        label: 'Clientes',
        link: route('clients.index'),
        active: true,
    },
];
export default function Index({ clients, query }: ServiceProps) {
    const [loading, setLoading] = useState(false);
    const handleFetchData = (params: any) => {
        const sorting = JSON.stringify(params?.sorting);
        delete params?.sorting;
        router.get(
            route('clients.index', [{ ...params, sorting: sorting }]),
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
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Clientes'}
                    description={
                        'Aqui você pode visualizar todos os clientes cadastrados.'
                    }
                >
                    <ButtonAction
                        title={'Cadastrar cliente'}
                        route={route('clients.create')}
                        isAction={'create'}
                    />
                </CardTitleShared>
                <CardContentShared>
                    <div
                        className={
                            'flex w-full flex-col items-start justify-between md:flex-row md:items-center'
                        }
                    >
                        <Filters fetchData={handleFetchData} params={query} />
                    </div>
                    <div className={'mt-4'}>
                        <DataTable
                            columns={columns}
                            data={clients.data}
                            fetchData={handleFetchData}
                            initialSorting={query?.sorting || []}
                            isLoading={loading}
                            currentPage={clients.meta.current_page}
                            lastPage={clients.meta.last_page}
                            total={clients.meta.total}
                            from={clients.meta.from}
                            to={clients.meta.to}
                            params={query}
                        />
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
