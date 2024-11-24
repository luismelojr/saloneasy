import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import { Button } from '@/components/ui/button';
import ButtonAction from '@/components/ui/button-action';
import TextInput from '@/components/ui/text-input';
import TextMask from '@/components/ui/text-mask';
import { ClientFormInterface } from '@/types/forms';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const menus = [
    {
        label: 'Clientes',
        link: route('clients.index'),
        active: false,
    },
    { label: 'Cadastrar', link: '', active: true },
];

export default function Create() {
    const form = useForm<ClientFormInterface>({
        name: '',
        phone: '',
        birth_date: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('clients.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };
    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Criar cliente'}
                    description={
                        'Preencha os campos abaixo para criar um novo cliente.'
                    }
                >
                    <ButtonAction
                        title={'Voltar'}
                        route={route('clients.index')}
                        isAction={'back'}
                    />
                </CardTitleShared>
                <CardContentShared>
                    <form className={'space-y-6'} onSubmit={handleSubmit}>
                        <div
                            className={
                                'grid grid-cols-1 items-start gap-6 md:grid-cols-3'
                            }
                        >
                            <TextInput
                                label={'Nome'}
                                error={form.errors.name as string}
                                value={form.data.name as string}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                type={'text'}
                                id={'name'}
                            />
                            <TextMask
                                label={'Telefone'}
                                value={form.data.phone as string}
                                onChange={(e) =>
                                    form.setData('phone', e.target.value)
                                }
                                error={form.errors.phone as string}
                                type={'text'}
                                id={'phone'}
                                mask={'(99) 99999-9999'}
                            />
                            <TextMask
                                label={'Data de nascimento'}
                                value={form.data.birth_date as string}
                                onChange={(e) =>
                                    form.setData('birth_date', e.target.value)
                                }
                                error={form.errors.birth_date as string}
                                type={'text'}
                                id={'birth_date'}
                                mask={'99/99/9999'}
                            />
                        </div>
                        <div className={'flex w-full justify-end'}>
                            <Button type="submit" loading={form.processing}>
                                <Plus className="mr-2 h-4 w-4" />
                                Cadastrar
                            </Button>
                        </div>
                    </form>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
