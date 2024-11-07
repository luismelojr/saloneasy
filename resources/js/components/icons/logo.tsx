import { CalendarClock } from 'lucide-react';

export default function Logo() {
    return (
        <div className={'flex items-center gap-4'}>
            <CalendarClock className={'h-7 w-7'} />
            <span className={'text-[18px] text-foreground'}>Saloneasy</span>
        </div>
    );
}
