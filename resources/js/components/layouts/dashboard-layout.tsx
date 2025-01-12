import HeaderNavigation from '@/components/layouts/components/header-navigation';
import Sidebar from '@/components/layouts/components/sidebar';
import BreadcrumbCustom from '@/components/shared/BreadcrumbCustom';
import Toast from '@/components/ui/toast';
import { createContext, useContext, useState } from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    menus?: { label: string; link: string; active: boolean }[];
}

export const SidebarContext = createContext({
    isCollapsed: false,
    toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export default function DashboardLayout({
    children,
    menus,
}: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
            <div className={'min-h-screen w-full'}>
                <div className={'grid grid-cols-1 md:grid-cols-[auto_1fr]'}>
                    <div className={'hidden h-full md:block'}>
                        <Sidebar />
                    </div>
                    <div className={'flex h-full w-full flex-col gap-4'}>
                        <div className={'px-4 pt-5'}>
                            <HeaderNavigation />
                        </div>
                        <div
                            className={
                                'h-full border-t-[1px] bg-gray-100 px-4 pt-5'
                            }
                        >
                            <div className={'flex items-center justify-end'}>
                                {menus && <BreadcrumbCustom menus={menus} />}
                            </div>
                            <div className={'space-y-6 py-4'}>{children}</div>
                        </div>
                    </div>
                </div>
                <Toast />
            </div>
        </SidebarContext.Provider>
    );
}
