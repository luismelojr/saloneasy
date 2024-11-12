import HeaderNavigation from '@/components/layouts/components/header-navigation';
import Sidebar from '@/components/layouts/components/sidebar';

export default function DashboardLayout() {
    return (
        <div className={'min-h-screen w-full'}>
            <div className={'grid grid-cols-1 md:grid-cols-[60px_1fr]'}>
                <div className={'hidden h-full md:block'}>
                    <Sidebar />
                </div>
                <div className={'flex h-full w-full flex-col gap-4 px-4 pt-5'}>
                    <HeaderNavigation />
                    <div className={'border-t-[1px] pr-4 pt-5'}>
                        <h3 className={'text-2xl font-semibold'}>Titulo</h3>
                        <div className={'mt-6'}>children</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
