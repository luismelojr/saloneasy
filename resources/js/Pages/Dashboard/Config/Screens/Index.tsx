import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import TextInputArea from '@/components/ui/text-input-area';
import { ConfigInterface } from '@/types';
import { ConfigFormInterface } from '@/types/forms';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ConfigProps {
    config: ConfigInterface;
}

const menus = [
    {
        label: 'Configurações',
        link: route('config.show'),
        active: true,
    },
];
export default function Index({ config }: ConfigProps) {
    const form = useForm<ConfigFormInterface>({
        avatar: config.avatar,
        banner_image: config.banner_image,
        bio: config.bio,
        color_primary: config.color_primary,
        color_secondary: config.color_secondary,
        instagram: config.instagram,
        address: config.address,
        google_maps_url: config.google_maps_url,
    });

    const formattedColor = (color: string) => {
        return color[0] === '#' ? color : `#${color}`;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('config.store'));
    };

    const handleChangeFileAvatar = (file: File) => {
        form.setData('avatar', file);
    };

    const handleChangeFileBanner = (file: File) => {
        form.setData('banner_image', file);
    };

    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Configurações'}
                    description={
                        'Aqui você pode configurar o layout da sua pagina de agenda'
                    }
                />
                <CardContentShared>
                    <form className={'space-y-6'} onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <TextInput
                                label={'Cor Primária'}
                                error={form.errors.color_primary as string}
                                value={form.data.color_primary as string}
                                onChange={(e) =>
                                    form.setData(
                                        'color_primary',
                                        e.target.value,
                                    )
                                }
                                type={'color'}
                                id={'color_primary'}
                            />
                            <TextInput
                                label={'Cor Secundária'}
                                error={form.errors.color_secondary as string}
                                value={form.data.color_secondary as string}
                                onChange={(e) =>
                                    form.setData(
                                        'color_secondary',
                                        e.target.value,
                                    )
                                }
                                type={'color'}
                                id={'color_secondary'}
                            />
                            <div className="flex flex-col gap-2">
                                <span>Preview das cores</span>
                                <button
                                    className={`flex items-center justify-center rounded-md px-4 py-2`}
                                    style={{
                                        backgroundColor: formattedColor(
                                            form.data.color_primary as string,
                                        ),
                                        color: formattedColor(
                                            form.data.color_secondary as string,
                                        ),
                                    }}
                                >
                                    Botão
                                </button>
                            </div>
                        </div>
                        <TextInputArea
                            label={'Biografia'}
                            error={form.errors.bio as string}
                            value={form.data.bio as string}
                            onChange={(e) =>
                                form.setData('bio', e.target.value)
                            }
                            id={'bio'}
                        />
                        <div
                            className={'grid grid-cols-1 gap-6 md:grid-cols-3'}
                        >
                            <TextInput
                                label={'Instagram'}
                                error={form.errors.instagram as string}
                                value={form.data.instagram as string}
                                onChange={(e) =>
                                    form.setData('instagram', e.target.value)
                                }
                                type={'text'}
                                id={'instagram'}
                            />
                            <TextInput
                                label={'Endereço de atendimento'}
                                error={form.errors.address as string}
                                value={form.data.address as string}
                                onChange={(e) =>
                                    form.setData('address', e.target.value)
                                }
                                type={'text'}
                                id={'address'}
                            />
                            <TextInput
                                label={'Link do Google Maps'}
                                error={form.errors.google_maps_url as string}
                                value={form.data.google_maps_url as string}
                                onChange={(e) =>
                                    form.setData(
                                        'google_maps_url',
                                        e.target.value,
                                    )
                                }
                                type={'link'}
                                id={'google_maps_url'}
                            />
                        </div>
                        <div
                            className={'grid grid-cols-1 gap-6 md:grid-cols-2'}
                        >
                            <div className={'w-full'}>
                                <FileUpload
                                    label={'Foto de perfil'}
                                    id={'avatar'}
                                    urlImageActive={config.avatar}
                                    onFileUpload={handleChangeFileAvatar}
                                />
                            </div>
                            <div className={'w-full'}>
                                <FileUpload
                                    label={'Banner'}
                                    id={'banner_image'}
                                    urlImageActive={config.banner_image}
                                    onFileUpload={handleChangeFileBanner}
                                />
                            </div>
                        </div>
                        <div className={'flex w-full justify-end'}>
                            <Button type="submit" loading={form.processing}>
                                <Plus className="mr-2 h-4 w-4" />
                                Salvar
                            </Button>
                        </div>
                    </form>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
