import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import { Button } from '@/components/ui/button';
import ButtonAction from '@/components/ui/button-action';
import { ScheduleExclusionFormInterface } from '@/types/forms';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

const menus = [
    {
        label: 'Horários que não atendemos',
        link: route('hours.schedules.exclusions.index'),
        active: false,
    },
    { label: 'Cadastrar', link: '', active: true },
];

export default function Create() {
    const form = useForm<ScheduleExclusionFormInterface>({
        date: new Date(),
        starts_at: '',
        ends_at: '',
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('hours.schedules.exclusions.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };
    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Cadastro de horário que não atendemos'}
                    description={
                        'Preencha os campos abaixo para criar um novo horário que não atendemos.'
                    }
                >
                    <ButtonAction
                        title={'Voltar'}
                        route={route('hours.schedules.exclusions.index')}
                        isAction={'back'}
                    />
                </CardTitleShared>
                <CardContentShared>
                    <form className={'space-y-6'} onSubmit={handleSubmit}>
                        <div
                            className={
                                'grid grid-cols-1 items-start gap-6 md:grid-cols-3'
                            }
                        ></div>
                        <div className={'flex w-full justify-end'}>
                            <Button type="submit" loading={form.processing}>
                                <Plus className="mr-2 h-4 w-4" />
                                Cadastrar
                            </Button>
                        </div>
                    </form>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
