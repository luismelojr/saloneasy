import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import ShowClient from '@/components/shared/ShowClient';
import ShowService from '@/components/shared/ShowService';
import { Button } from '@/components/ui/button';
import ButtonAction from '@/components/ui/button-action';
import CustomCalendar from '@/components/ui/custom-calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
    AvailabilityInterface,
    ClientInterface,
    ServiceInterface,
    type SlotInterface,
} from '@/types';
import { ScheduleManuallyServiceFormInterface } from '@/types/forms';
import { router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

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
    const [loading, setLoading] = useState(false);
    const [selectAvailability, setSelectAvailability] =
        useState<AvailabilityInterface | null>(null);
    const form = useForm<ScheduleManuallyServiceFormInterface>({
        service_id: props.service.id,
        datetime: null,
        client_id: props.client.id,
    });

    const handleAppointment = () => {
        form.post(route('schedule.manually.store.appointment'));
    };

    const handleMonthChange = (date: Date) => {
        resetFormDateTimeAndSelectAvailability();
        router.reload({
            data: {
                calendar: format(date, 'yyyy-MM-dd'),
            },
            only: ['availability', 'calendar', 'date'],
            onStart: () => {
                setLoading(true);
            },
            onSuccess: () => {
                setLoading(false);
            },
        });
    };

    const handleDateSelect = (date: Date) => {
        resetFormDateTimeAndSelectAvailability();
        const availability = props.availability.find(
            (item) => item.date === format(date, 'yyyy-MM-dd'),
        );
        setSelectAvailability(availability || null);
    };

    const handleSelectSlot = (slot: SlotInterface) => {
        form.setData('datetime', slot.datetime);
    };

    const resetFormDateTimeAndSelectAvailability = () => {
        form.setData('datetime', null);
        setSelectAvailability(null);
    };

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
                                Detalhes do serviço e cliente selecionado
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
                            <div
                                className={
                                    'grid grid-cols-1 items-start gap-2 md:grid-cols-2 md:gap-4'
                                }
                            >
                                <CustomCalendar
                                    availableSlots={props.availability}
                                    onMonthChange={handleMonthChange}
                                    onDateSelect={handleDateSelect}
                                    loading={loading}
                                />
                                {selectAvailability ? (
                                    <div
                                        className={
                                            'grid grid-cols-1 gap-2 md:grid-cols-4'
                                        }
                                    >
                                        {loading
                                            ? Array.from(
                                                  { length: 4 },
                                                  (_, index) => (
                                                      <Skeleton
                                                          key={index}
                                                          className="h-12 w-full rounded-md"
                                                      />
                                                  ),
                                              )
                                            : selectAvailability &&
                                              Object.values(
                                                  selectAvailability.slots,
                                              ).map((slot, index) => (
                                                  <button
                                                      key={index}
                                                      className={cn(
                                                          `h-12 rounded-md border-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white ${form.data.datetime === slot.datetime ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-500'}`,
                                                      )}
                                                      onClick={() =>
                                                          handleSelectSlot(slot)
                                                      }
                                                  >
                                                      <span>{slot.time}</span>
                                                  </button>
                                              ))}
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            'flex w-full items-center justify-center rounded-md'
                                        }
                                    >
                                        <span className={'text-gray-500'}>
                                            Nenhuma data selecionada
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={'flex w-full justify-end'}>
                            <Button
                                type="button"
                                loading={form.processing}
                                onClick={handleAppointment}
                                disabled={!form.data.datetime}
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
