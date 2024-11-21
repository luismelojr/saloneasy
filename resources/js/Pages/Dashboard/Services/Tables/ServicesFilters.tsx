import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import debounce from 'lodash/debounce';
import { Check, ListFilter, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

const StatusFilters = [
    {
        value: true,
        label: 'Ativo',
    },
    {
        value: false,
        label: 'Inativo',
    },
];

export default function ServiceFilters() {
    const [filters, setFilters] = useState<
        { key: string; value: string | boolean; legend: string }[]
    >([]);
    const [search, setSearch] = useState('');

    const handleFilterStatus = (value: boolean) => {
        const data = {
            key: 'status',
            value: value,
            legend: value ? 'Ativo' : 'Inativo',
        };

        removeAndAddFilterArray(data);
    };

    const handleSearchText = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setSearch(value);

        if (value.length === 0) {
            const filterFind = filters.find(
                (filter) => filter.key === 'search',
            );
            setFilters((prev) =>
                prev.filter((filter) => filter !== filterFind),
            );

            return;
        }

        const data = {
            key: 'search',
            value: value,
            legend: value,
        };

        if (value.length > 0) {
            handleDebounceSearch(data);
        }
    };

    const removeAndAddFilterArray = (data: {
        key: string;
        value: string | boolean;
        legend: string;
    }) => {
        // Verificar se existe key status no array filters se exister apagar
        if (filters.some((filter) => filter.key === data.key)) {
            setFilters((prev) =>
                prev.filter((filter) => filter.key !== data.key),
            );
        }

        setFilters((prev) => [...prev, data]);
    };

    const handleDebounceSearch = useCallback(
        debounce(
            (data: {
                key: string;
                value: string | boolean;
                legend: string;
            }) => {
                setFilters((prev) =>
                    prev.filter((filter) => filter.key !== data.key),
                );

                setFilters((prev) => [...prev, data]);
            },
            1000,
        ),
        [],
    );
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
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Check />
                                        <span>Status</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent
                                            sideOffset={10}
                                            alignOffset={-4}
                                            className="p-0"
                                        >
                                            {StatusFilters.map((filter) => (
                                                <DropdownMenuCheckboxItem
                                                    key={filter.label}
                                                    checked={filters.some(
                                                        (f) =>
                                                            f.key ===
                                                                'status' &&
                                                            f.value ===
                                                                filter.value,
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleFilterStatus(
                                                            filter.value,
                                                        )
                                                    }
                                                >
                                                    {filter.label}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                {filters.map((filter) => (
                    <div key={filter.key} className={'flex items-center gap-2'}>
                        <span>
                            {filter.key} : {filter.legend}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
