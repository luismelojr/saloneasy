import DashboardLayout from '@/components/layouts/dashboard-layout';
import BlockService from '@/components/shared/BlockService';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import NotFound from '@/components/shared/NotFound';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CardLoading from '@/Pages/Dashboard/ScheduleManually/Loading/CardLoading';
import { ServiceInterface } from '@/types';
import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
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
}

export default function Index({ services, search }: ScheduleManuallyProps) {
    const [searchState, setSearchState] = useState(search);
    const [loading, setLoading] = useState(false);
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
                                {services.map((service) => (
                                    <li key={service.id}>
                                        <BlockService service={service} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NotFound />
                        )}
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
