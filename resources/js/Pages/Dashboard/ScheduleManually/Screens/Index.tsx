import DashboardLayout from '@/components/layouts/dashboard-layout';
import BlockService from '@/components/shared/BlockService';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import NotFound from '@/components/shared/NotFound';
import { Button } from '@/components/ui/button';
import { SelectCustom } from '@/components/ui/select-custom';
import { Separator } from '@/components/ui/separator';
import CardLoading from '@/Pages/Dashboard/ScheduleManually/Loading/CardLoading';
import { ServiceInterface } from '@/types';
import { router } from '@inertiajs/react';
import { Calendar, Search, User, X } from 'lucide-react';
import { useState } from 'react';

const menus = [
    {
        label: 'Agendamento Manual',
        link: route('schedule.manually.index.service'),
        active: true,
    },
];

interface ScheduleManuallyProps {
    services: ServiceInterface[];
    search: string;
    clients: { value: number; label: string }[];
}

export default function Index({
    services,
    search,
    clients,
}: ScheduleManuallyProps) {
    const [searchState, setSearchState] = useState(search ?? '');
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState<ServiceInterface | null>(null);
    const [client, setClient] = useState<{
        value: number;
        label: string;
    } | null>(null);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleFetch();
    };

    const handleFetch = () => {
        router.get(
            route('schedule.manually.index.service', [{ search: searchState }]),
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

    const clearSearch = () => {
        setSearchState('');
        handleFetch();
    };

    const handleSelectService = (service: ServiceInterface) => {
        setService(service);
    };

    const handleNavigation = () => {
        router.get(
            route('schedule.manually.index.appointment', {
                service: service?.id,
                client: client?.value,
            }),
        );
    };

    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Selecione um serviço'}
                    description={
                        'Selecione um serviço para agendar um horário manualmente.'
                    }
                />
                <CardContentShared>
                    <div className={'space-y-6'}>
                        <form className={'flex gap-4'} onSubmit={handleSearch}>
                            <div
                                className={
                                    'flex w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1'
                                }
                            >
                                <Search className={'h-5 w-5 text-gray-500'} />
                                <input
                                    type="text"
                                    className={
                                        'w-full rounded-md border-transparent bg-transparent p-0 text-gray-500'
                                    }
                                    value={searchState}
                                    onChange={(e) =>
                                        setSearchState(e.target.value)
                                    }
                                    placeholder={'Pesquisar serviço'}
                                    autoComplete="off"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    spellCheck="false"
                                />
                            </div>
                            <Button type="submit">
                                <Search className="mr-2 h-4 w-4" />
                                Pesquisar
                            </Button>
                            {search && (
                                <Button
                                    type="submit"
                                    variant={'outline'}
                                    onClick={clearSearch}
                                >
                                    <X className="mr-1 h-4 w-4" />
                                    Limpar pesquisa
                                </Button>
                            )}
                        </form>
                        <Separator />
                        {loading ? (
                            <CardLoading />
                        ) : services.length > 0 ? (
                            <ul
                                className={
                                    'grid grid-cols-1 gap-4 md:grid-cols-4'
                                }
                            >
                                {services.map((item) => (
                                    <li key={item.id}>
                                        <BlockService
                                            service={item}
                                            action={() =>
                                                handleSelectService(item)
                                            }
                                            active={item.id === service?.id}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NotFound />
                        )}
                        <div className={'space-y-2'}>
                            <h3
                                className={
                                    'text-md mb-2 flex items-center gap-2 font-semibold text-gray-600'
                                }
                            >
                                <User className={'h-4 w-4'} />
                                Selecionar cliente
                            </h3>
                            <SelectCustom
                                options={clients}
                                createAble={true}
                                onChange={(item) =>
                                    setClient({
                                        value: item.value,
                                        label: item.label,
                                    })
                                }
                                error={
                                    client && service !== null
                                        ? ''
                                        : 'Selecione um cliente'
                                }
                            />
                        </div>
                        <div className={'flex w-full justify-end'}>
                            <Button
                                type="button"
                                disabled={!client || !service}
                                onClick={handleNavigation}
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
