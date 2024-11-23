import DeleteDialogShared from '@/components/shared/DeleteDialogShared';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ServiceInterface } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

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
        accessorKey: 'price',
        header: 'Preço',
        cell: ({ row }) => {
            const formattedPrice = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(row.original.price);

            return (
                <div className={'text-left font-medium'}>{formattedPrice}</div>
            );
        },
    },
    {
        accessorKey: 'duration',
        header: 'Duração',
        cell: ({ row }) => {
            const isMinutesOrMinute =
                row.original.duration === 1 ? 'minuto' : 'minutos';

            return (
                <div className={'text-left font-medium'}>
                    {row.original.duration} {isMinutesOrMinute}
                </div>
            );
        },
    },
    {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <div
                    className={`text-left font-medium ${
                        row.original.is_active
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
                >
                    {row.original.is_active ? 'Ativo' : 'Inativo'}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const service = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);

            const handleDelete = () => {
                router.delete(route('services.destroy', service.id));
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
                                asChild
                                className={'cursor-pointer'}
                            >
                                <Link href={route('services.show', service.id)}>
                                    Visualizar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className={'cursor-pointer'}
                            >
                                <Link
                                    href={route(
                                        'services.update.status',
                                        service.id,
                                    )}
                                    method={'patch'}
                                >
                                    {service.is_active ? 'Desativar' : 'Ativar'}
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className={'cursor-pointer'}
                            >
                                <Link href={route('services.edit', service.id)}>
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={'cursor-pointer'}
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Deletar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteDialogShared
                        title={'Deletar serviço'}
                        description={`Você tem certeza que deseja deletar o serviço com o id ${service.id}?`}
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onDelete={handleDelete}
                    />
                </>
            );
        },
    },
];
