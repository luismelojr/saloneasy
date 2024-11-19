import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ServiceInterface } from '@/Pages/Dashboard/Services/Types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<ServiceInterface>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={
                        'flex w-full items-center justify-start gap-4 p-0'
                    }
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc');
                    }}
                >
                    <span>Nome</span>
                    {/*<ArrowUpDown className="ml-2 h-4 w-4" />*/}
                    {column.getIsSorted() ? (
                        column.getIsSorted() === 'asc' ? (
                            <ArrowUp className={'h-4 w-4'} />
                        ) : (
                            <ArrowDown className={'h-4 w-4'} />
                        )
                    ) : (
                        <ArrowUpDown className="h-4 w-4" />
                    )}
                </Button>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={
                        'flex w-full items-center justify-start gap-4 p-0'
                    }
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc');
                    }}
                >
                    <span>Nome</span>
                    {/*<ArrowUpDown className="ml-2 h-4 w-4" />*/}
                    {column.getIsSorted() ? (
                        column.getIsSorted() === 'asc' ? (
                            <ArrowUp className={'h-4 w-4'} />
                        ) : (
                            <ArrowDown className={'h-4 w-4'} />
                        )
                    ) : (
                        <ArrowUpDown className="h-4 w-4" />
                    )}
                </Button>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const service = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                alert(`Copy payment ID: ${service.id}`)
                            }
                            className={'cursor-pointer'}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={'cursor-pointer'}>
                            View customer
                        </DropdownMenuItem>
                        <DropdownMenuItem className={'cursor-pointer'}>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
