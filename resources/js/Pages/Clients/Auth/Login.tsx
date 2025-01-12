import AuthClientsLayout from '@/components/layouts/auth-clients-layout';
import { Button } from '@/components/ui/button';
import TextMask from '@/components/ui/text-mask';
import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Login() {
    const form = useForm({
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('login.client.code'));
    };
    return (
        <AuthClientsLayout title={'Saloneasy'} subtitle={'Acesse sua conta'}>
            <form className={'space-y-6'} onSubmit={handleSubmit}>
                <TextMask
                    label={'Telefone'}
                    value={form.data.phone as string}
                    onChange={(e) => form.setData('phone', e.target.value)}
                    error={form.errors.phone as string}
                    type={'text'}
                    id={'phone'}
                    mask={'(99) 99999-9999'}
                />
                <Button
                    type="submit"
                    className={'w-full'}
                    loading={form.processing}
                >
                    Continuar
                    <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-500">
                Ao continuar, você aceita receber um código de verificação via
                WhatsApp.
            </p>
        </AuthClientsLayout>
    );
}
