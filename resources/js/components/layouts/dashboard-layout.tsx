import HeaderNavigation from '@/components/layouts/components/header-navigation';
import Sidebar from '@/components/layouts/components/sidebar';
import BreadcrumbCustom from '@/components/shared/BreadcrumbCustom';
import Toast from '@/components/ui/toast';

interface DashboardLayoutProps {
    title: string;
    children: React.ReactNode;
    menus?: { label: string; link: string; active: boolean }[];
}
export default function DashboardLayout({
    title,
    children,
    menus,
}: DashboardLayoutProps) {
    return (
        <div className={'min-h-screen w-full'}>
            <div className={'grid grid-cols-1 md:grid-cols-[60px_1fr]'}>
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
                        <div className={'flex items-center justify-between'}>
                            <h3
                                className={
                                    'text-2xl font-semibold text-gray-600'
                                }
                            >
                                {title}
                            </h3>
                            {menus && <BreadcrumbCustom menus={menus} />}
                        </div>
                        <div className={'mt-6'}>{children}</div>
                    </div>
                </div>
            </div>
            <Toast />
        </div>
    );
}
