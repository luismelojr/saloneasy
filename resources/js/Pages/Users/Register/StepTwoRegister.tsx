import AuthLayout from '@/components/layouts/auth-layout';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import { ServiceFormInterface } from '@/types/forms';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { CurrencyInput } from 'react-currency-mask';

export default function RegisterStepTwo() {
    const form = useForm<ServiceFormInterface>({
        name: '',
        description: '',
        image: null,
        price: '',
        duration: '',
    });

    const handleChangeFile = (file: File) => {
        form.setData('image', file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('register.store.step.two'));
    };

    return (
        <AuthLayout>
            <div className={'flex flex-col gap-14'}>
                <div>
                    <h1 className={'text-2xl'}>Cadastre um novo serviço</h1>
                </div>
                <form className={'space-y-6'} onSubmit={handleSubmit}>
                    <div
                        className={
                            'grid grid-cols-1 items-start gap-6 md:grid-cols-2'
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
                        <TextInput
                            label={'Descrição'}
                            error={form.errors.description as string}
                            value={form.data.description as string}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            type={'text'}
                            id={'description'}
                        />
                    </div>
                    <div
                        className={
                            'grid grid-cols-1 items-start gap-6 md:grid-cols-2'
                        }
                    >
                        <TextInput
                            label={'Duração (em minutos)'}
                            error={form.errors.duration as string}
                            value={form.data.duration as string}
                            onChange={(e) =>
                                form.setData('duration', e.target.value)
                            }
                            type={'number'}
                            id={'duration'}
                        />
                        <CurrencyInput
                            value={form.data.price as string}
                            onChangeValue={(_, value) =>
                                form.setData('price', value as string)
                            }
                            InputElement={
                                <TextInput
                                    label="Preço"
                                    name="price"
                                    id="price"
                                    error={form.errors.price as string}
                                    type={'text'}
                                />
                            }
                        />
                    </div>
                    <div className={'w-full'}>
                        <FileUpload
                            id={'image_service'}
                            onFileUpload={handleChangeFile}
                        />
                    </div>
                    <div className={'flex w-full justify-end'}>
                        <Button type="submit" loading={form.processing}>
                            <Plus className="mr-2 h-4 w-4" />
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
