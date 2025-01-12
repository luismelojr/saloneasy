import AuthClientsLayout from '@/components/layouts/auth-clients-layout';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { ClientInterface } from '@/types';
import { useForm } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ArrowRight } from 'lucide-react';

interface CodeProps {
    client: ClientInterface;
}

export default function Code({ client }: CodeProps) {
    const form = useForm({
        code: '',
        phone: client.phone,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('login.client.code.verify'));
    };

    return (
        <AuthClientsLayout
            title={'Verificação'}
            subtitle={`Digite o código de 6 dígitos enviado para ${client.phone}`}
        >
            <form className={'w-full space-y-6'} onSubmit={handleSubmit}>
                <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    className="w-full justify-center gap-2"
                    value={form.data.code}
                    onChange={(e) => form.setData('code', e)}
                >
                    <InputOTPGroup className="w-full justify-between">
                        {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className={`flex-1 ${form.errors.code ? 'border-red-500' : ''}`}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
                {form.errors.code && (
                    <p className="text-sm text-red-500">{form.errors.code}</p>
                )}
                <Button
                    type="submit"
                    className={'w-full'}
                    loading={form.processing}
                >
                    Continuar
                    <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
            </form>
        </AuthClientsLayout>
    );
}
