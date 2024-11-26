import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import { Label } from '@/components/ui/label';
import { SelectAsyncCustom } from '@/components/ui/select-custom-async';
import { ClientShortInterface } from '@/types';
import { ScheduleManuallyFormInterface } from '@/types/forms';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const menus = [
    {
        label: 'Agendamento Manual',
        link: route('schedule.manually.index'),
        active: true,
    },
];

interface ScheduleManuallyProps {
    services: { label: string; value: number }[];
}

export default function Index({ services }: ScheduleManuallyProps) {
    const form = useForm<ScheduleManuallyFormInterface>({
        client_id: null,
        service_id: null,
    });

    const fetchOptions = (inputValue: string) => {
        return axios
            .get(route('users.search', { search: inputValue }))
            .then((res) => {
                return res.data.clients.map((client: ClientShortInterface) => ({
                    label: `${client.name} - ${client.phone}`,
                    value: client.id,
                }));
            });
    };

    const loadOptions = async (inputValue: string) => {
        if (
            (inputValue.length > 4 && inputValue.length) ||
            inputValue.length === 0
        ) {
            return await fetchOptions(inputValue);
        }
    };

    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Agendamento Manual'}
                    description={
                        'Aqui você pode agendar um serviço manualmente.'
                    }
                />
                <CardContentShared>
                    <div className={'space-y-6'}>
                        <div className={'grid w-full items-center gap-2'}>
                            <Label>Cliente</Label>
                            <SelectAsyncCustom
                                createAble={false}
                                isMulti={false}
                                loadOptions={loadOptions}
                            />
                        </div>
                        <div className={'grid w-full items-center gap-2'}>
                            <Label>Serviço</Label>
                            <SelectAsyncCustom
                                options={services}
                                createAble={false}
                                isMulti={false}
                            />
                        </div>
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
