import MainMenu from '@/components/layouts/components/main-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/layouts/components/tooltip';
import { useSidebar } from '@/components/layouts/dashboard-layout';
import { Link } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { Scissors } from 'lucide-react';

export default function Sidebar() {
    const initialItems = JSON.parse(Cookies.get('menu-list') || '[]');
    const { isCollapsed } = useSidebar();

    return (
        <aside
            className={`h-full min-h-screen border-r bg-primary transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-[250px]'}`}
        >
            <div
                className={
                    'flex flex-col items-center justify-center px-1 pt-4'
                }
            >
                <div className="flex w-full items-center px-4">
                    <TooltipProvider delayDuration={70}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route('dashboard')}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-8 w-8 transform items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg transition-transform duration-300 hover:scale-105">
                                        <Scissors className="h-4 w-4 text-white" />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-white">
                                            Saloneasy
                                        </span>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent
                                    side="right"
                                    className="px-3 py-1.5 text-xs"
                                    sideOffset={24}
                                >
                                    Saloneasy
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className={'mt-10 w-full'}>
                    <MainMenu
                        initialItems={initialItems}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </div>
        </aside>
    );
}
