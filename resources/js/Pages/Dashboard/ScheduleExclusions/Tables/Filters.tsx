import CalendarFilters from '@/components/filters/CalendarFilters';
import FiltersList from '@/components/shared/FiltersList';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import debounce from 'lodash/debounce';
import { ListFilter, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ServiceFiltersProps {
    fetchData: (params: any) => void;
    params: any;
}

export default function Filters({ fetchData, params }: ServiceFiltersProps) {
    const [filters, setFilters] = useState<
        { key: string; value: string | boolean; legend: string }[]
    >(
        Object.keys(params).map((key) => {
            return {
                key: key,
                value: params[key],
                legend: params[key],
            };
        }),
    );
    const [search, setSearch] = useState(params?.search || '');

    const handleSearchText = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setSearch(value);

        if (value.length === 0) {
            // Remove o filtro de busca
            const filtersNewValue = filters.filter(
                (item) => item.key !== 'search',
            );
            setFilters(filtersNewValue);
            handleFetchData(filtersNewValue);
            return;
        }

        const data = {
            key: 'search',
            value: value,
            legend: value,
        };

        // Chama o debounce apenas se houver um valor no input
        handleDebounceSearch(data, value);
    };

    const removeAndAddFilterArray = (data: {
        key: string;
        value: string | boolean;
        legend: string;
    }) => {
        setFilters((prev) => {
            const updatedFilters = prev.filter(
                (filter) => filter.key !== data.key,
            );
            const newFilters = [...updatedFilters, data];

            handleFetchData(newFilters); // Passa os filtros atualizados para a função
            return newFilters;
        });
    };

    const handleDebounceSearch = useCallback(
        debounce(
            (
                data: {
                    key: string;
                    value: string | boolean;
                    legend: string;
                },
                value: string,
            ) => {
                if (value.length === 0) return;

                setFilters((prev) => {
                    const updatedFilters = prev.filter(
                        (filter) => filter.key !== data.key,
                    );
                    const newFilters = [...updatedFilters, data];

                    handleFetchData(newFilters); // Passa os filtros atualizados para a função
                    return newFilters;
                });
            },
            1000,
        ),
        [],
    );

    const removeFilter = (key: string) => {
        setFilters((prev) => {
            const updatedFilters = prev.filter((item) => item.key !== key);
            handleFetchData(updatedFilters); // Passa os filtros atualizados para a função
            return updatedFilters;
        });
    };

    const handleFetchData = (updatedFilters: any[]) => {
        const params = updatedFilters.reduce((acc, filter) => {
            acc[filter.key] = filter.legend;
            return acc;
        }, {});

        fetchData(params);
    };

    const handleCalendarCreatedAtChange = (date: Date | undefined) => {
        const data = {
            key: 'date',
            value: date ? format(date, 'yyyy-MM-dd') : '',
            legend: format(date as Date, 'dd/MM/yyyy'),
        };

        console.log(data);

        removeAndAddFilterArray(data);
    };

    return (
        <div
            className={
                'flex w-full flex-1 flex-col items-start gap-2 md:flex-row md:items-center'
            }
        >
            <div
                className={
                    'flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 md:w-[300px]'
                }
            >
                <div className={'flex w-full items-center gap-2'}>
                    <Search className={'h-5 w-5 text-gray-500'} />
                    <input
                        type="text"
                        className={
                            'w-full rounded-md border-transparent bg-transparent p-0 text-gray-500'
                        }
                        onChange={handleSearchText}
                        value={search}
                        placeholder={'Pesquise ou filtre'}
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} size={'icon'}>
                                <ListFilter />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[300px]"
                            align="end"
                            sideOffset={10}
                            alignOffset={-11}
                            side="bottom"
                        >
                            <CalendarFilters
                                filters={filters}
                                handleCalendarChange={
                                    handleCalendarCreatedAtChange
                                }
                                title={'Pesquisar pela data'}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                <FiltersList data={filters} remover={removeFilter} />
            </div>
        </div>
    );
}
