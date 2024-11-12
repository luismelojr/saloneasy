import MainMenu from '@/components/layouts/components/main-menu';
import { Link } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { CalendarClock } from 'lucide-react';

export default function Sidebar() {
    const initialItems = JSON.parse(Cookies.get('menu-list') || '[]');
    return (
        <aside className={'h-full min-h-screen w-full border-r'}>
            <div className={'flex flex-col items-center justify-center pt-4'}>
                <div>
                    <Link href={route('dashboard')}>
                        <CalendarClock size={24} />
                    </Link>
                </div>
                <div className={'mt-10'}>
                    <MainMenu initialItems={initialItems} />
                </div>
            </div>
        </aside>
    );
}
