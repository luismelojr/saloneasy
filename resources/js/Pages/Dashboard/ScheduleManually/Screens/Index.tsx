import DashboardLayout from '@/components/layouts/dashboard-layout';
import BlockService from '@/components/shared/BlockService';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import NotFound from '@/components/shared/NotFound';
import ServiceList from '@/components/shared/ServiceList';
import CreateClients, {
    type FormData as ClientFormData,
} from '@/components/slide-overs/CreateClients';
import { Button } from '@/components/ui/button';
import CustomSelect, { type Option } from '@/components/ui/custom-select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import CardLoading from '@/Pages/Dashboard/ScheduleManually/Loading/CardLoading';
import { ServiceInterface } from '@/types';
import { router } from '@inertiajs/react';
import { Calendar, Grid3X3, List, Search, User, X } from 'lucide-react';
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
    clients: Option[];
}

export default function Index({
    services,
    search,
    clients,
}: ScheduleManuallyProps) {
    const [searchState, setSearchState] = useState(search ?? '');
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState<ServiceInterface | null>(null);
    const [client, setClient] = useState<string>('');
    const [viewMode, setViewMode] = useState('grid');
    const [clientLogin, setClientLogin] = useState(false);

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

    const handleSelectService = (selectService: ServiceInterface) => {
        if (selectService.id === service?.id) {
            setService(null);
        } else {
            setService(selectService);
        }
    };

    const handleNavigation = () => {
        router.get(
            route('schedule.manually.index.appointment', {
                service: service?.id,
                client: client,
            }),
        );
    };

    const handleCreateClient = (data: ClientFormData) => {
        router.post(route('clients.create.schedule'), data, {
            onStart: () => {
                setClientLogin(true);
            },
            onSuccess: (page) => {
                router.reload({
                    only: ['clients'],
                    onSuccess: () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const clientFind = page.props?.clients.find(
                            (item: any) =>
                                item.phone === data.phone &&
                                item.label === data.name,
                        );

                        if (clientFind) {
                            setClient(clientFind.value);
                        }
                    },
                });
            },
            onFinish: () => {
                setClientLogin(false);
            },
        });
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
                <CardContentShared className="relative space-y-6">
                    <div className={'flex items-end justify-between gap-4'}>
                        <div className={'flex-1 space-y-2'}>
                            <h3
                                className={
                                    'text-md mb-2 flex items-center gap-2 font-semibold text-gray-600'
                                }
                            >
                                <User className={'h-4 w-4'} />
                                Selecionar cliente
                            </h3>
                            <CustomSelect
                                type="single"
                                options={clients}
                                value={client}
                                onChange={setClient}
                                placeholder="Selecione um cliente"
                                searchPlaceholder="Pesquisar cliente"
                            />
                        </div>
                        <CreateClients
                            onCreateClient={handleCreateClient}
                            loading={clientLogin}
                        />
                    </div>

                    <hr />
                    <div className={'space-y-6'}>
                        <form
                            className={'flex flex-col gap-4 md:flex-row'}
                            onSubmit={handleSearch}
                        >
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
                            <div className="flex gap-2">
                                <Button
                                    variant={
                                        viewMode === 'grid'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    type={'button'}
                                    size="icon"
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={
                                        viewMode === 'list'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    type={'button'}
                                    size="icon"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                        <Separator />
                        {loading ? (
                            <CardLoading />
                        ) : services.length > 0 ? (
                            <ul
                                className={cn(
                                    `${viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-4' : 'flex flex-col gap-2'}`,
                                )}
                            >
                                {services.map((item) => (
                                    <li key={item.id}>
                                        {viewMode === 'grid' ? (
                                            <BlockService
                                                service={item}
                                                action={() =>
                                                    handleSelectService(item)
                                                }
                                                active={item.id === service?.id}
                                            />
                                        ) : (
                                            <ServiceList
                                                service={item}
                                                action={() =>
                                                    handleSelectService(item)
                                                }
                                                active={item.id === service?.id}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NotFound />
                        )}
                    </div>
                    <Separator className={'bg-transparent pt-20'} />
                    {/* Button */}
                    <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
                        <div className="mx-auto flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-0">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`h-2 w-2 rounded-full ${client ? 'bg-primary' : 'bg-gray-300'}`}
                                    />
                                    <span className="text-sm text-gray-600">
                                        Cliente
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`h-2 w-2 rounded-full ${service ? 'bg-primary' : 'bg-gray-300'}`}
                                    />
                                    <span className="text-sm text-gray-600">
                                        Serviço
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <span className="text-sm text-gray-600">
                                        Total:
                                    </span>
                                    <span className="ml-2 text-lg font-semibold">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(service?.price ?? 0)}
                                    </span>
                                </div>
                                <Button
                                    disabled={!client || !service}
                                    onClick={handleNavigation}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Agendar Horário
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
