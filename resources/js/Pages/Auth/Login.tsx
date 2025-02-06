import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import { Link, useForm } from '@inertiajs/react';
export default function Login() {
    const form = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('login'));
    };

    return (
        <AuthLayout>
            <div className={'flex flex-col gap-10'}>
                <div>
                    <h1 className={'text-2xl'}>
                        Preencha os campos abaixo para acessar sua conta
                    </h1>
                </div>
                <form className={'mt-32 space-y-6'} onSubmit={handleSubmit}>
                    <TextInput
                        label={'E-mail'}
                        error={form.errors.email as string}
                        value={form.data.email as string}
                        onChange={(e) => form.setData('email', e.target.value)}
                        type={'email'}
                        id={'email'}
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
                    <Button
                        type={'submit'}
                        className={'w-full'}
                        loading={form.processing}
                    >
                        Entrar
                    </Button>
                </form>
                <div className={'text-center'}>
                    <Button
                        variant={'link'}
                        asChild
                        className={'text-sm text-muted-foreground'}
                    >
                        <Link href={route('register.step.one')}>
                            Não tem uma conta? Crie uma agora
                        </Link>
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
