import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    flexRender,
    functionalUpdate,
    getCoreRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    fetchData: (params: any) => void;
    initialSorting: SortingState;
    isLoading: boolean;
    currentPage: number;
    lastPage: number;
    total: number;
    from: number;
    to: number;
    params: any;
}
export default function DataTable<TData, TValue>({
    columns,
    data,
    fetchData,
    initialSorting = [],
    isLoading,
    currentPage,
    lastPage,
    total,
    from,
    to,
    params,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>(initialSorting);
    const [page, setPage] = useState(currentPage || 1);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: (newSorting) => {
            const newSortValue = functionalUpdate(newSorting, sorting);
            fetchData({
                ...params,
                sorting: newSortValue,
            });
            setSorting(newSorting);
        },
        manualSorting: true,
        state: {
            sorting,
        },
    });

    const handlePagination = (pagination: number) => {
        setPage(pagination);
        fetchData({
            ...params,
            sorting: sorting,
            page: pagination,
        });
    };

    const handlePaginationNextOrPrevious = (type: 'next' | 'previous') => {
        const newPage = type === 'next' ? page + 1 : Math.max(page - 1, 1);

        setPage(newPage);
        fetchData({ ...params, sorting, page: newPage });
    };

    return (
        <div>
            <div className={'relative rounded-md border'}>
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
                        <ReloadIcon className={'h-6 w-6 animate-spin'} />
                    </div>
                )}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn({
                                                'text-end':
                                                    cell.column.columnDef.id ===
                                                    'actions',
                                            })}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nem um registro encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {data.length > 0 && (
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="hidden sm:block">
                        <p className="flex items-center gap-1 text-sm text-gray-700">
                            Mostrando
                            <span className="font-medium">{from}</span>a
                            <span className="font-medium">{to}</span>
                            de
                            <span className="font-medium">{total}</span>
                            resultados
                        </p>
                    </div>
                    <Pagination>
                        <PaginationContent>
                            {/* Botão para página anterior */}
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() =>
                                        handlePaginationNextOrPrevious(
                                            'previous',
                                        )
                                    }
                                />
                            </PaginationItem>

                            {/* Páginas dinâmicas */}
                            {Array.from({ length: lastPage }, (_, i) => i + 1)
                                .filter((item) => {
                                    // Exibe 1 e 2 se estiver na página 1
                                    if (page === 1) return item <= 3;
                                    // Exibe anterior, atual e próximo se não for a última
                                    if (page > 1 && page < lastPage)
                                        return Math.abs(item - page) <= 1;
                                    // Exibe últimas 3 páginas se estiver na última
                                    if (page === lastPage)
                                        return item >= lastPage - 2;
                                    return false;
                                })
                                .map((item) => (
                                    <PaginationItem key={item}>
                                        <PaginationLink asChild>
                                            <Button
                                                variant={
                                                    item === page
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                onClick={() =>
                                                    handlePagination(item)
                                                }
                                            >
                                                {item}
                                            </Button>
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                            {/* Adiciona pontos quando necessário */}
                            {page < lastPage - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Botão para próxima página */}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePaginationNextOrPrevious('next')
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
