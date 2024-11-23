import DeleteDialogShared from '@/components/shared/DeleteDialogShared';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ClientInterface } from '@/Pages/Dashboard/Services/Types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<ClientInterface>[] = [
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
        accessorKey: 'phone',
        header: 'Telefone',
        cell: ({ row }) => {
            return (
                <div className={'text-left font-medium'}>
                    {row.original.phone}
                </div>
            );
        },
    },
    {
        accessorKey: 'birth_date',
        header: 'Data de nascimento',
    },
    {
        accessorKey: 'created_at',
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
                    <span>Criado em</span>
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
            const client = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);

            const handleDelete = () => {
                router.delete(route('clients.destroy', client.id));
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
                                <Link href={route('clients.show', client.id)}>
                                    Visualizar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className={'cursor-pointer'}
                            >
                                <Link href={route('clients.edit', client.id)}>
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
                        title={'Deletar cliente'}
                        description={`Você tem certeza que deseja deletar o cliente com o id ${client.id}?`}
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onDelete={handleDelete}
                    />
                </>
            );
        },
    },
];
