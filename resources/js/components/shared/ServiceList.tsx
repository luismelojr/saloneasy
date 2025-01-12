import { cn } from '@/lib/utils';
import { ServiceInterface } from '@/types';
import { Calendar, ShoppingBag } from 'lucide-react';

interface ServiceListProps {
    service: ServiceInterface;
    action: (id: number) => void;
    active?: boolean;
}
export default function ServiceList({
    service,
    action,
    active,
}: ServiceListProps) {
    return (
        <div
            className={cn(
                'group flex w-full cursor-pointer flex-col justify-between rounded-md border p-4 hover:border-primary',
                {
                    'border-primary': active,
                },
            )}
            onClick={() => action(service.id)}
        >
            <div className={'flex items-start gap-4'}>
                {service.image_url ? (
                    <img
                        src={service.image_url}
                        alt={service.name}
                        className={'h-20 w-20 rounded-md object-cover'}
                    />
                ) : (
                    <ShoppingBag className={'h-20 w-20 text-slate-400'} />
                )}
                <div className={'flex-1'}>
                    <h3 className={'font-semibold text-gray-900'}>
                        {service.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {service.description}
                    </p>
                    <div className={'mt-2 flex items-center gap-4'}>
                        <span
                            className={
                                'flex items-center text-sm text-gray-500'
                            }
                        >
                            <Calendar className={'mr-1 h-4 w-4'} />
                            {service.duration}{' '}
                            {service.duration > 1 ? 'minutos' : 'minuto'}
                        </span>
                        <span className={'font-medium text-gray-900'}>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(service.price)}
                        </span>
                    </div>
                </div>
                {active && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs text-white">
                        Selecionado
                    </span>
                )}
            </div>
        </div>
    );
}
