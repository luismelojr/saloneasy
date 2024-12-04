import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import ShowClient from '@/components/shared/ShowClient';
import ShowService from '@/components/shared/ShowService';
import { Button } from '@/components/ui/button';
import ButtonAction from '@/components/ui/button-action';
import { cn } from '@/lib/utils';
import {
    AvailabilityInterface,
    ClientInterface,
    ServiceInterface,
    SlotInterface,
} from '@/types';
import { ScheduleManuallyServiceFormInterface } from '@/types/forms';
import { easepick, LockPlugin } from '@easepick/bundle';
import styleEasepick from '@easepick/bundle/dist/index.css?url';
import { Core } from '@easepick/core';
import { router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, ShoppingBag } from 'lucide-react';
import pluralize from 'pluralize';
import { useEffect, useState } from 'react';

const menus = [
    {
        label: 'Agendamento Manual',
        link: route('schedule.manually.index.appointment'),
        active: true,
    },
];

interface ScheduleManuallyAppointmentProps {
    service: ServiceInterface;
    client: ClientInterface;
    availability: AvailabilityInterface[];
    calendar: string | null;
    date: string;
}

export default function Index(props: ScheduleManuallyAppointmentProps) {
    let picker: Core | null = null;
    const [slots, setSlots] = useState<SlotInterface[]>([]);
    const form = useForm<ScheduleManuallyServiceFormInterface>({
        service_id: props.service.id,
        datetime: null,
        client_id: props.client.id,
    });

    const createPicker = () => {
        if (picker) return;

        picker = new easepick.create({
            css: [
                styleEasepick,
                'http://saloneasy.test/assets/css/vendor/easepick.css',
            ],
            date: props.date,
            element: document.getElementById('easedatepicker') as HTMLElement,
            inline: true,
            readonly: true,
            lang: 'pt-BR',
            zIndex: 50,
            plugins: [LockPlugin],
            LockPlugin: {
                filter(date) {
                    const newDate = format(
                        new Date(date.toLocaleString()),
                        'yyyy-MM-dd',
                    );
                    return !props.availability.find((a) => a.date === newDate);
                },
            },
            setup(picker: Core) {
                picker.on('view', (e) => {
                    const { view, date, target } = e.detail;
                    const dateString = date ? date.format('YYYY-MM-DD') : null;
                    const availability = props.availability.find(
                        (a) => a.date === dateString,
                    );

                    if (view === 'CalendarDay' && availability) {
                        const span =
                            target.querySelector('.day-slots') ||
                            document.createElement('span');
                        span.className = 'day-slots';
                        span.innerHTML = pluralize(
                            'vaga',
                            Object.keys(availability.slots).length,
                            true,
                        );
                        target.append(span);
                    }
                });
            },
        });
    };

    const editSlot = (date: string) => {
        const availability = props.availability.find((a) => a.date === date);
        if (!availability) return;
        setSlots(Object.values(availability.slots));
    };

    const setDatetime = (datetime: string) => {
        if (form.data.datetime === datetime) {
            form.setData('datetime', null);
        } else {
            form.setData('datetime', datetime);
        }
    };

    const handleAppointment = () => {
        console.log(form.data);
    };

    useEffect(() => {
        let isRendering = false;
        createPicker();
        editSlot(props.date);
        picker?.on('select', (e: any) => {
            editSlot(e.detail.date.format('YYYY-MM-DD'));
        });
        picker?.on('render', (e: any) => {
            if (isRendering) return;
            const { view, date } = e.detail;

            if (
                view === 'Container' &&
                date.format('YYYY-MM-DD') !== props.calendar
            ) {
                isRendering = true;
                router.reload({
                    data: {
                        calendar: date.format('YYYY-MM-DD'),
                    },
                    only: ['availability', 'calendar', 'date'],
                    onSuccess: () => {
                        window.location.reload();
                        isRendering = false;
                    },
                });
            }
        });
    }, []);
    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={`Agendar ${props.service.name}`}
                    description={
                        'Escolha a data e horário e o cliente para agendar o serviço'
                    }
                >
                    <ButtonAction
                        title={'Voltar'}
                        route={route('schedule.manually.index.service')}
                        isAction={'back'}
                    />
                </CardTitleShared>
                <CardContentShared>
                    <div className={'space-y-10'}>
                        <div className={'space-y-2'}>
                            <h3
                                className={
                                    'text-md flex items-center gap-2 font-semibold text-gray-600'
                                }
                            >
                                <ShoppingBag className={'h-4 w-4'} />
                                Detalhes do serviço e cliente
                            </h3>
                            <div
                                className={
                                    'grid grid-cols-1 gap-4 md:grid-cols-2'
                                }
                            >
                                <ShowService service={props.service} />
                                <ShowClient client={props.client} />
                            </div>
                        </div>

                        <div>
                            <h3
                                className={
                                    'text-md mb-2 flex items-center gap-2 font-semibold text-gray-600'
                                }
                            >
                                <Calendar className={'h-4 w-4'} />
                                Agendar horário
                            </h3>
                            <div className={'flex items-start gap-4'}>
                                <div
                                    id={'easedatepicker'}
                                    className={'hidden'}
                                ></div>
                                <div
                                    className={
                                        'flex flex-wrap items-center gap-4'
                                    }
                                >
                                    {slots.map((slot, index) => (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDatetime(slot.datetime)
                                            }
                                            key={index}
                                            className={cn(
                                                'cursor-pointer rounded-md border border-slate-200 px-4 py-3 text-center text-sm hover:border-primary',
                                                {
                                                    'border-primary bg-primary text-white':
                                                        form.data.datetime ===
                                                        slot.datetime,
                                                },
                                            )}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={'flex w-full justify-end'}>
                            <Button
                                type="button"
                                loading={form.processing}
                                onClick={handleAppointment}
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Agendar
                            </Button>
                        </div>
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
