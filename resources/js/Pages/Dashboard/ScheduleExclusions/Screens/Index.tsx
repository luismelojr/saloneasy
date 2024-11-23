import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import DataTable from '@/components/shared/DataTable';
import ButtonAction from '@/components/ui/button-action';
import Filters from '@/Pages/Dashboard/Clients/Tables/Filters';
import { columns } from '@/Pages/Dashboard/ScheduleExclusions/Tables/Columns';
import { ScheduleExclusionAndPaginationInterface } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const menus = [
    {
        label: 'Horários que não atendemos',
        link: route('hours.schedules.exclusions.index'),
        active: true,
    },
];

interface ServiceProps {
    exclusions: ScheduleExclusionAndPaginationInterface;
    query: any;
}
export default function Index({ exclusions, query }: ServiceProps) {
    const [loading, setLoading] = useState(false);
    const handleFetchData = (params: any) => {
        const sorting = JSON.stringify(params?.sorting);
        delete params?.sorting;
        router.get(
            route('hours.schedules.exclusions.index', [
                { ...params, sorting: sorting },
            ]),
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
                    title={'Horários que não atendemos'}
                    description={
                        'Aqui você pode visualizar todos os horários que não atendemos.'
                    }
                >
                    <ButtonAction
                        title={'Cadastrar horário'}
                        route={route('hours.schedules.exclusions.create')}
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
                            data={exclusions.data}
                            fetchData={handleFetchData}
                            initialSorting={query?.sorting || []}
                            isLoading={loading}
                            currentPage={exclusions.meta.current_page}
                            lastPage={exclusions.meta.last_page}
                            total={exclusions.meta.total}
                            from={exclusions.meta.from}
                            to={exclusions.meta.to}
                            params={query}
                        />
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
