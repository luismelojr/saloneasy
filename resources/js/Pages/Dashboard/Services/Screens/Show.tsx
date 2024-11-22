import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import ButtonAction from '@/components/ui/button-action';
import { ServiceGlobalInterface } from '@/types/interfaces';
import { Image } from 'lucide-react';

const menus = [
    {
        label: 'Serviços',
        link: route('services.index'),
        active: false,
    },
    { label: 'Visualizar', link: '', active: true },
];

interface ShowProps {
    service: ServiceGlobalInterface;
}
export default function Show({ service }: ShowProps) {
    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Visualizar serviço'}
                    description={'Visualize as informações do serviço.'}
                >
                    <ButtonAction
                        title={'Voltar'}
                        route={route('services.index')}
                        isAction={'back'}
                    />
                </CardTitleShared>
                <CardContentShared>
                    <div>
                        <dl className="divide-y divide-gray-100">
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Nome do serviço
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {service.name}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Duração do serviço
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {service.duration}
                                    {service.duration > 1
                                        ? ' minutos'
                                        : ' minuto'}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Preço do serviço
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {service.price.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Descrição do serviço
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {service.description}
                                </dd>
                            </div>
                            {service.image_url && (
                                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Imagem
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <div className="flex w-0 flex-1 items-center">
                                                <Image className={'h-5 w-5'} />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                        imagem-do-servico.jpg
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        'flex items-center gap-2'
                                                    }
                                                >
                                                    <a
                                                        href={
                                                            service.image_url as string
                                                        }
                                                        target="_blank"
                                                        className="text-blue-500 hover:text-blue-700"
                                                        rel="noreferrer"
                                                    >
                                                        Visualizar
                                                    </a>
                                                    <a
                                                        href={
                                                            service.image_url as string
                                                        }
                                                        download
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        Baixar
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
