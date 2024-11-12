import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import TextMask from '@/components/ui/text-mask';
import { Link, useForm } from '@inertiajs/react';

interface RegisterProps {
    plan?: string;
}
export default function Register({ plan }: RegisterProps) {
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        plan: plan || 'basic',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('register.store'));
    };

    return (
        <AuthLayout>
            <div className={'flex flex-col gap-14'}>
                <div>
                    <h1 className={'text-2xl'}>
                        Preencha os campos abaixo para se cadastrar
                    </h1>
                </div>
                <form className={'space-y-6'} onSubmit={handleSubmit}>
                    <TextInput
                        label={'Nome'}
                        error={form.errors.name as string}
                        value={form.data.name as string}
                        onChange={(e) => form.setData('name', e.target.value)}
                        type={'text'}
                        id={'name'}
                    />

                    <TextInput
                        label={'E-mail'}
                        error={form.errors.email as string}
                        value={form.data.email as string}
                        onChange={(e) => form.setData('email', e.target.value)}
                        type={'email'}
                        id={'email'}
                    />

                    <TextMask
                        label={'Telefone'}
                        value={form.data.phone as string}
                        onChange={(e) => form.setData('phone', e.target.value)}
                        error={form.errors.phone as string}
                        type={'text'}
                        id={'phone'}
                        mask={'(99) 99999-9999'}
                    />

                    <TextInput
                        label={'Senha'}
                        error={form.errors.password as string}
                        value={form.data.password as string}
                        onChange={(e) =>
                            form.setData('password', e.target.value)
                        }
                        type={'password'}
                        id={'password'}
                    />
                    <TextInput
                        label={'Confirme a senha'}
                        error={form.errors.password_confirmation as string}
                        value={form.data.password_confirmation as string}
                        onChange={(e) =>
                            form.setData(
                                'password_confirmation',
                                e.target.value,
                            )
                        }
                        type={'password'}
                        id={'password_confirmation'}
                    />
                    <Button
                        type={'submit'}
                        className={'w-full'}
                        loading={form.processing}
                    >
                        Cadastrar
                    </Button>
                </form>
                <div className={'text-center'}>
                    <Button
                        variant={'link'}
                        asChild
                        className={'text-sm text-muted-foreground'}
                    >
                        <Link href={route('login')}>
                            Já tem uma conta? Acesse o painel
                        </Link>
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
