import DeleteDialogShared from '@/components/shared/DeleteDialogShared';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScheduleExclusionInterface } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<ScheduleExclusionInterface>[] = [
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
                    <span>ID</span>
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
        accessorKey: 'date',
        header: 'Data',
    },
    {
        accessorKey: 'starts_at',
        header: 'Início',
    },
    {
        accessorKey: 'ends_at',
        header: 'Fim',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const schedule = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);

            const handleDelete = () => {
                router.delete(
                    route('hours.schedules.exclusions.destroy', schedule.id),
                );
            };

            return (
                <>
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
                                className={'cursor-pointer'}
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Deletar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteDialogShared
                        title={'Deletar horário'}
                        description={`Você tem certeza que deseja deletar o horário de ${schedule.id}?`}
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onDelete={handleDelete}
                    />
                </>
            );
        },
    },
];
