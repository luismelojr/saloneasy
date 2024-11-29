import { ServiceInterface } from '@/types';
import { Banknote, Clock, ShoppingBag } from 'lucide-react';

interface ShowServiceProps {
    service: ServiceInterface;
}

export default function ShowService({ service }: ShowServiceProps) {
    return (
        <div
            className={
                'flex w-full cursor-pointer flex-col justify-between rounded-md border p-4 hover:border-primary'
            }
        >
            <div className={'flex flex-col gap-2'}>
                {service.image_url ? (
                    <img
                        src={service.image_url}
                        alt={service.name}
                        className={'h-10 w-10 rounded-md object-cover'}
                    />
                ) : (
                    <ShoppingBag className={'h-10 w-10 text-slate-400'} />
                )}
                <div>
                    <h3 className="mt-3 block text-left text-lg font-semibold leading-snug text-gray-600">
                        {service.name}
                    </h3>
                    <p className="text-left text-sm opacity-50">
                        {service.description}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-[12px] text-slate-400">
                            {service.duration} minutos
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Banknote className="h-4 w-4 text-slate-400" />
                        <span className="text-[12px] text-slate-400">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(service.price)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
