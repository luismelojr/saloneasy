import DashboardLayout from '@/components/layouts/dashboard-layout';
import CardShared from '@/components/shared/Card';
import CardContentShared from '@/components/shared/CardContentShared';
import CardTitleShared from '@/components/shared/CardTitleShared';
import ButtonAction from '@/components/ui/button-action';
import { ClientInterface } from '@/types';

const menus = [
    {
        label: 'Clientes',
        link: route('clients.index'),
        active: false,
    },
    { label: 'Visualizar', link: '', active: true },
];

interface ShowProps {
    client: ClientInterface;
}
export default function Show({ client }: ShowProps) {
    return (
        <DashboardLayout menus={menus}>
            <CardShared>
                <CardTitleShared
                    title={'Visualizar cliente'}
                    description={'Visualize as informações do cliente.'}
                >
                    <ButtonAction
                        title={'Voltar'}
                        route={route('clients.index')}
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
                                    {client.name}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Telefone
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {client.phone}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Data de nascimento
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {client.birth_date}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Criado em
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {client.created_at}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Ultima atualização
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {client.updated_at}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </CardContentShared>
            </CardShared>
        </DashboardLayout>
    );
}
