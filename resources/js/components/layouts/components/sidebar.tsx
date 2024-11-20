import MainMenu from '@/components/layouts/components/main-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/layouts/components/tooltip';
import { Link } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { CalendarClock } from 'lucide-react';

export default function Sidebar() {
    const initialItems = JSON.parse(Cookies.get('menu-list') || '[]');
    return (
        <aside className={'h-full min-h-screen w-full border-r bg-primary'}>
            <div className={'flex flex-col items-center justify-center pt-4'}>
                <TooltipProvider delayDuration={70}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={route('dashboard')}>
                                <CalendarClock
                                    size={24}
                                    className={'text-white'}
                                />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            side="left"
                            className="hidden px-3 py-1.5 text-xs md:flex"
                            sideOffset={24}
                        >
                            Saloneasy
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className={'mt-10'}>
                    <MainMenu initialItems={initialItems} />
                </div>
            </div>
        </aside>
    );
}
