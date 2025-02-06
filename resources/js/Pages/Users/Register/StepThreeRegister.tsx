import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import TextMask from '@/components/ui/text-mask';
import { DayProps, ScheduleFieldsProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';

export default function RegisterStepThree() {
    const [days, setDays] = useState<DayProps[]>([
        {
            title: 'Segunda-feira',
            start: '',
            end: '',
            isActive: true,
            fieldStart: 'monday_starts_at',
            fieldEnd: 'monday_ends_at',
        },
        {
            title: 'Terça-feira',
            start: '',
            end: '',
            isActive: false,
            fieldStart: 'tuesday_starts_at',
            fieldEnd: 'tuesday_ends_at',
        },
        {
            title: 'Quarta-feira',
            start: '',
            end: '',
            isActive: false,
            fieldStart: 'wednesday_starts_at',
            fieldEnd: 'wednesday_ends_at',
        },
        {
            title: 'Quinta-feira',
            start: '',
            end: '',
            isActive: false,
            fieldStart: 'thursday_starts_at',
            fieldEnd: 'thursday_ends_at',
        },
        {
            title: 'Sexta-feira',
            start: '',
            end: '',
            isActive: false,
            fieldStart: 'friday_starts_at',
            fieldEnd: 'friday_ends_at',
        },
        {
            title: 'Sábado',
            start: '',
            end: '',
            isActive: false,
            fieldStart: 'saturday_starts_at',
            fieldEnd: 'saturday_ends_at',
        },
        {
            title: 'Domingo',
            start: '',
            end: '',
            isActive: false,
            fieldStart: 'sunday_starts_at',
            fieldEnd: 'sunday_ends_at',
        },
    ]);

    const form = useForm({
        monday_starts_at: days[0].isActive ? days[0].start : '',
        monday_ends_at: days[0].isActive ? days[0].end : '',
        tuesday_starts_at: days[1].isActive ? days[1].start : '',
        tuesday_ends_at: days[1].isActive ? days[1].end : '',
        wednesday_starts_at: days[2].isActive ? days[2].start : '',
        wednesday_ends_at: days[2].isActive ? days[2].end : '',
        thursday_starts_at: days[3].isActive ? days[3].start : '',
        thursday_ends_at: days[3].isActive ? days[3].end : '',
        friday_starts_at: days[4].isActive ? days[4].start : '',
        friday_ends_at: days[4].isActive ? days[4].end : '',
        saturday_starts_at: days[5].isActive ? days[5].start : '',
        saturday_ends_at: days[5].isActive ? days[5].end : '',
        sunday_starts_at: days[6].isActive ? days[6].start : '',
        sunday_ends_at: days[6].isActive ? days[6].end : '',
    });

    function handleChecked(checked: boolean, index: number) {
        const newDays = [...days];
        newDays[index].isActive = checked;

        if (!checked) {
            // Limpar os valores usando formattedValueForm
            formattedValueForm('', 'start', newDays[index].title);
            formattedValueForm('', 'end', newDays[index].title);

            // Atualizar o estado local
            newDays[index].start = '';
            newDays[index].end = '';
        }

        setDays(newDays);
    }

    function handleChangeValue(
        value: string,
        index: number,
        field: 'start' | 'end',
    ) {
        const newDays = [...days];
        newDays[index][field] = value;
        setDays(newDays);
        formattedValueForm(value, field, newDays[index].title);
    }

    function formattedValueForm(
        value: string,
        field: 'start' | 'end',
        day: string,
    ) {
        switch (day) {
            case 'Segunda-feira':
                if (field === 'start') {
                    form.setData('monday_starts_at', value);
                } else {
                    form.setData('monday_ends_at', value);
                }
                break;
            case 'Terça-feira':
                if (field === 'start') {
                    form.setData('tuesday_starts_at', value);
                } else {
                    form.setData('tuesday_ends_at', value);
                }
                break;
            case 'Quarta-feira':
                if (field === 'start') {
                    form.setData('wednesday_starts_at', value);
                } else {
                    form.setData('wednesday_ends_at', value);
                }
                break;
            case 'Quinta-feira':
                if (field === 'start') {
                    form.setData('thursday_starts_at', value);
                } else {
                    form.setData('thursday_ends_at', value);
                }
                break;
            case 'Sexta-feira':
                if (field === 'start') {
                    form.setData('friday_starts_at', value);
                } else {
                    form.setData('friday_ends_at', value);
                }
                break;
            case 'Sábado':
                if (field === 'start') {
                    form.setData('saturday_starts_at', value);
                } else {
                    form.setData('saturday_ends_at', value);
                }
                break;
            case 'Domingo':
                if (field === 'start') {
                    form.setData('sunday_starts_at', value);
                } else {
                    form.setData('sunday_ends_at', value);
                }
                break;
        }
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Atualizar o estado do formulário com base nos dias ativos
        days.forEach((day) => {
            if (!day.isActive) {
                form.setData(day.fieldStart as ScheduleFieldsProps, '');
                form.setData(day.fieldEnd as ScheduleFieldsProps, '');
            }
        });

        form.post(route('register.store.step.three'));
    }

    return (
        <AuthLayout>
            <div className={'flex flex-col gap-14'}>
                <div>
                    <h1 className={'text-2xl'}>
                        Cadastre Horários de atendimento
                    </h1>
                </div>
                <form onSubmit={handleSave}>
                    <div className={'grid grid-cols-1 gap-2 md:grid-cols-2'}>
                        {days.map((day, index) => (
                            <div
                                className={'rounded-sm border p-2'}
                                key={index}
                            >
                                <div className={'flex items-start gap-2'}>
                                    <Switch
                                        checked={day.isActive}
                                        onCheckedChange={(checked) =>
                                            handleChecked(
                                                checked,
                                                days.indexOf(day),
                                            )
                                        }
                                    />
                                    <span
                                        className={
                                            'text-sm text-muted-foreground'
                                        }
                                    >
                                        {day.title}
                                    </span>
                                </div>
                                {day.isActive && (
                                    <div
                                        className={
                                            'mt-4 flex items-start gap-2 border-t pt-4'
                                        }
                                    >
                                        <TextMask
                                            label={'Início'}
                                            value={day.start}
                                            onChange={(e) =>
                                                handleChangeValue(
                                                    e.target.value,
                                                    days.indexOf(day),
                                                    'start',
                                                )
                                            }
                                            error={
                                                form.errors[
                                                    day.fieldStart as ScheduleFieldsProps
                                                ] as ScheduleFieldsProps
                                            }
                                            type={'text'}
                                            id={`start-${day.title}`}
                                            mask={'99:99'}
                                        />
                                        <TextMask
                                            label={'Fim'}
                                            value={day.end}
                                            onChange={(e) =>
                                                handleChangeValue(
                                                    e.target.value,
                                                    days.indexOf(day),
                                                    'end',
                                                )
                                            }
                                            error={
                                                form.errors[
                                                    day.fieldEnd as ScheduleFieldsProps
                                                ] as ScheduleFieldsProps
                                            }
                                            type={'text'}
                                            id={`end-${day.title}`}
                                            mask={'99:99'}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" loading={form.processing}>
                            <SaveIcon className="mr-2 h-4 w-4" />
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
