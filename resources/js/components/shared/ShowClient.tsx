import { ClientInterface } from '@/types';
import { Calendar, Phone, User } from 'lucide-react';

interface ShowClientProps {
    client: ClientInterface;
}

export default function ShowClient({ client }: ShowClientProps) {
    return (
        <div
            className={
                'flex w-full cursor-pointer flex-col justify-between rounded-md border p-4 hover:border-primary'
            }
        >
            <div className={'flex flex-col gap-2'}>
                <User className={'h-10 w-10 text-slate-400'} />
                <div>
                    <h3 className="mt-3 block text-left text-lg font-semibold leading-snug text-gray-600">
                        {client.name}
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-[12px] text-slate-400">
                            {client.birth_date}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-[12px] text-slate-400">
                            {client.phone}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
