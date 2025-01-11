import MenuMobile from '@/components/layouts/components/menu-mobile';
import UserMenu from '@/components/layouts/components/user-menu';
import { useSidebar } from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function HeaderNavigation() {
    const { isCollapsed, toggleSidebar } = useSidebar();
    return (
        <div className={'flex items-center justify-between'}>
            <div className={'hidden items-center gap-4 md:flex'}>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSidebar}
                    className="hidden text-primary hover:bg-primary hover:text-white md:flex"
                >
                    <ChevronLeft
                        className={`h-4 w-4 transition-all ${isCollapsed ? 'rotate-180' : ''}`}
                    />
                </Button>
            </div>
            <div className={'block md:hidden'}>
                <MenuMobile />
            </div>
            <div className={'flex items-center gap-4'}>
                <UserMenu />
            </div>
        </div>
    );
}
