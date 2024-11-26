import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SelectCustom } from '@/components/ui/select-custom';
import { SelectAsyncCustom } from '@/components/ui/select-custom-async';
import { ClientShortInterface } from '@/types';
import { ScheduleManuallyFormInterface } from '@/types/forms';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Plus } from 'lucide-react';

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form.data);
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
                    <form onSubmit={handleSubmit} className={'space-y-6'}>
                        <div className={'grid w-full items-center gap-2'}>
                            <Label>Cliente</Label>
                            <SelectAsyncCustom
                                createAble={false}
                                isMulti={false}
                                loadOptions={loadOptions}
                                onChange={(item) => {
                                    form.setData('client_id', item.value);
                                }}
                            />
                        </div>
                        <div className={'grid w-full items-center gap-2'}>
                            <Label>Serviço</Label>
                            <SelectCustom
                                options={services}
                                createAble={false}
                                isMulti={false}
                                onChange={(item) => {
                                    form.setData('service_id', item.value);
                                }}
                            />
                        </div>
                        <div className={'flex w-full justify-end'}>
                            <Button type="submit" loading={form.processing}>
                                <Plus className="mr-2 h-4 w-4" />
                                Salvar
                            </Button>
                        </div>
                    </form>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
