import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import { Button } from '@/components/ui/button';
import ButtonAction from '@/components/ui/button-action';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import TextInput from '@/components/ui/text-input';
import TextMask from '@/components/ui/text-mask';
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
        date: undefined,
        starts_at: '',
        ends_at: '',
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Verificar se a data e hora de início são menores que a data e hora atual
        if (new Date(form.data.date as Date) < new Date()) {
            form.clearErrors();
            form.setError(
                'date',
                'A data não pode ser menor que a data atual.',
            );
            return;
        }

        if (form.data.starts_at > form.data.ends_at) {
            form.clearErrors();
            form.setError(
                'starts_at',
                'O horário de início não pode ser maior que o horário de fim.',
            );
            return;
        }

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
                        >
                            <div className={'grid w-full items-center gap-2'}>
                                <Label htmlFor={'date'}>Data</Label>
                                <DatePicker
                                    placeholder={'Selecione a data'}
                                    error={form.errors.date as string}
                                    value={form.data.date}
                                    onChange={(date) =>
                                        form.setData('date', date as Date)
                                    }
                                />
                                {form.errors.date && (
                                    <p className={'text-xs text-red-500'}>
                                        {form.errors.date}
                                    </p>
                                )}
                            </div>
                            <TextMask
                                label={'Início'}
                                value={form.data.starts_at}
                                onChange={(e) =>
                                    form.setData('starts_at', e.target.value)
                                }
                                error={form.errors.starts_at as string}
                                type={'text'}
                                id={`starts_at`}
                                mask={'99:99'}
                            />
                            <TextMask
                                label={'Fim'}
                                value={form.data.ends_at}
                                onChange={(e) =>
                                    form.setData('ends_at', e.target.value)
                                }
                                error={form.errors.ends_at as string}
                                type={'text'}
                                id={`ends_at`}
                                mask={'99:99'}
                            />
                        </div>
                        <TextInput
                            label={'Motivo'}
                            error={form.errors.reason as string}
                            value={form.data.reason as string}
                            onChange={(e) =>
                                form.setData('reason', e.target.value)
                            }
                            type={'text'}
                            id={'reason'}
                        />
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
