import checkPhoneExistsClients from '@/components/services/checkPhoneExistsClients';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import TextInput from '@/components/ui/text-input';
import TextMask from '@/components/ui/text-mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm as ReactUseForm } from 'react-hook-form';
import { z } from 'zod';

const scheme = z.object({
    name: z
        .string({ message: 'O nome é obrigatório' })
        .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
        .max(255, { message: 'O nome deve ter no máximo 255 caracteres' }),
    // validando phone retirando os caracteres especiais e validando a quantidade de numeros
    phone: z
        .string({ message: 'O telefone é obrigatório' })
        .refine(
            (value) => {
                const phone = value.replace(/\D/g, '');
                return phone.length === 11 || phone.length === 10;
            },
            { message: 'Telefone inválido' },
        )
        .superRefine(async (phone, ctx) => {
            const phoneExists = await checkPhoneExistsClients(phone);
            if (phoneExists) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Este telefone já está cadastrado',
                });
            }
        }),
    birth_date: z
        .string({ message: 'A data de nascimento é obrigatória' })
        .refine(
            (value) => {
                // Verifica se está no formato dd/mm/yyyy
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                    return false;
                }

                // Extrai dia, mês e ano
                const [day, month, year] = value.split('/').map(Number);

                // Cria um objeto Date
                const date = new Date(year, month - 1, day);

                // Verifica se é uma data válida
                return (
                    date.getDate() === day &&
                    date.getMonth() === month - 1 &&
                    date.getFullYear() === year &&
                    date <= new Date() // Garante que a data não é futura
                );
            },
            { message: 'Data de nascimento inválida' },
        )
        .refine(
            (value) => {
                const [day, month, year] = value.split('/').map(Number);
                const date = new Date(year, month - 1, day);
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 120); // Idade máxima de 120 anos

                return date >= minDate;
            },
            { message: 'Data de nascimento não pode ultrapassar 120 anos' },
        ),
});

export type FormData = z.infer<typeof scheme>;

interface CreateClientsProps {
    onCreateClient: (data: FormData) => void;
    loading: boolean;
}

export default function CreateClients({
    onCreateClient,
    loading,
}: CreateClientsProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = ReactUseForm<FormData>({
        resolver: zodResolver(scheme),
        defaultValues: {
            name: '',
            phone: '',
            birth_date: '',
        },
    });

    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        if (open) {
            // Reset form state and errors
            reset();
        }
    };

    const handleCreateClient = async (data: FormData) => {
        onCreateClient(data);
        setOpen(false);
    };
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    variant={'outline'}
                    className={'flex items-center text-gray-500'}
                >
                    <Plus />
                    Cadastrar cliente
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Criar cliente</SheetTitle>
                    <SheetDescription>
                        Cadastre um novo cliente preenchendo o formulário
                        abaixo.
                    </SheetDescription>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit(handleCreateClient)}
                    className={'mt-4 space-y-6 border-t pt-4'}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label={'Nome'}
                                error={errors.name?.message as string}
                                type={'text'}
                                id={'name'}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextMask
                                label={'Telefone'}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.phone?.message as string}
                                type={'text'}
                                id={'phone'}
                                mask={'(99) 99999-9999'}
                            />
                        )}
                    />
                    <Controller
                        name="birth_date"
                        control={control}
                        render={({ field }) => (
                            <TextMask
                                label={'Data de nascimento'}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.birth_date?.message as string}
                                type={'text'}
                                id={'birth_date'}
                                mask={'99/99/9999'}
                            />
                        )}
                    />
                    <Button type="submit" loading={loading}>
                        <Plus className="mr-2 h-4 w-4" />
                        Cadastrar
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
