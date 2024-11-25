import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import DeleteDialogShared from '@/components/shared/DeleteDialogShared';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import TextMask from '@/components/ui/text-mask';
import { UserInterface } from '@/types';
import {
    EditPasswordUserFormInterface,
    EditUserFormInterface,
} from '@/types/forms';
import { router, useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const menus = [
    {
        label: 'Editar perfil',
        link: route('profile.index'),
        active: true,
    },
];

interface ProfileProps {
    user: UserInterface;
}
export default function Index({ user }: ProfileProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const formProfile = useForm<EditUserFormInterface>({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const formPassword = useForm<EditPasswordUserFormInterface>({
        old_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formProfile.put(route('profile.update'));
    };

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formPassword.put(route('profile.update.password'), {
            preserveState: true,
            onSuccess: () => {
                formPassword.reset();
            },
        });
    };

    const handleRemoveAccount = () => {
        router.delete(route('profile.destroy'));
    };

    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Editar perfil'}
                    description={
                        'Aqui você pode editar as informações do seu perfil.'
                    }
                />
                <CardContentShared>
                    <form
                        className={'space-y-6'}
                        onSubmit={handleProfileSubmit}
                    >
                        <TextInput
                            label={'Nome'}
                            error={formProfile.errors.name as string}
                            value={formProfile.data.name as string}
                            onChange={(e) =>
                                formProfile.setData('name', e.target.value)
                            }
                            type={'text'}
                            id={'name'}
                        />
                        <TextInput
                            label={'E-mail'}
                            error={formProfile.errors.email as string}
                            value={formProfile.data.email as string}
                            onChange={(e) =>
                                formProfile.setData('email', e.target.value)
                            }
                            type={'email'}
                            id={'email'}
                        />
                        <TextMask
                            label={'Telefone'}
                            value={formProfile.data.phone as string}
                            onChange={(e) =>
                                formProfile.setData('phone', e.target.value)
                            }
                            error={formProfile.errors.phone as string}
                            type={'text'}
                            id={'phone'}
                            mask={'(99) 99999-9999'}
                        />
                        <div className={'flex w-full justify-end'}>
                            <Button
                                type="submit"
                                loading={formProfile.processing}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Salvar
                            </Button>
                        </div>
                    </form>
                </CardContentShared>
            </CardShared>
            <CardShared>
                <CardTitleShared
                    title={'Editar senha'}
                    description={'Aqui você pode editar a senha do seu perfil.'}
                />
                <CardContentShared>
                    <form
                        className={'space-y-6'}
                        onSubmit={handlePasswordSubmit}
                    >
                        <TextInput
                            label={'Senha atual'}
                            error={formPassword.errors.old_password as string}
                            value={formPassword.data.old_password as string}
                            onChange={(e) =>
                                formPassword.setData(
                                    'old_password',
                                    e.target.value,
                                )
                            }
                            type={'password'}
                            id={'password'}
                        />
                        <TextInput
                            label={'Senha'}
                            error={formPassword.errors.password as string}
                            value={formPassword.data.password as string}
                            onChange={(e) =>
                                formPassword.setData('password', e.target.value)
                            }
                            type={'password'}
                            id={'password'}
                        />
                        <TextInput
                            label={'Confirme a senha'}
                            error={
                                formPassword.errors
                                    .password_confirmation as string
                            }
                            value={
                                formPassword.data
                                    .password_confirmation as string
                            }
                            onChange={(e) =>
                                formPassword.setData(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                            type={'password'}
                            id={'password_confirmation'}
                        />
                        <div className={'flex w-full justify-end'}>
                            <Button
                                type="submit"
                                loading={formPassword.processing}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Salvar
                            </Button>
                        </div>
                    </form>
                </CardContentShared>
            </CardShared>
            <CardShared>
                <CardContentShared>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            Deseja excluir sua conta?
                        </h3>
                        <p className="text-sm text-gray-500">
                            Ao excluir sua conta, todos os seus dados serão
                            apagados.
                        </p>
                    </div>
                    <div className={'flex w-full justify-end'}>
                        <Button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            loading={formPassword.processing}
                            variant={'destructive'}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Excluir
                        </Button>
                        <DeleteDialogShared
                            title={'Excluir conta'}
                            description={'Deseja realmente excluir sua conta?'}
                            onClose={() => setIsOpen(false)}
                            isOpen={isOpen}
                            onDelete={handleRemoveAccount}
                        />
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
